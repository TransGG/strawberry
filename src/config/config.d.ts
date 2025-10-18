import type { ChannelType, ThreadAutoArchiveDuration, Snowflake } from 'discord.js';

export interface Guild {
  sync: Snowflake[];
  verifyTicketAutoArchiveDuration: ThreadAutoArchiveDuration;
  privateThread: ChannelType;
  channels: {
    /// The channel that verification threads are created in
    lobby: Snowflake;

    /// A channel used to log verification starts and successes
    verifyLogs: Snowflake;

    /// A channel used to log verification kicks and bans
    verifyLogsSecondary: Snowflake;

    /// A channel where 'new member' messages will be sent
    /// If this is not specified, no new member messages will be sent
    /// If this is specified, the greeter role and call-to-action channels must also be specified
    welcome: Snowflake?;

    /// A channel for the new-member "here's a place to talk" call to action
    /// Required if and only if the welcome channel is specified
    general: Snowflake?;

    /// A channel for the new member "introduce yourself" call to action
    /// Required if and only if the welcome channel is specified
    introduce: Snowflake?;
  };
  roles: {
    /// Used for determining if a user can run commands
    staffRoles: Snowflake[];

    /// Used for determining if a user can verify users
    verifier: Snowflake;

    /// Given to users when they are verified
    verified: Snowflake;

    /// A role that new server members get upon verification
    /// The bot will never *un*assign this role - you're expected to use another bot (e.g. a level bot or a bot to remove this role after a time)
    /// If omitted, the bot will not assign a newbie role
    newbie: Snowflake?;

    /// A role that will be given with the "verify with no images" options
    /// The bot will never *un*assign this role - you should probably give your moderators another way to manage this (e.g. through Badeline)
    /// FIXME: If omitted, the bot will still show the non-image-verification options but they will act the same as verification
    noImages: Snowflake?;

    /// A role which indicates a member took part in r/place 2023
    /// If a member has this role, the Kyle webhook will ask them for their Reddit account
    /// This probably isn't useful except in TransPlace!
    /// If omitted, the bot will never ask about r/place 2023
    place: Snowflake?;

    /// A role which all members get upon joining the server
    /// This role may not be omitted
    member: Snowflake;

    /// A role which will be pinged upon new members joining the server
    /// This role is required if-and-only-if the welcome channel is specified
    greeter: Snowflake?;

    inactivityPing: Snowflake?;
  };
  links: {
    /// A link to somewhere with the rules (commonly a channel or thread)
    /// Used in the verification embed
    rules: string;

    // These are used in the rules embed - by name

    rule1: string;
    rule2: string;
    rule3: string;
    rule5: string;
    rule6: string;
    rule7: string;
    rule9: string;
    rule12: string;
  };

  /// Used in the original DM sent to members
  invite: string;
}

export interface Config {
  debugOut: (...log: any) => void;
  verboseOut: (...log: any) => void;
  clientId: string;
  guilds: Record<Snowflake, Guild>;
}

export const config: Config;
