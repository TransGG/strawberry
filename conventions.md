# Project Conventions

Conventions for JavaScript modules. Directory and file names are purely convention; they do not affect program
behavior. This project generally follows the [Airbnb JS style guide](https://airbnb.io/javascript/); see the
[eslint configs](#.eslintrc.json) for the differences.

- [Project Conventions](#project-conventions)
- [Directory conventions](#directory-conventions)
  - [Nesting handler folders](#nesting-handler-folders)
    - [Subcommands & subcommand groups](#subcommands--subcommand-groups)
    - [All other event/interaction handlers](#all-other-eventinteraction-handlers)
- [File conventions](#file-conventions)
  - [Handlers for a specific event or interaction](#handlers-for-a-specific-event-or-interaction)
  - [Classes](#classes)
  - [Everything else](#everything-else)
- [Handler-specific naming conventions](#handler-specific-naming-conventions)
  - [Events](#events)
  - [Slash commands, subcommands, subcommand groups, and context menu commands](#slash-commands-subcommands-subcommand-groups-and-context-menu-commands)
  - [Buttons, select menus, and modals](#buttons-select-menus-and-modals)

# Directory conventions

Directory names are all lowercase. Names are in `snake_case` and have no additional punctuation.

e.g. `node_modules/`

## Nesting handler folders

### Subcommands & subcommand groups

Subcommands are in a folder with the folder's name matching exactly the parent command's name. If a subcommand is part
of a group, the subcommand is in a folder with a name that defines the subcommand group's name and said folder is
directly in the parent command's folder. Folders representing parent commands are directly in the subcommands directory
with no nesting.

e.g.
```
subcommands/
- stop/           // parent command, must match parent command's name exactly
  - collaborate/  // subcommand group
    - listen.js   // subcommand
  - hammertime.js // subcommand
```

### All other event/interaction handlers

All other event/interaction handlers may be in nested directories. Program behavior is not affected by the internal
structure of these directories.

e.g. `commands/dev/ping.js`

# File conventions

All JavaScript files use the extension `.js`

## Handlers for a specific event or interaction

For the file name of handler for a specific event or interaction (e.g. an `interactionCreate` event, `ping` command,
or `My Button` button), the file name matches the name field of the event/interaction exactly. `My Button` is purely an
example; lowercase for slash commands, any format for context menu commands, and `camelCase` for everything else is
preferred.

e.g. `ping.js`, `My Button.js`

Additionally, the class name matches the name field, but in `PascalCase`.

e.g. `ping.js` contains `class Ping extends SlashCommand`

If a class name of a handler is the same as the name of another handler, suffix the class name (but not file name) with
an identifier of the type of handler. Suffixing both is preferred, but it is optional to suffix the higher-level class
or less recent class where there is no clear winner.

e.g. `class ModalCommand extends Command`, `class ModalSubcommand extends Subcommand`. Both of these files are named
`modal.js`

If the class name of a handler is the same as the name of a non-handler class, only the handler class's name is
suffixed.

e.g. `class Modal` class and `class ModalSubcommand extends Subcommand` subcommand


## Classes

For files that export-default a class that is not an event/interaction handler, the file name matches the name of the
class, which is in `PascalCase`.

e.g. `SlashCommand.js`

## Everything else

All other JavaScript file names are in camelCase.

e.g. `loadFiles.js`

# Handler-specific naming conventions

Given that the file name and the name property [must match](#handlers-for-a-specific-event-or-interaction), both file
name and name property must follow the name/custom id rules of Discord.

## Events

Must match the value of a property of [`Events`](https://discord.js.org/#/docs/discord.js/main/typedef/Events) from
discord.js.

e.g. `interactionCreate.js` matches the value of `Events.InteractionCreate`

## Slash commands, subcommands, subcommand groups, and context menu commands

Valid names must match the regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$`. In practice this means the name must
be between 1 and 32 characters (inclusive) and consist of lowercase letters, numbers, and underscores.

See the
[Discord documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming).

e.g. `valid_name2`

## Buttons, select menus, and modals

Name must be between 1 and 100 characters, inclusive.

e.g. `Custom_ID #1.0 你好`

