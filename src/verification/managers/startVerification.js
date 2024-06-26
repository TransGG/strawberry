import config from "../../config/config.js";
import { createVerifyTicketCreateLog } from "../controllers/log.js";
import { isVerified } from "../controllers/member.js";
import { isClosed, phantomPing, refreshTicket } from "../controllers/ticket.js";
import { createTicket, fetchMostRecentTicket } from "../controllers/tickets.js";
import { denyVerification, DenyConsequence } from "./denyVerification.js";

/**
 * Entry point for starting verification
 * @param {GuildTextThreadManager} threads A ThreadManager for the verification ticket channel
 * @param {GuildMember} applicant A guild member
 * @param {function} resolve Success callback. Takes two parameters - thread, applicant
 * @param {function} reject Failure callback. Takes a single parameter - message
 * @param {string} promptCategory The category of prompt to give
 */
async function startVerification(
  threads,
  applicant,
  resolve,
  reject,
  promptCategory
) {
  // check if user is verified
  if (isVerified(applicant)) {
    await reject("You've already been verified, silly");
    return;
  }

  // fetch existing threads, if any
  const existingTicket = await fetchMostRecentTicket(threads, applicant);
  if (existingTicket) {
    const closed = isClosed(existingTicket);
    if (closed) {
      await refreshTicket(existingTicket, applicant);
    }
    await phantomPing(existingTicket, applicant);
    await resolve(
      existingTicket,
      closed ? 'Re-opened your ticket' : 'You already have a thread open'
    );
    return;
  }

  // create new ticket
  const ticket = await createTicket(threads, applicant, promptCategory);
  await createVerifyTicketCreateLog(
    ticket.guild.channels.cache.get(
      config.guilds[applicant.guild.id].channels.verifyLogs
    ),
    ticket,
    applicant,
    threads.client
  );

  await resolve(ticket, 'Created a ticket for you to verify your account');

  const webhooks = await ticket.parent.fetchWebhooks();

  if (!webhooks.size) {
    await ticket.parent.createWebhook({
      name: 'Verification Kyle Proxy',
    });
  }

  const webhook = (await ticket.parent.fetchWebhooks()).first();

  // Add a 23s timer to send a welcome message to the user

  setTimeout(async () => {
    const thread = await ticket.parent.threads.fetch(ticket.id).catch(() => {});
    if (thread && !thread.archived) {
      const messages = await thread.messages.fetch();
      const userMessages = messages.filter((m) => m.author.id === applicant.id);

      if (userMessages.size === 0) {
        await webhook.send({
          content: `Welcome ${applicant} <a:TPF_GawrGura_Wave:968391057828093952>,\n\nI just wanted to check in with you and give you a heads up that we kindly ask all questions to be answered within 3 hours to avoid being kicked for inactivity.\n\nThankies <a:TPA_Trans_Heart:960885444285968395>`,
          username: "Kyle ♡ [Any Pronouns]",
          avatarURL: "https://i.imgur.com/fOJFzGz.png",
          threadId: ticket.id,
        });
      }
    }
  }, 23000);

  // Add a 23 + 15s timer to send a message to the user if their account is new

  const member = await ticket.guild.members.fetch(applicant.id).catch(() => {});
  if (member && member.user.createdTimestamp > Date.now() - 1814400000) {
    setTimeout(async () => {
      const thread = await ticket.parent.threads.fetch(ticket.id);
      if (thread && !thread.archived) {
        const messages = await thread.messages.fetch();
        const userMessages = messages.filter(
          (m) => m.author.id === applicant.id
        );

        if (userMessages.size === 0) {
          await webhook.send({
            content:
              "Also, I noticed your account is pretty new, could you explain why?\n\nAnd do you happen to have any other online accounts (Twitter/Reddit/Etc) which has more history that you could send us a link to?\n\nNw if not ^^",
            username: "Kyle ♡ [Any Pronouns]",
            avatarURL: "https://i.imgur.com/fOJFzGz.png",
            threadId: ticket.id,
          });
        }
      }
    }, 38000);
  }

  if (
    member &&
    member.roles.cache.has(config.guilds[member.guild.id].roles.place)
  ) {
    setTimeout(async () => {
      const thread = await ticket.parent.threads.fetch(ticket.id);
      if (thread && !thread.archived) {
        await webhook.send({
          content:
            "I can see that you picked up the r/place 2023 role, could you share your reddit username / link your reddit account?",
          username: "Kyle ♡ [Any Pronouns]",
          avatarURL: "https://i.imgur.com/fOJFzGz.png",
          threadId: ticket.id,
        });
      }
    }, 60000);
  }

  // Add a 3h timer to remind staff to close the ticket if the user hasn't responded
  if (member) {
    setTimeout(async () => {
      const thread = await ticket.parent.threads
        .fetch(ticket.id)
        .catch(() => {});
      if (thread && !thread.archived) {
        const messages = await thread.messages.fetch();
        const userMessages = messages.filter(
          (m) => m.author.id === applicant.id
        );

        if (userMessages.size === 0) {
          await thread.send({
            content: `Hi there! ${applicant}, <a:TPF_Squid_Wave:968411630981496852>\n\nIt looks like it's been 3 hours since we've heard from you, so we just wanted to tell you this ticket has been marked as inactive and has been set to be deleted soon.\n\nWe don't want to close your ticket or kick you out, so please let us know if you need more time to respond. Just give us a heads up and we'll be happy to wait a bit longer. \n\nThanks! <a:TPA_Trans_Heart:960885444285968395>${
              config.guilds[member.guild.id].roles.inactivityPing
                ? ` | (<@&${
                    config.guilds[member.guild.id].roles.inactivityPing
                  }>)`
                : ""
            }`,
            threadId: ticket.id,
            allowedMentions: {
              roles: [config.guilds[member.guild.id].roles.inactivityPing],
            },
          });
        }
      }
    }, 10800000);
  }

  // check if they have any messages in the past 24 hours
  if (member) {
    setTimeout(async () => {
      const thread = await ticket.parent.threads
        .fetch(ticket.id)
        .catch(() => {});
      if (thread && !thread.archived) {
        const messages = await thread.messages.fetch();
        const userMessages = messages.filter(
          (m) => m.author.id === applicant.id
        );

        if (userMessages.size === 0) {
          await thread.send({
            content:
              "As there has been no messages in 24h this thread has been auto archived.",
            threadId: ticket.id,
            allowedMentions: {
              roles: [config.guilds[member.guild.id].roles.inactivityPing],
            },
          });

          await denyVerification(DenyConsequence.kick, {
            ticket,
            verifier: applicant,
            userReason:
              `Kicked for Inactivity, feel free to rejoin once you have time to answer the questions!~\n\n${config.guilds[member.guild.id].invite}`,
            logReason: "Kicked for Inactivity - No messages in 24h (Auto)",
          }).catch(async () => {
            await thread.send({
              content: `There was an error kicking the user, please kick them manually. ${
                config.guilds[member.guild.id].roles.inactivityPing
                  ? `(<@&${config.guilds[member.guild.id].roles.inactivityPing}>)`
                  : ""
              }}`,
              threadId: ticket.id,
              allowedMentions: {
                roles: [config.guilds[member.guild.id].roles.inactivityPing],
              },
            });
          });
        }
      }
    }, 86400000);
  }
}

export default startVerification;
