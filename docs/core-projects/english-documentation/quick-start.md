---
title: Set up local documentation checks with Vale
description: Install Vale and run the first local check in this configured Markdown repository.
---

<div class="english-doc" markdown>

# Set up local documentation checks with Vale

## Outcome

This Quick Start ends when `vale docs` scans the documentation directory and
you can distinguish a content alert from a runtime failure.

!!! info "Validation status"

    The current Windows repository uses Vale 3.13.0. The Windows commands and
    repository paths on this page have been checked locally. The macOS and Linux
    installation commands come from the official Vale installation guide and
    have not been run in the author's environment.

## Before you begin

You need a local copy of the repository, a terminal, and permission to install
a command-line tool. Open the repository root before running project commands.

The root contains:

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

    ```powershell
    choco install vale
    ```

    This is the platform checked for the current repository.

=== "macOS"

    ```bash
    brew install vale
    ```

    This command comes from the official installation guide and is not locally
    verified for this project.

=== "Linux"

    ```bash
    sudo snap install vale
    ```

    This command comes from the official installation guide and is not locally
    verified for this project.

Open a new terminal and confirm the installation:

```bash
vale --version
```

The terminal should print an installed Vale version.

!!! failure "Vale command not found"

    Reopen the terminal first. If the command is still unavailable, confirm
    that the installation completed and that the Vale executable is on the
    system `PATH`.

## 2. Open the repository

Change to the repository root:

```bash
cd path/to/tech-docs-portfolio
```

Replace the example path with the local repository location. Confirm that the
current directory contains `.vale.ini`, `docs/`, and `styles/`.

Vale searches the current directory and its parent directories for a
configuration file. Running the command from an unrelated directory can load
the wrong configuration or fail to find one.

To inspect the active configuration before the first scan, optionally run:

```bash
vale ls-config
```

The output should refer to the repository `.vale.ini`, the committed `styles/`
directory, and the `Portfolio` vocabulary.

!!! failure "Configuration not found"

    Return to the repository root. If necessary, run the check with an explicit
    configuration path:

    ```bash
    vale --config=".vale.ini" docs
    ```

## 3. Run `vale docs`

From the repository root, run:

```bash
vale docs
```

Vale scans the supported files under `docs/` with the committed repository
rules.

## Interpret the result

The command can produce three useful result types.

**No alerts**

Vale completes without listing a content issue. The scan ran and found no
enabled alert in the selected files.

**Content alerts**

Vale lists a file, line, severity, message, and rule name. This result also
proves that the scanner and repository configuration are working. Review the
reported content before deciding whether to edit the document or the rule.

**Runtime error**

Vale reports that it can't load a configuration, locate a style, read a file,
or complete the scan. Fix the setup before interpreting the content result.

This Quick Start is complete when `vale --version` returns a version and
`vale docs` scans the documentation without a runtime error. Suggestions and
warnings are content feedback. They're different from an execution failure.

## Next steps

- Read [Configure Vale](configure-vale.md) before changing a rule or vocabulary entry.
- Read [Run Vale in GitHub Actions](github-actions.md) to understand the automated check.
- Use [Troubleshooting](troubleshooting.md) for return codes and recovery steps.

Sources: [Install Vale](https://vale.sh/docs/install),
[Vale CLI](https://vale.sh/docs/cli), and
[Vale configuration](https://vale.sh/docs/vale-ini).

</div>
