---
title: Set up local documentation checks with Vale
description: Install Vale, confirm the repository configuration, and run your first local documentation check.
---

<style>
@media screen and (max-width: 44.984375em) {
  .md-main__inner,
  .md-content {
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
    max-width: 100vw;
  }

  .md-content__inner {
    box-sizing: border-box;
    width: calc(100vw - 2rem) !important;
    max-width: calc(100vw - 2rem) !important;
    margin-right: 1rem !important;
    margin-left: 1rem !important;
    padding: 1rem 0;
  }

  .md-typeset .admonition,
  .md-typeset .md-typeset__scrollwrap {
    box-sizing: border-box;
    max-width: 100%;
  }

  .md-typeset p code {
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>

# Set up local documentation checks with Vale

This Quick Start helps you run the first Vale check in a configured Markdown
documentation repository.

The path covers installing the Vale command-line tool, confirming that Vale can
find the repository configuration, and scanning the documentation files.

**Estimated time:** 5–10 minutes, excluding package manager setup.

## What you will complete

By the end of this guide, you can:

- run `vale --version`;
- confirm that Vale loads the repository configuration;
- run Vale against the documentation directory;
- distinguish a content alert from a configuration or runtime failure.

A working setup produces one of these results:

```text
No alerts
```

or:

```text
File path
→ Line and column
→ Alert message
→ Rule name
```

Both results confirm that Vale scanned the documentation. A configuration or
runtime error means that the setup still needs attention.

!!! info "Validation status"

    The installation commands and return codes on this page were checked
    against the official Vale documentation.

    In the current Windows repository, `vale --version`, `vale ls-config`, and
    `vale docs` were run with Vale 3.13.0. The repository paths and committed
    styles were also checked locally.

    The macOS and Linux installation commands come from the official Vale
    installation guide and haven't been run in the author's environment. The
    GitHub Actions workflow currently requests Vale 3.15.1 and remains a
    separate CI validation environment.

## Before you begin

You need:

- a local copy of the documentation repository;
- a terminal or command prompt;
- permission to install a command-line tool;
- the package manager used by your operating system.

You don't need to understand Vale rule syntax before completing this guide.

Open the repository root before running the project commands. The root contains
the Vale configuration, committed styles, and documentation source.

```text
repository/
├── .vale.ini
├── docs/
├── styles/
└── mkdocs.yml
```

## 1. Install Vale

Choose the command for your operating system. The package manager must already
be installed.

=== "Windows"

    Use Chocolatey:

    ```powershell
    choco install vale
    ```

=== "macOS"

    Use Homebrew:

    ```bash
    brew install vale
    ```

=== "Linux"

    Use Snap:

    ```bash
    sudo snap install vale
    ```

After installation, open a new terminal and check the Vale version:

```bash
vale --version
```

### Expected result

The terminal prints the installed Vale version.

```text
vale version ...
```

The exact version number depends on the installed release. The current Windows
environment for this repository reports `vale version 3.13.0`.

!!! failure "If the command isn't found"

    Close and reopen the terminal first.

    If `vale` is still unavailable, confirm that the installation completed and
    that the Vale executable is available on your system `PATH`.

## 2. Open the repository

Change to the root of the documentation repository.

```bash
cd path/to/tech-docs-portfolio
```

Replace the example path with the location of your local repository.

Confirm that the current directory contains:

```text
.vale.ini
docs/
styles/
```

The `.vale.ini` file is the repository-level entry point for Vale
configuration. The `docs/` directory contains the Markdown files checked in
this project. The `styles/` directory contains the rules and vocabulary used by
the repository.

!!! warning "Run commands from the repository root"

    Vale searches the current directory and its parent directories for a
    `.vale.ini` or `_vale.ini` file.

    Running the command from an unrelated directory may load another
    configuration or fail to find the project configuration.

## 3. Confirm the committed styles

This repository doesn't declare a `Packages` setting in `.vale.ini`. The
required Microsoft, Google, and custom `MyStyle` rules are already committed to
`styles/`, together with the `Portfolio` vocabulary.

You don't need to run `vale sync` for the current repository state. Running it
would be appropriate only after the configuration declares a package that must
be downloaded.

Confirm that the repository includes these paths:

```text
styles/
├── Google/
├── Microsoft/
├── MyStyle/
└── config/vocabularies/Portfolio/
```

## 4. Confirm the configuration

Run:

```bash
vale ls-config
```

### Expected result

Vale prints the active configuration as JSON.

Check that the output refers to:

- the repository's `.vale.ini` file under `RootINI`;
- the repository's `styles/` directory under `Paths`;
- the `Portfolio` vocabulary;
- `Vale`, `Microsoft`, `Google`, and `MyStyle` for Markdown and text files.

The exact absolute paths depend on the location of your local repository.

!!! failure "If Vale loads the wrong configuration"

    Confirm that the terminal is open at the repository root.

    You can also specify the configuration explicitly:

    ```bash
    vale --config=".vale.ini" docs
    ```

Don't continue until Vale can load the intended project configuration.

## 5. Run the first check

From the repository root, run:

```bash
vale docs
```

Vale scans the supported files under `docs/` using the active repository
configuration.

### Expected result

Vale produces one of the following outcomes.

#### No alerts

The command completes without listing content alerts.

This means that Vale scanned the selected files and didn't find an enabled
rule violation.

#### Content alerts

Vale lists the affected file, location, severity, message, and rule.

Example structure:

```text
docs/example.md
  12:8  warning  Replace the discouraged term.  Project.Terms
```

This means that the setup is working and a documentation rule found an issue.
The example illustrates the output structure; it isn't output captured from
this repository.

The current repository displays suggestions and warnings because
`MinAlertLevel` is set to `suggestion`. The command can still return code `0`
when it finds no error-level alerts.

#### Runtime error

Vale reports that it can't load a configuration, locate a style, read a file,
or complete the check.

A runtime error means that the local setup isn't complete.

<!--
Add assets/english-docs/vale-first-local-check.png only after a current,
non-sensitive screenshot has been captured from this repository. The image
must show the repository context, command, and real Vale result.
-->

## 6. Read the result

Vale uses return codes to distinguish the result type.

| Return code | Meaning |
| ---: | --- |
| `0` | No linting errors were found |
| `1` | One or more linting errors were found |
| `2` | A runtime error occurred |

A return code of `1` can still confirm that the installation and repository
configuration are working. It means Vale completed the check and found content
that violates an error-level rule.

A return code of `2` indicates a setup or execution problem that must be
resolved before the content result can be trusted.

## Completion check

You have completed this Quick Start when all of the following are true:

- `vale --version` returns an installed version;
- `vale ls-config` loads the intended repository configuration;
- `vale docs` scans the documentation directory;
- the command doesn't stop with a runtime error;
- you can identify whether the result contains no alerts or one or more content
  alerts.

You don't need to change the repository configuration to complete this guide.

## Common problems

### `vale` isn't recognized

Confirm that Vale was installed successfully and is available on your system
`PATH`. Reopen the terminal after installation.

### Vale can't find `.vale.ini`

Run the command from the repository root.

If necessary, provide the configuration path explicitly:

```bash
vale --config=".vale.ini" docs
```

### Vale can't find a style

Check the configured `StylesPath` and confirm that the committed `styles/`
directory is present.

This repository doesn't require `vale sync` in its current state because it
doesn't declare Vale packages.

### Vale checks no files

Confirm that:

- the documentation directory is correct;
- the directory contains supported Markdown files;
- `.vale.ini` enables styles for the relevant file extension;
- the command doesn't exclude the files through a glob or ignore setting.

## Next steps

Continue to
[Configure Vale for a documentation repository](configure-vale.md) to
understand the active styles, vocabulary, and alert levels.

To automate the same check after a push or pull request, continue to
[Run Vale in GitHub Actions](github-actions.md).

Use [Troubleshooting](troubleshooting.md) when the local command, active
configuration, or automated result doesn't match the expected outcome.

## Sources

- [Install Vale](https://vale.sh/docs/install)
- [Vale command-line options and return codes](https://vale.sh/docs/cli)
- [Vale configuration search process](https://vale.sh/docs/vale-ini)
