import { Collection, SlashCommandBuilder } from 'discord.js';
import SlashCommand from './SlashCommand.js';
import { CommandChildNotFoundException } from '../../utils/errors.js';
import { loadSubcommands } from '../../utils/loadFiles.js';

/**
 * Parent class for commands that subcommands. Handles building the data and running the selected subcommand so all
 * further operations are handleded by the specific subcommand of this command (since a slash command that has
 * subcommands cannot be ran without a subcommand). If subclasses implement run or data, they should call
 * super.run(interaction) and super.builder unless they are prepared to handle retrieval of subcommands, groups, and
 * their  respective data.
 */
class SlashCommandWithSubcommands extends SlashCommand {
    /**
     * A collection of the subcommands and subcommand groups of this command. Maps the name to the value.
     */
    #children;

    /**
     * @param {string} name The name of this slash command
     */
    constructor(name) {
        super(name);

        // load subcommands
        this.#children = new Collection();
        loadSubcommands(this.#children, this.name);
    }

    /**
     * Creates the data that describes the command format to the Discord API for the command and all subcommands and
     * subcommand groups. The only other data needed are the data for the subcommand.
     */
    get data() {
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
                        group.addSubcommand(subcommand.data);
                    });
                    return group;
                });
            } else { // option is a direct subcommand
                builder.addSubcommand(child.data);
            }
        });

        return builder;
    }

    /**
     * Runs the subcommand passed by the interaction, retrieving it from its group if necessary.
     * @param {Interaction} interaction The interaction that was emitted when this slash command was executed
     * @throws {CommandInteractionOptionNoSubcommand} If the interaction does not have a subcommand (should be because
     *     the command was ran without a subcommand)
     * @throws {CommandChildNotFoundException} If a group or subcommand was specified and it was not found as a child of
     *     this command.
     */
    async run(interaction) {
        const groupName = interaction.options.getSubcommandGroup();
        const subcommandName = interaction.options.getSubcommand();

        // get subcommand from the collection or get subcommand group from collection and subcommand from the group
        let subcommand;
        if (groupName) {
            const group = this.#children.get(groupName);
            if (!group) {
                throw new CommandChildNotFoundException(interaction.commandName, {
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
            throw new CommandChildNotFoundException(interaction.commandName, {
                group: groupName,
                subcommand: subcommandName,
            });
        }

        subcommand.run(interaction);
    }
}
export default SlashCommandWithSubcommands;
