import { Collection, SlashCommandBuilder } from 'discord.js';
import SlashCommand from './SlashCommand.js';
import { CommandChildNotFound } from '../../utils/errors.js';
import { verbose } from '../../config/out.js';

/**
 * Parent class for handlers of slash commands that have subcommands. Has a default implementation
 * for run() and getData() that runs the proper subcommand and retrieves the subcommand[ group]'s
 * data, respectively.
 */
class SlashCommandWithSubcommands extends SlashCommand {
    /**
     * A collection of the subcommands and subcommand groups of this command. Maps the name to the
     * value.
     */
    #children;

    /**
     * Creates the data that describes the command format to the Discord API for the command and all
     * subcommands and subcommand groups. The only other data needed are the data for the
     * subcommand.
     */
    getData() {
        // create data for the parent command
        const builder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.name); // placeholder - descriptions of parent commands are not visible

        // add the data for each subcommand or subcommand group + its subcommands
        this.#children.forEach((child, name) => {
            if (child instanceof Collection) { // option is a subcommand group
                builder.addSubcommandGroup((group) => {
                    group
                        .setName(name)
                        .setDescription(name); // placeholder - descriptions of subcommand groups are not visible
                    child.forEach((subcommand) => { // add data for each of the group's subcommands
                        group.addSubcommand(subcommand.getData());
                    });
                    return group;
                });
            } else { // option is a direct subcommand
                builder.addSubcommand(child.getData());
            }
        });

        return builder;
    }

    /**
     * Method to run when this slash command is executed. Runs the subcommand if not overridden
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     */
    async run(interaction) {
        await this.runSubcommand(interaction);
    }

    /**
     * Combines the existing collection of children with a new one. (Children meaning direct
     * subcommands or subcommand groups)
     * @param {Collection} newChildren A collection of children
     */
    addChildren(newChildren) {
        // type check
        if (!(newChildren instanceof Collection)) {
            throw new TypeError('Expected argument val to be of type Collection');
        }

        // initialize #children if needed
        if (!this.#children) {
            this.#children = new Collection();
        }

        // combine the collection
        this.#children = this.#children.concat(newChildren);
    }

    /**
     * Runs the subcommand passed by the interaction, retrieving it from its group if necessary.
     * @param {ChatInputCommandInteraction} interaction The interaction that was emitted when this
     *     slash command was executed
     * @throws {CommandInteractionOptionNoSubcommand} If the interaction does not have a subcommand
     *     (should be because the command was ran without a subcommand)
     * @throws {CommandChildNotFoundException} If a group or subcommand was specified and it was not
     *     found as a child of this command.
     */
    async runSubcommand(interaction) {
        const groupName = interaction.options.getSubcommandGroup();
        const subcommandName = interaction.options.getSubcommand();

        // get subcommand from the collection or get subcommand group from collection and subcommand
        // from the group
        let subcommand;
        if (groupName) {
            const group = this.#children.get(groupName);
            if (!group) {
                throw new CommandChildNotFound(interaction.commandName, {
                    group: groupName,
                    subcommand: subcommandName,
                    isGroupTheMissingOne: true,
                });
            }
            subcommand = group.get(subcommandName);
        } else { // no subcommand group, so get subcommand directly
            subcommand = this.#children.get(subcommandName);
        }

        if (!subcommand) {
            throw new CommandChildNotFound(interaction.commandName, {
                group: groupName,
                subcommand: subcommandName,
            });
        }

        verbose(`Running subcommand ${subcommand.name}${groupName ? `, group: ${groupName} ` : ''}`);
        await subcommand.run(interaction);
    }
}

export default SlashCommandWithSubcommands;
