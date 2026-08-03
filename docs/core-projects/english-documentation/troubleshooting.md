---
title: Troubleshoot Vale and CI checks
description: Diagnose local Vale failures, configuration problems, and GitHub Actions issues by starting from observable symptoms.
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
  .md-typeset .md-typeset__scrollwrap,
  .md-typeset .mermaid {
    box-sizing: border-box;
    max-width: 100%;
  }

  .md-typeset p code {
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>

# Troubleshoot Vale and CI checks

Use this guide when a local Vale command or the Documentation CI workflow
doesn't produce the expected result.

Start with the first observable failure. Don't change rules, paths, or workflow
permissions until you know which stage failed.

This guide covers the repository's local Vale check and the GitHub Actions
workflow that runs Vale, builds the MkDocs site, and deploys after validation.

!!! info "Validation status"

    The commands on this page were checked with Vale 3.13.0 in the current
    local repository. `vale ls-config`, `vale ls-vars`, `vale ls-dirs`,
    `--no-global`, and the documented return-code categories were exercised
    locally.

    A controlled local test verified the existing `MyStyle.Spacing` error rule:
    the matching form returned `1`, and the corrected form returned `0`. A
    missing configuration path produced a runtime error and returned `2`.

    [Documentation CI run #36](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/30780106488)
    verifies the current successful workflow path. The current workflow hasn't
    completed a controlled error-level failure test, so that path remains
    pending evidence.

## Diagnostic path

Use the first failed question to select the next section.

<div class="mermaid">
flowchart TD
    A["Can the terminal run Vale?"] -->|No| B["Check installation and PATH"]
    A -->|Yes| C["Does Vale load the project configuration?"]
    C -->|No| D["Check the repository root and .vale.ini"]
    C -->|Yes| E["Are committed styles available?"]
    E -->|No| F["Check StylesPath and styles files"]
    E -->|Yes| G["Does Vale scan the intended files?"]
    G -->|No| H["Check docs path, file pattern, and ignores"]
    G -->|Yes| RULE["Does the intended rule run?"]
    RULE -->|No| J["Check active styles, level, and scope"]
    RULE -->|Yes| K["Does GitHub Actions start?"]
    K -->|No| L["Check event, branch, and workflow state"]
    K -->|Yes| M["Does the run reach the Vale step?"]
    M -->|No| N["Check workflow setup and the first failed step"]
    M -->|Yes| O["Compare local and automated environments"]
</div>

**Figure 1. Diagnostic path for local and automated documentation checks**

*The diagram locates a failure stage; it doesn't identify the cause by itself.*

## Quick diagnosis

| Symptom | Start here |
| --- | --- |
| The shell can't find `vale` | Vale is unavailable |
| Vale reports no configuration | Configuration isn't found |
| Vale loads unexpected settings | The wrong configuration loads |
| Vale can't find a style or vocabulary | Styles aren't available |
| Vale checks no Markdown files | No files are checked |
| A controlled phrase doesn't trigger `MyStyle.Spacing` | The custom rule doesn't run |
| Vale reports overlapping or unexpected feedback | Alerts don't match the policy |
| No Documentation CI run appears | The workflow doesn't start |
| The job fails before the Vale step | Vale never runs |
| Local checks pass but the workflow fails | Local and automated results differ |
| Error-level findings don't fail the job | The failure policy isn't applied |
| Vale succeeds but the site build fails | MkDocs fails after Vale |
| Validation succeeds but publication fails | Deployment fails after validation |

## Collect evidence first

Run these commands from the repository root:

```bash
vale --version
vale ls-config
vale ls-vars
vale ls-dirs
vale docs
```

They identify:

- the installed Vale version;
- the active project configuration;
- supported Vale environment variables and their current values;
- default configuration directories;
- the result of the normal repository check.

Record the command, working directory, first error message, return code,
affected file, and reporting rule.

For a GitHub Actions problem, also record:

- the workflow name and run link;
- the event and branch;
- the tested commit;
- the first failed job and step;
- the relevant log lines.

The final red or green status doesn't identify the failed layer by itself.

## Local Vale problems

### Vale is unavailable

**Symptom**

The shell reports that `vale` can't be found or recognized.

**Check**

Run:

```bash
vale --version
```

If the shell can't start Vale:

1. confirm that installation completed;
2. close and reopen the terminal;
3. confirm that the executable directory is on `PATH`;
4. confirm that the expected user account installed Vale;
5. try the same command in another terminal.

**Fix**

Install Vale with the package method selected for the operating system, or add
the existing Vale executable directory to `PATH`.

**Verification**

`vale --version` prints a version instead of a shell-level command error. Then
run `vale ls-config` from the repository root.

### Configuration isn't found

**Symptom**

Vale starts but reports a missing configuration or can't begin the repository
check.

**Check**

1. confirm that the terminal is at the repository root;
2. confirm that `.vale.ini` exists at the root;
3. check its spelling and capitalization;
4. run `vale ls-config`;
5. select the repository configuration explicitly:

   ```bash
   vale --config=".vale.ini" docs
   ```

The current repository uses `.vale.ini` and `docs`, not the placeholder paths
from a generic example.

**Fix**

Run Vale from the repository root or use the verified relative path with
`--config`. Don't copy another configuration file into a different directory
to hide a working-directory mistake.

**Verification**

`vale ls-config` reports the repository's `.vale.ini`, `styles/`, `Portfolio`
vocabulary, and enabled styles.

### The wrong configuration loads

**Symptom**

Vale runs, but its active styles, vocabulary, alert levels, or paths don't
match `.vale.ini`.

**Check**

```bash
vale ls-config
vale ls-vars
```

Compare:

- `RootINI`;
- `StylesPath`;
- `MinAlertLevel`;
- `BasedOnStyles`;
- `Vocab`;
- `VALE_CONFIG_PATH`;
- `VALE_STYLES_PATH`.

Run a diagnostic check without global configuration:

```bash
vale --no-global --config=".vale.ini" docs
```

Vale 3.13.0 in the current environment supports this command.

**Fix**

Remove or correct the unintended environment variable or global setting. Keep
project behavior in the repository configuration so local and automated checks
can reproduce it.

**Verification**

`vale ls-config` shows the intended paths, `Portfolio` vocabulary, and
`Vale, Microsoft, Google, MyStyle` styles.

### Styles aren't available

**Symptom**

Vale loads `.vale.ini` but can't find a style, vocabulary, or custom rule.

**Check**

The current configuration expects:

```text
styles/
|-- Google/
|-- Microsoft/
|-- MyStyle/
|   `-- Spacing.yml
`-- config/
    `-- vocabularies/
        `-- Portfolio/
            |-- accept.txt
            `-- reject.txt
```

Confirm that:

- `StylesPath` resolves to the committed `styles/` directory;
- the directories and files exist in the current checkout;
- rule files use the `.yml` extension;
- path capitalization matches;
- the vocabulary files exist.

The repository doesn't declare `Packages`, so its normal path doesn't include
`vale sync`. Use `vale sync` only if a later `.vale.ini` adds packages.

**Fix**

Restore missing committed resources or correct `StylesPath`. Don't recreate a
missing style from memory.

**Verification**

Run:

```bash
vale ls-config
vale docs
```

Vale reaches the content check without a missing-style runtime error.

### No files are checked

**Symptom**

Vale completes without a clear runtime error, but the intended Markdown files
don't appear in the result.

**Check**

1. confirm that `docs/` exists and contains Markdown files;
2. run one known file:

   ```bash
   vale docs/core-projects/english-documentation/quick-start.md
   ```

3. confirm that `.vale.ini` applies to `*.{md,txt}`;
4. confirm the command runs from the repository root;
5. check path spelling and capitalization;
6. check command-line globs and repository ignore files.

The current `.vale.ini` doesn't define `TokenIgnores` or `BlockIgnores`.

**Fix**

Use the verified `docs` path and narrow any glob or ignore expression that
excludes an intended file. Don't replace `vale docs` with `vale .` until you
know which additional files the wider command includes.

**Verification**

The single-file check and `vale docs` both reach the intended Markdown source.

### The custom rule doesn't run

**Symptom**

Vale scans a test file, but the missing-space pattern doesn't trigger
`MyStyle.Spacing`.

**Check**

1. confirm that `styles/MyStyle/Spacing.yml` exists;
2. confirm that `MyStyle` appears in `BasedOnStyles`;
3. confirm that the rule hasn't been turned off;
4. confirm that `MinAlertLevel` doesn't hide the rule level;
5. confirm that the test file matches `*.{md,txt}`;
6. keep the test outside code blocks, URLs, and ignored syntax;
7. run `vale ls-config`;
8. isolate one controlled violation in a temporary Markdown file.

**Fix**

Restore the enabled style or correct the rule scope and test fixture. Don't
lower unrelated levels or turn off other styles to simplify the test.

**Verification**

The controlled local test must report:

- `MyStyle.Spacing`;
- level `error`;
- the expected file and location;
- return code `1`.

After adding the required space, the targeted alert disappears and the file
returns `0`.

### Alerts don't match the policy

**Symptom**

Vale reports feedback that doesn't match the repository's writing decision, or
several rules report the same passage.

**Check**

1. identify the exact reporting rules;
2. inspect `vale ls-config`;
3. check whether Microsoft and Google rules overlap;
4. check whether a global configuration adds a style;
5. determine whether the term belongs in `Portfolio/accept.txt`;
6. reproduce the alert in the smallest possible temporary file.

**Fix**

Choose the narrowest justified change:

- correct the document;
- add a verified project term to the vocabulary;
- narrow the rule scope;
- remove an unintended style;
- turn off one rule with a documented project decision.

Don't add a broad ignore for one unclear result.

**Verification**

The passage produces actionable feedback, and normal nearby content remains
checked.

### Interpret Vale return codes

The current local environment produced these categories:

| Return code | Observed meaning |
| ---: | --- |
| `0` | The targeted file contained no error-level result |
| `1` | The controlled `MyStyle.Spacing` error was reported |
| `2` | Vale couldn't load an explicitly selected missing configuration file |

Use the return code with the first message:

```text
Return code 1
-> Vale completed the check
-> Review the reported document or rule

Return code 2
-> Vale couldn't complete the check
-> Fix the environment, path, configuration, or style
```

Not every nonzero result indicates a broken installation.

## GitHub Actions problems

### The workflow doesn't start

**Symptom**

A pull request, push to `main`, or manual action produces no new Documentation
CI run.

**Check**

1. confirm that `.github/workflows/ci.yml` exists on the tested branch;
2. inspect the `on:` block;
3. confirm that the event matches `pull_request`, a push to `main`, or
   `workflow_dispatch`;
4. confirm that GitHub Actions is enabled;
5. check whether the workflow was manually turned off;
6. check the commit message for a workflow skip instruction;
7. check whether a pull request has a merge conflict.

The current workflow doesn't define path filters. A changed-file mismatch is
therefore not a cause in the current implementation.

**Fix**

Correct the event, branch, or workflow state. Don't add broader permissions to
solve a trigger problem.

**Verification**

The intended event creates a run named `Documentation CI` with the expected
branch, commit, and event.

### Vale never runs

**Symptom**

The workflow starts, but `Validate documentation` fails before `Check writing
style with Vale`.

**Check**

Open the run and locate the first failed step:

```text
Parse workflow
-> Start runner
-> Checkout repository
-> Set up Python
-> Install documentation dependencies
-> Run Vale
```

Check the YAML syntax, Action reference, checkout permissions,
`requirements-docs.txt`, and first relevant log message.

**Fix**

Correct the first failed workflow stage. Don't edit Vale rules when the Vale
step never started.

**Verification**

The next run reaches `Check writing style with Vale`.

### Configuration is missing in the workflow

**Symptom**

Vale works locally, but the workflow can't find `.vale.ini`, `styles/`, the
vocabulary, or `docs/`.

**Check**

1. confirm that the files were committed and pushed;
2. confirm that checkout succeeded;
3. compare path spelling and capitalization;
4. confirm that `StylesPath = styles` resolves from the repository root;
5. confirm `files: docs` matches the local command;
6. confirm that required styles aren't present only in an uncommitted local
   directory.

This repository commits its style resources and doesn't use package
synchronization in the workflow.

**Fix**

Commit the missing resources or correct the relative path. Keep the workflow
self-contained through checked-out repository files.

**Verification**

The Vale step loads the intended configuration and reaches a content result.

### Local and automated results differ

**Symptom**

The local check passes, but the Vale step fails or reports different files and
rules.

Compare the current environments:

| Item | Local | GitHub Actions |
| --- | --- | --- |
| Vale version | 3.13.0 in the current environment | 3.15.1 requested by the Action |
| Working directory | Local repository root | Checked-out runner workspace |
| Configuration | Active `.vale.ini` plus possible global settings | Checked-out `.vale.ini` |
| Styles | Local and committed files | Committed `styles/` files |
| File system | Windows | `ubuntu-latest` runner |
| Checked scope | `vale docs` | `files: docs` |
| Failure policy | Vale process return code | `fail_on_error: true` and `nofilter` |

Also check uncommitted files, case-sensitive paths, environment variables, and
the first log message.

**Fix**

Align the configuration, committed resources, scope, and failure policy.
Investigate the version difference before changing content or rules.

**Verification**

The same controlled fixture produces the same rule-level decision locally and
in the workflow.

### Error findings don't fail the job

**Symptom**

The Vale output contains an error-level finding, but the validation job remains
successful.

**Check**

The current workflow must retain:

```yaml
with:
  files: docs
  fail_on_error: true
  filter_mode: nofilter
  reporter: github-check
```

Also check the rule level, reporter output, workflow
`continue-on-error`, and whether the finding is under `docs/`.

For a direct Vale command, confirm that it doesn't use `--no-exit`.

**Fix**

Restore the intended failure policy. Don't use `continue-on-error: true` for a
required quality gate unless the repository treats the check as
informational.

**Verification**

Run one controlled error on a test branch. The Vale step and validation job
should fail, then pass after correction.

This end-to-end test remains pending for the current workflow.

### Reporter permissions fail

**Symptom**

Vale completes, but the workflow can't create the `github-check` result.

**Check**

The validation job currently grants:

```yaml
permissions:
  contents: read
  checks: write
```

Confirm the selected reporter, triggering event, fork context, repository
policy, and authorization message in the Action log.

**Fix**

Grant only the permission required by the verified reporter, or choose a
reporter that matches the contribution model. Don't give the whole workflow
broad write access.

**Verification**

The Vale step completes and creates its intended check without an authorization
error.

### MkDocs fails after Vale

**Symptom**

`Check writing style with Vale` succeeds, but `Build documentation` fails.

**Check**

Open the strict build log and locate the first MkDocs error. Vale and MkDocs
validate different properties:

- Vale checks prose rules;
- MkDocs checks whether the configured documentation site builds.

Run the same command locally:

```bash
mkdocs build --strict
```

**Fix**

Correct the reported navigation, extension, template, Markdown, or link issue.
Don't change a Vale rule to fix an MkDocs failure.

**Verification**

Both the Vale and strict build steps succeed in `Validate documentation`.

### Deployment fails after validation

**Symptom**

The validation job succeeds, but `Deploy documentation` fails on a push to
`main`.

**Check**

Inspect the deployment job's checkout, Git author setup, Python environment,
dependencies, `contents: write` permission, and `mkdocs gh-deploy --force`
output.

**Fix**

Correct the first failed deployment step. The successful validation result
doesn't prove that repository publication permissions are correct.

**Verification**

The deployment job completes after validation and the published site reflects
the tested commit.

## Compare evidence directly

Use this table when the cause remains unclear:

| Question | Local evidence | Automated evidence |
| --- | --- | --- |
| Which Vale version ran? | `vale --version` | Vale step configuration and log |
| Which configuration loaded? | `vale ls-config` | Checked-out `.vale.ini` and Vale log |
| Which styles were available? | Local `StylesPath` | Committed `styles/` directory |
| Which files were selected? | `vale docs` | `files: docs` |
| Which rule reported the issue? | Terminal output | GitHub check or Action log |
| Which return status appeared? | Shell return code | Step and job conclusion |
| Did Vale run? | Local terminal | First failed workflow step |

Change one variable at a time.

## Run a controlled test

The repository has completed the local half of this test. The automated half
remains pending.

### 1. Select the existing rule

Use `MyStyle.Spacing`, which is enabled at the `error` level and has a clear
corrected form.

### 2. Create a temporary fixture

Create a temporary Markdown file under `docs/` with one missing-space pattern
between Chinese and English text.

Don't insert the error into a normal published page.

### 3. Verify the local failure

Run:

```bash
vale path/to/temporary-test.md --no-wrap
```

The completed local test reported `MyStyle.Spacing` and returned `1`.

### 4. Correct the fixture

Add the required space and rerun the same command. The completed local test
returned `0` after correction.

### 5. Verify the automated failure

On a test branch, commit the temporary fixture and confirm that Documentation
CI reports the same rule and fails the validation job.

Correct the fixture, push again, and confirm recovery.

This step hasn't been performed for the current workflow.

### 6. Remove the fixture

Delete the temporary file before merge. Don't merge a deliberate failing state
into `main`.

<!--
Add local and GitHub Actions screenshots only after the automated controlled
failure has been run. Each image must show the real file, rule, step, and
status without exposing private paths, tokens, or unrelated account data.
-->

## Still unresolved

Collect enough evidence for another maintainer to reproduce the issue.

### Local environment

Record:

- operating system and version;
- Vale version and installation method;
- repository commit and current working directory;
- normal Vale command;
- `vale ls-config` output;
- relevant `vale ls-vars` output;
- full runtime message;
- affected file and rule;
- whether `--no-global` changes the result.

### GitHub Actions environment

Record:

- workflow file and commit;
- workflow run link;
- event and branch or pull request;
- runner operating system;
- Action references and Vale version;
- job permissions;
- first failed step and relevant log lines;
- whether the same commit reproduces the issue locally.

Remove tokens, private paths, and unrelated account information before sharing
logs or screenshots.

## Completion check

The issue is resolved when:

- the failed stage has been identified;
- the change addresses the cause instead of hiding the result;
- the normal local check returns the expected decision;
- the workflow reaches the intended Vale step;
- local and automated results follow the documented policy;
- a controlled failure is detected where that path is under test;
- correcting the failure restores a passing result;
- temporary fixtures and deliberate errors are removed.

## Project boundaries

This guide covers:

- Vale command availability and configuration discovery;
- the repository's committed styles and vocabulary;
- Markdown file selection;
- custom rule activation and alert behavior;
- the current Documentation CI triggers and steps;
- local and automated result differences;
- controlled local failure and recovery evidence;
- the pending automated controlled-failure test.

This guide doesn't cover:

- complete operating-system package-manager troubleshooting;
- advanced regular-expression debugging;
- GitHub organization administration;
- branch-protection configuration procedures;
- self-hosted runner maintenance;
- general network outage diagnosis;
- custom GitHub Action development;
- a completed controlled CI failure that hasn't occurred.

## Related documentation

Return to [Set up local documentation checks with Vale](quick-start.md) when
Vale hasn't completed the first local check.

Return to
[Configure Vale for a documentation repository](configure-vale.md) when the
active styles, terminology, or alert policy need to change.

Return to [Run Vale in GitHub Actions](github-actions.md) when you need to
review the current workflow and its successful-run evidence.

## Sources

- [Vale command-line interface](https://vale.sh/docs/cli)
- [Vale configuration search and override behavior](https://vale.sh/docs/vale-ini)
- [Official Vale GitHub Action](https://github.com/vale-cli/vale-action)
- [GitHub workflow troubleshooting](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Current repository workflow](https://github.com/alison2fun/tech-docs-portfolio/blob/main/.github/workflows/ci.yml)
- [Documentation CI run #36](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/30780106488)
