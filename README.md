Sourceposer
=================

SourceMod plugin version management cli 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g sourceposer
$ sourceposer COMMAND
running command...
$ sourceposer (--version)
sourceposer/0.0.0 linux-x64 node-v18.4.0
$ sourceposer --help [COMMAND]
USAGE
  $ sourceposer COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`sourceposer hello PERSON`](#sourceposer-hello-person)
* [`sourceposer hello world`](#sourceposer-hello-world)
* [`sourceposer help [COMMAND]`](#sourceposer-help-command)
* [`sourceposer plugins`](#sourceposer-plugins)
* [`sourceposer plugins:install PLUGIN...`](#sourceposer-pluginsinstall-plugin)
* [`sourceposer plugins:inspect PLUGIN...`](#sourceposer-pluginsinspect-plugin)
* [`sourceposer plugins:install PLUGIN...`](#sourceposer-pluginsinstall-plugin-1)
* [`sourceposer plugins:link PLUGIN`](#sourceposer-pluginslink-plugin)
* [`sourceposer plugins:uninstall PLUGIN...`](#sourceposer-pluginsuninstall-plugin)
* [`sourceposer plugins:uninstall PLUGIN...`](#sourceposer-pluginsuninstall-plugin-1)
* [`sourceposer plugins:uninstall PLUGIN...`](#sourceposer-pluginsuninstall-plugin-2)
* [`sourceposer plugins update`](#sourceposer-plugins-update)

## `sourceposer hello PERSON`

Say hello

```
USAGE
  $ sourceposer hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/b3none/sourceposer/blob/v0.0.0/dist/commands/hello/index.ts)_

## `sourceposer hello world`

Say hello world

```
USAGE
  $ sourceposer hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `sourceposer help [COMMAND]`

Display help for sourceposer.

```
USAGE
  $ sourceposer help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sourceposer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `sourceposer plugins`

List installed plugins.

```
USAGE
  $ sourceposer plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sourceposer plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `sourceposer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sourceposer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ sourceposer plugins add

EXAMPLES
  $ sourceposer plugins:install myplugin 

  $ sourceposer plugins:install https://github.com/someuser/someplugin

  $ sourceposer plugins:install someuser/someplugin
```

## `sourceposer plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sourceposer plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sourceposer plugins:inspect myplugin
```

## `sourceposer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sourceposer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ sourceposer plugins add

EXAMPLES
  $ sourceposer plugins:install myplugin 

  $ sourceposer plugins:install https://github.com/someuser/someplugin

  $ sourceposer plugins:install someuser/someplugin
```

## `sourceposer plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ sourceposer plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ sourceposer plugins:link myplugin
```

## `sourceposer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sourceposer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sourceposer plugins unlink
  $ sourceposer plugins remove
```

## `sourceposer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sourceposer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sourceposer plugins unlink
  $ sourceposer plugins remove
```

## `sourceposer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sourceposer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sourceposer plugins unlink
  $ sourceposer plugins remove
```

## `sourceposer plugins update`

Update installed plugins.

```
USAGE
  $ sourceposer plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
