Sourceposer
=================

SourceMod plugin management cli (work in progress)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/sourceposer/sourceposer-cli/blob/master/package.json)

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
* [`sourceposer help [COMMAND]`](#sourceposer-help-command)
* [`sourceposer i [PLUGIN]`](#sourceposer-i-plugin)
* [`sourceposer init`](#sourceposer-init)
* [`sourceposer install [PLUGIN]`](#sourceposer-install-plugin)
* [`sourceposer update [PLUGIN]`](#sourceposer-update-plugin)

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

## `sourceposer i [PLUGIN]`

install a new plugin

```
USAGE
  $ sourceposer i [PLUGIN]

ARGUMENTS
  PLUGIN  Plugin to install, example: b3none/retakes-autoplant

DESCRIPTION
  install a new plugin

ALIASES
  $ sourceposer i
```

## `sourceposer init`

initialise sourceposer for this SourceMod installation

```
USAGE
  $ sourceposer init

DESCRIPTION
  initialise sourceposer for this SourceMod installation
```

_See code: [dist/commands/init.ts](https://github.com/b3none/sourceposer/blob/v0.0.0/dist/commands/init.ts)_

## `sourceposer install [PLUGIN]`

install a new plugin

```
USAGE
  $ sourceposer install [PLUGIN]

ARGUMENTS
  PLUGIN  Plugin to install, example: b3none/retakes-autoplant

DESCRIPTION
  install a new plugin

ALIASES
  $ sourceposer i
```

_See code: [dist/commands/fetch.ts](https://github.com/b3none/sourceposer/blob/v0.0.0/dist/commands/install.ts)_

## `sourceposer update [PLUGIN]`

update existing plugins

```
USAGE
  $ sourceposer update [PLUGIN]

ARGUMENTS
  PLUGIN  Plugin to update, example: b3none/retakes-autoplant

DESCRIPTION
  update existing plugins
```

_See code: [dist/commands/update.ts](https://github.com/b3none/sourceposer/blob/v0.0.0/dist/commands/update.ts)_
<!-- commandsstop -->
