---
title: Troubleshoot Vale and CI checks
description: Diagnose the main local Vale and GitHub Actions failures from observable symptoms.
---

<div class="english-doc" markdown>

# Troubleshoot Vale and CI checks

Start with the first observable failure. Don't change rules, paths, and
workflow settings at the same time.

## Quick diagnosis

| Symptom | Start here |
| --- | --- |
| The terminal can't run `vale` | [Vale command not found](#vale-command-not-found) |
| Vale can't locate `.vale.ini` | [Configuration not found](#configuration-not-found) |
| Vale reports a missing style or vocabulary | [Style or vocabulary not found](#style-or-vocabulary-not-found) |
| The command finishes without checking Markdown | [No files checked](#no-files-checked) |
| A test string doesn't trigger `MyStyle.Spacing` | [Custom rule fails to run](#custom-rule-fails-to-run) |
| Local output and GitHub Actions differ | [Local check passes but CI fails](#local-check-passes-but-ci-fails) |
| CI stays green after an error-level finding | [CI ignores error-level findings](#ci-ignores-error-level-findings) |

Vale return codes help separate content findings from execution failures:

| Return code | Meaning |
| ---: | --- |
| `0` | No error-level lint finding |
| `1` | One or more error-level lint findings |
| `2` | Runtime or configuration failure |

## Vale command not found

**Symptom**

The terminal reports that `vale` isn't recognized or can't be found.

**Check**

1. Run `vale --version` in a new terminal.
2. Confirm that installation completed.
3. Confirm that the executable is available on `PATH`.

**Fix**

Reinstall Vale with the platform package manager, then reopen the terminal.

**Verify**

`vale --version` prints an installed version.

## Configuration not found

**Symptom**

Vale reports that it can't find a configuration, or it loads a configuration
from another directory.

**Check**

1. Confirm that the terminal is at the repository root.
2. Confirm that `.vale.ini` exists.
3. Run `vale ls-config` and inspect `RootINI`.

**Fix**

Return to the repository root or specify the configuration explicitly.

```bash
vale --config=".vale.ini" docs
```

**Verify**

`vale ls-config` resolves the repository `.vale.ini` and `styles/` directory.

## Style or vocabulary not found

**Symptom**

Vale reports that Microsoft, Google, `MyStyle`, or the `Portfolio` vocabulary
is unavailable.

**Check**

1. Confirm `StylesPath = styles` in `.vale.ini`.
2. Confirm the named directory exists under `styles/`.
3. Check capitalization against the committed path.

**Fix**

Restore the missing committed style or correct the configured name. Don't run
`vale sync` unless the repository has been changed to declare a package.

**Verify**

`vale ls-config` lists the expected styles and vocabulary.

## No files checked

**Symptom**

`vale docs` produces no file output even though the directory contains
Markdown.

**Check**

1. Confirm that `docs/` is the intended target.
2. Confirm `[*.{md,txt}]` exists in `.vale.ini`.
3. Run Vale against one known Markdown file.

**Fix**

Correct the target path or file pattern instead of weakening the active rules.

**Verify**

The known file produces either a clean scan or a content alert, not an empty
selection caused by the wrong path.

## Custom rule fails to run

**Symptom**

Mixed-language text without a space doesn't trigger `MyStyle.Spacing`.

**Check**

1. Confirm `MyStyle` appears in `BasedOnStyles`.
2. Confirm `styles/MyStyle/Spacing.yml` exists.
3. Test one matching string and one corrected string in a temporary file.

**Fix**

Restore the style reference or correct the rule pattern. Keep the change
focused on the behavior under test.

**Verify**

`中文Vale` reports `MyStyle.Spacing`, while `中文 Vale` doesn't.

## Local check passes but CI fails

**Symptom**

`vale docs` passes locally, but the GitHub Actions validation job fails.

**Check**

1. Compare local Vale 3.13.0 with the CI-requested Vale 3.15.1.
2. Confirm that `.vale.ini`, `styles/`, and the changed document are committed.
3. Inspect the first failing workflow step and message.

**Fix**

Reproduce the failing command from the repository root with the committed
files. Correct the environment or repository difference shown by the first
failure.

**Verify**

The same repository state completes both the local command and the automated
validation job.

## CI ignores error-level findings

**Symptom**

Vale reports an error-level finding, but the workflow step or job remains
successful.

**Check**

1. Confirm the workflow uses `fail_on_error: true`.
2. Confirm `filter_mode: nofilter` and `files: docs` are still present.
3. Confirm the reported finding is `error`, not `warning` or `suggestion`.

**Fix**

Restore the intended Vale Action inputs. Don't raise unrelated rule severity
only to test the workflow.

**Verify**

A controlled error-level fixture fails the Vale step, and the corrected fixture
passes. This controlled CI test is still pending for the current project.

## Build or deployment failures

If Vale passes but MkDocs fails, run `mkdocs build --strict` locally and fix the
first build error. If validation succeeds but deployment fails, inspect the
deployment job condition, `contents: write` permission, and the first failing
deployment step. Keep full deployment diagnosis outside the Vale recovery
paths above.

## Collect evidence

If the issue remains unresolved, record only the evidence needed to reproduce
the failing layer:

- Vale version;
- exact command;
- active configuration path;
- first error message;
- GitHub Actions run link, when CI is involved.

Continue with [Configure Vale](configure-vale.md) for rule maintenance or
[Run Vale in GitHub Actions](github-actions.md) for workflow behavior.

Sources: [Vale CLI](https://vale.sh/docs/cli),
[Vale configuration](https://vale.sh/docs/vale-ini), and
[GitHub Actions troubleshooting](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/troubleshooting-workflows).

</div>
