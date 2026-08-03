---
title: Configure Vale for a documentation repository
description: Understand and update the Vale configuration, styles, vocabulary, and alert levels used by a Markdown documentation repository.
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

# Configure Vale for a documentation repository

This guide explains how this documentation repository controls Vale checks.

The guide covers the active configuration, styles applied to Markdown files,
project vocabulary, and a controlled test of one existing custom rule.

This guide assumes that you have completed
[Set up local documentation checks with Vale](quick-start.md) and can run Vale
from the repository root.

!!! info "Validation status"

    The configuration keys and behavior on this page were checked against the
    official Vale documentation.

    The repository-specific paths, style names, vocabulary, and custom rule were
    checked against the current project files. A controlled test of
    `MyStyle.Spacing` was run locally with Vale 3.13.0.

    The test wasn't run in GitHub Actions. The CI workflow currently requests
    Vale 3.15.1, so CI evidence remains separate from this local result.

## What controls a Vale check

The repository uses four layers:

```text
.vale.ini
→ Selects resources and file-specific settings

Styles
→ Define repeatable writing rules

Vocabulary
→ Records accepted and rejected project terminology

Command or workflow
→ Selects the files to check and reports the result
```

This guide focuses on the first three layers. The GitHub Actions workflow is
covered in a later page.

## Before you begin

You need:

- a local copy of this repository;
- Vale installed and available on your system `PATH`;
- permission to edit repository files;
- a text editor;
- a terminal open at the repository root.

Confirm that Vale loads the current configuration:

```bash
vale ls-config
```

Then record the current repository result:

```bash
vale docs
```

This result is the baseline for evaluating a later configuration change.

## Read the repository configuration

The repository stores its Vale configuration at `.vale.ini` in the repository
root.

The current configuration is:

```ini
StylesPath = styles
MinAlertLevel = suggestion
Vocab = Portfolio

[*.{md,txt}]
BasedOnStyles = Vale, Microsoft, Google, MyStyle
```

The core settings apply to the configuration as a whole. The
`[*.{md,txt}]` section applies its settings to Markdown and plain-text files.

| Setting | Current value | Effect |
| --- | --- | --- |
| `StylesPath` | `styles` | Loads repository rules and vocabulary resources from `styles/` |
| `MinAlertLevel` | `suggestion` | Displays suggestions, warnings, and errors |
| `Vocab` | `Portfolio` | Loads the project terminology list |
| File pattern | `*.{md,txt}` | Applies the section to Markdown and text files |
| `BasedOnStyles` | `Vale, Microsoft, Google, MyStyle` | Enables all rules in the listed styles |

The configuration doesn't define `Packages`, `TokenIgnores`, or
`BlockIgnores`.

## Inspect the active configuration

Run:

```bash
vale ls-config
```

Vale prints the merged configuration as JSON. In the current local environment,
the output confirms:

- `RootINI` points to the repository's `.vale.ini`;
- `Paths` includes the repository's `styles/` directory;
- `Vocab` contains `Portfolio`;
- `SBaseStyles` enables `Vale`, `Microsoft`, `Google`, and `MyStyle` for
  `*.{md,txt}`.

The output also lists Vale's user-level style directory. Absolute paths differ
between computers, so verify the repository path instead of copying another
user's output.

!!! tip "Compare repository and local behavior"

    When two computers produce different results, compare `vale ls-config`
    before editing a rule. A global configuration or a different resource path
    can change the active settings.

For diagnosis, explicitly select the repository configuration:

```bash
vale --config=".vale.ini" docs
```

The normal project command remains `vale docs` while configuration discovery
works correctly.

## Follow `StylesPath`

`StylesPath = styles` points Vale to the repository's committed rules and
vocabulary resources.

The current structure is:

```text
styles/
├── Google/
├── Microsoft/
├── MyStyle/
│   └── Spacing.yml
└── config/
    └── vocabularies/
        └── Portfolio/
            ├── accept.txt
            └── reject.txt
```

The Microsoft and Google directories are committed snapshots. Committing them
allows local checks and CI to read the same rule files. Upstream rule updates
should be reviewed and committed as a separate change.

## Understand `BasedOnStyles`

`BasedOnStyles` enables all rules contained in each listed style for files that
match the section pattern.

The current setting is:

```ini
[*.{md,txt}]
BasedOnStyles = Vale, Microsoft, Google, MyStyle
```

The four styles have different roles:

| Style | Role in this repository |
| --- | --- |
| `Vale` | Provides Vale's built-in spelling, terminology, avoidance, and repetition rules |
| `Microsoft` | Reports wording and editorial style feedback from the committed snapshot |
| `Google` | Reports wording and editorial style feedback from the committed snapshot |
| `MyStyle` | Runs the repository's custom Chinese and Latin-character spacing rule |

Combining multiple editorial styles can produce overlapping feedback. This
repository keeps warnings and suggestions visible for human review, while
error-level results remain the blocking level.

## Review the custom spacing rule

The repository contains one custom rule:

```text
styles/MyStyle/Spacing.yml
```

The rule identifier is `MyStyle.Spacing`. It extends Vale's `existence` check,
uses the `error` level, and detects a Chinese character placed directly beside
an English letter or number.

The rule protects one documented writing decision: add a space between Chinese
prose and adjacent English terms or numbers.

The rule file uses the required `.yml` extension. Vale doesn't load custom rule
files that use `.yaml`.

## Configure alert levels

Vale supports three alert levels.

| Level | Meaning in this repository |
| --- | --- |
| `suggestion` | Optional editorial feedback displayed for review |
| `warning` | A likely style or consistency issue displayed for review |
| `error` | A rule violation that returns a nonzero Vale exit code |

The repository uses:

```ini
MinAlertLevel = suggestion
```

Vale therefore displays all three levels. Warnings and suggestions don't
produce a nonzero exit code. Errors do.

Changing `MinAlertLevel` to `error` would hide warnings and suggestions from
the command output. It wouldn't improve the underlying documents.

Use alert levels to express policy. Don't lower a level only to make the check
pass.

## Manage project terminology

The configuration loads this vocabulary:

```ini
Vocab = Portfolio
```

Vale reads it from:

```text
styles/config/vocabularies/Portfolio/
├── accept.txt
└── reject.txt
```

`accept.txt` currently records approved terms such as:

```text
Datasheet
OAuth
OpenClaw
Verilog
Vue
```

These are examples from the current file, not a complete list.

`reject.txt` currently contains only a comment and doesn't define rejected
terms. Don't document a rejected-term workflow as implemented until the file
contains a reviewed entry and preferred replacement.

Use one entry per line. Confirm the spelling and capitalization before adding a
term. A vocabulary is appropriate for stable names and terminology; it isn't a
substitute for a rule that needs context or a complex pattern.

After changing the vocabulary, rerun:

```bash
vale docs
```

Confirm that the intended alert changed and unrelated rules still run.

## Understand packages and `vale sync`

The current `.vale.ini` doesn't declare `Packages`. The required Microsoft,
Google, and custom rule files are already committed under `styles/`.

For this repository, the normal configuration path doesn't include:

```bash
vale sync
```

If a future change adds a `Packages` setting, `vale sync` downloads those
packages into the active `StylesPath`. Review the generated changes before
committing them, and don't mix a package update with unrelated documentation
edits.

## Decide whether Markdown needs an ignore

Vale supports Markdown directly. It ignores fenced code blocks, indented code
blocks, inline code spans, and URLs by default.

The current `.vale.ini` doesn't define `TokenIgnores` or `BlockIgnores`. Run a
check before adding either key.

Add an ignore only after you:

1. reproduce the unwanted alert;
2. confirm that the content should remain outside the writing rules;
3. make the pattern as narrow as possible;
4. test normal prose near the ignored content;
5. document why the ignore exists.

A broad ignore can hide a real documentation issue.

## Verify the existing custom rule

A configuration rule needs both a matching and a non-matching test.

### 1. Create a temporary test file

Create a Markdown file that places a short Chinese phrase directly beside the
English word `Vale`, without a space.

Don't insert a deliberate failure into a published documentation page.

### 2. Run the targeted check

```bash
vale path/to/temporary-test.md --no-wrap
```

### Expected result

The local controlled test produced:

- rule: `MyStyle.Spacing`;
- level: `error`;
- return code: `1`.

This result confirms that the rule loaded and detected the intended pattern.

### 3. Add the required space

Add a space between the Chinese phrase and `Vale`, then rerun the same command.

### Expected result

The targeted alert disappears. The controlled local test returned code `0`
after the correction.

### 4. Remove the test file

Delete the temporary file after recording the result. The controlled file used
for this page was removed and isn't part of the published documentation.

!!! success "Configuration verification"

    The local test verified that `MyStyle.Spacing`:

    - loads from the committed `styles/` directory;
    - triggers on the intended unspaced pattern;
    - accepts the corrected form;
    - changes the return code from `1` to `0` for the targeted file.

    This test doesn't verify the GitHub Actions environment.

<!--
Add assets/english-docs/vale-rule-before-after.png only after a current,
non-sensitive screenshot has been captured from this controlled test. Do not
fabricate terminal output.
-->

## Change the configuration with controlled checks

Use this sequence for a repository configuration change:

```text
Record the baseline
→ Make one focused change
→ Inspect vale ls-config
→ Run a matching test
→ Run a non-matching test
→ Run vale docs
→ Review the diff
```

Keep the change focused enough that the result can be attributed to one rule,
vocabulary entry, or configuration setting.

## Completion check

You have completed this guide when you can:

- identify the active `.vale.ini`;
- explain where `StylesPath` points;
- identify the styles enabled for Markdown;
- distinguish a style from a vocabulary;
- explain how `MinAlertLevel` changes displayed results and exit behavior;
- explain why this repository doesn't currently run `vale sync`;
- inspect `MyStyle.Spacing`;
- verify a rule with matching and non-matching content.

## Common problems

### Vale loads an unexpected configuration

Run `vale ls-config`, confirm `RootINI`, and check whether a global
configuration adds or overrides settings.

For diagnosis, run:

```bash
vale --config=".vale.ini" docs
```

### A style is configured but not found

Confirm the `StylesPath`, style directory name, and `.yml` file extension. This
repository uses committed style files, so also confirm that your local copy is
complete.

### A new rule doesn't run

Check whether:

- its style is listed in `BasedOnStyles`;
- the rule is explicitly turned off;
- the file matches `*.{md,txt}`;
- the rule scope matches the content;
- `MinAlertLevel` hides the result.

### An accepted term still produces an alert

Confirm that `Portfolio` is active, the term is in the correct `accept.txt`, and
the capitalization matches. Identify the reporting rule before adding another
exception.

### Compare local and automated output

Compare the Vale version, working directory, selected configuration, checked
path, command options, committed styles, and `vale ls-config` output.

## Project boundaries

This guide covers:

- the current project-level `.vale.ini`;
- Markdown and text style selection;
- alert levels and exit behavior;
- the `Portfolio` vocabulary;
- the current `MyStyle.Spacing` rule;
- a controlled local rule test.

This guide doesn't cover:

- designing an organization-wide style guide;
- publishing Vale packages;
- advanced regular-expression development;
- complete automated rule-test suites;
- editor-specific integrations;
- GitHub Actions workflow syntax.

## Next steps

Continue to [Run Vale in GitHub Actions](github-actions.md) to apply the
repository checks to pushes and pull requests.

Use [Troubleshooting](troubleshooting.md) when the active configuration,
repository styles, or automated environment doesn't produce the expected
result.

## Sources

- [Vale configuration file](https://vale.sh/docs/vale-ini)
- [`BasedOnStyles`](https://vale.sh/docs/keys/basedonstyles)
- [`MinAlertLevel`](https://vale.sh/docs/keys/minalertlevel)
- [Vocabularies](https://vale.sh/docs/keys/vocab)
- [Markdown support](https://vale.sh/docs/formats/markdown)
- [Vale styles and rule files](https://vale.sh/docs/styles)
