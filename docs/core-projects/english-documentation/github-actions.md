---
title: Run Vale in GitHub Actions
description: Understand how this repository runs Vale and MkDocs in GitHub Actions, then deploys only after validation succeeds.
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

# Run Vale in GitHub Actions

This guide explains how this repository runs documentation checks in GitHub
Actions and prevents deployment when validation fails.

The current workflow uses the same documentation directory and repository
configuration as the local Vale check. It also runs an MkDocs strict build
before the deployment job can start.

Complete [Set up local documentation checks with Vale](quick-start.md) and
[Configure Vale for a documentation repository](configure-vale.md) before
using this page.

!!! info "Validation status"

    The workflow structure and inputs on this page were checked against the
    repository's current `.github/workflows/ci.yml`, the official GitHub
    Actions documentation, and the official Vale Action documentation.

    [Documentation CI run #36](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/30780106488)
    completed successfully for commit `9d050a7`. Its validation job completed
    the Vale and MkDocs steps, and the dependent deployment job also passed.

    The current workflow hasn't been tested with a controlled error-level Vale
    violation. Its failure path is therefore documented from the configuration
    and official Action behavior, not marked as an observed end-to-end result.

## Current workflow at a glance

The repository keeps validation and deployment in one workflow file:

```text
.github/workflows/ci.yml
```

The workflow follows this path:

```text
Pull request, push to main, or manual run
-> Validate documentation
   -> Check out the repository
   -> Install documentation dependencies
   -> Run Vale on docs
   -> Run mkdocs build --strict
-> Push to main and validation succeeded
   -> Deploy documentation
```

The workflow produces different results for different events.

| Event | Validation | Deployment |
| --- | --- | --- |
| Pull request | Runs | Doesn't run |
| Push to `main` | Runs | Runs after validation succeeds |
| Manual run | Runs | Doesn't run |

The workflow doesn't define path filters. A pull request or push to `main` can
therefore start validation even when the change is outside `docs/`.

## Before you change the workflow

Confirm that the equivalent local commands work from the repository root:

```bash
vale docs
mkdocs build --strict
```

Then inspect the active Vale configuration:

```bash
vale ls-config
```

This repository depends on these committed inputs:

```text
.vale.ini
docs/
styles/
requirements-docs.txt
.github/workflows/ci.yml
```

The Vale rules are already committed under `styles/`. The workflow doesn't run
`vale sync` because `.vale.ini` doesn't declare external `Packages`.

## Read the workflow triggers

The current trigger block is:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
  workflow_dispatch:
```

Each event has a separate purpose.

| Event | Purpose |
| --- | --- |
| `pull_request` | Check a proposed repository change before merge |
| `push` to `main` | Validate the new main-branch state and allow deployment |
| `workflow_dispatch` | Allow a manual validation run |

The deployment job adds its own condition, so defining `workflow_dispatch`
doesn't grant a manual run permission to deploy.

### Why the workflow has no path filters

The current file doesn't restrict execution to documentation paths. This keeps
the validation behavior simple: every pull request and every push to `main`
runs the same gate.

Path filters could reduce unnecessary runs, but they would also change when a
required check appears. GitHub documents that a skipped required workflow can
remain pending and block a pull request. Add filters only after reviewing the
repository's branch protection settings.

## Read the permissions

The workflow starts with read-only repository access:

```yaml
permissions:
  contents: read
```

The validation job adds permission to create a GitHub check:

```yaml
permissions:
  contents: read
  checks: write
```

This permission matches the Vale step's `github-check` reporter.

The deployment job has a separate permission boundary:

```yaml
permissions:
  contents: write
```

It needs write access because `mkdocs gh-deploy --force` publishes the built
site to the deployment branch. The validation job doesn't receive this write
permission.

## Understand concurrency

The workflow defines:

```yaml
concurrency:
  group: documentation-${{ github.workflow }}-${{ github.event_name }}-${{ github.ref }}
  cancel-in-progress: true
```

The group separates runs by workflow, event, and Git reference. When a newer
run enters the same group, GitHub cancels the older in-progress run.

This prevents multiple outdated documentation runs for the same event and
reference from continuing at the same time.

## Read the validation job

The `validate` job runs on `ubuntu-latest` and contains five task steps:

```text
Checkout
-> Set up Python 3.12
-> Install requirements-docs.txt
-> Run Vale
-> Build MkDocs in strict mode
```

### Check out the repository

The runner starts without the repository files, so the first step checks them
out:

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

The current workflow uses the `v4` tag, not a full commit hash. This is an
existing implementation boundary. GitHub recommends pinning an Action to a
full-length commit hash when an immutable reference is required.

### Install the documentation environment

The workflow uses Python 3.12 and caches dependencies using the documentation
requirements file:

```yaml
- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
    cache-dependency-path: requirements-docs.txt

- name: Install documentation dependencies
  run: python -m pip install --requirement requirements-docs.txt
```

This step prepares MkDocs and its plugins. The Vale Action manages its own Vale
installation in the next step.

## Inspect the writing-style step

The repository uses the official Vale Action:

```yaml
- name: Check writing style with Vale
  uses: vale-cli/vale-action@85f9f7f2c5f449ac0ae5b66662961bae3f77ca6a # v2.1.2
  with:
    version: 3.15.1
    files: docs
    fail_on_error: true
    filter_mode: nofilter
    reporter: github-check
```

Unlike the checkout and Python setup steps, this Action uses a full commit
hash. The release comment preserves the readable version reference.

### Understand each input

| Input | Current value | Effect |
| --- | --- | --- |
| `version` | `3.15.1` | Installs the specified Vale command-line tool version in the Action environment |
| `files` | `docs` | Checks the full documentation source directory |
| `fail_on_error` | `true` | Returns a failure when the reporter receives an error-level finding |
| `filter_mode` | `nofilter` | Reports findings from the complete selected file set |
| `reporter` | `github-check` | Publishes the result as a GitHub check |

The official Vale Action documentation states that `files: docs` is
equivalent to running `vale docs`. It also states that `fail_on_error: true`
changes the reporter's exit behavior when error-level findings occur.

### Understand the repository-wide policy

`filter_mode: nofilter` applies the check to the complete selected source, not
only lines changed in a pull request.

This policy has two effects:

- one consistent standard applies to all files under `docs/`;
- a pre-existing error elsewhere in `docs/` can block an unrelated change.

Warnings and suggestions remain visible because `.vale.ini` uses
`MinAlertLevel = suggestion`. They don't fail the Action unless the reporting
rule uses the `error` level.

## Read the build gate

The validation job runs the strict build after Vale:

```yaml
- name: Build documentation
  run: mkdocs build --strict
```

This step checks the complete MkDocs configuration and content build. Because
the steps use the default success condition, a failed Vale step prevents the
strict build step from running.

The validation job passes only when its required steps complete successfully.

## Read the deployment gate

The deployment job contains two controls:

```yaml
deploy:
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  needs: validate
```

`if` limits deployment to pushes on `main`. `needs: validate` makes deployment
wait for the validation job.

Together, these controls mean:

```text
Pull request -> Validate only
Manual run -> Validate only
Push to main -> Validate -> Deploy
Validation failure -> No deployment
```

The deployment job runs its own checkout, Python setup, dependency installation,
and `mkdocs gh-deploy --force` command. Validation and deployment therefore
remain separate jobs with separate permissions.

## Review the current workflow

The following excerpt keeps the actual structure and values that control the
quality gate:

```yaml
name: Documentation CI

on:
  push:
    branches:
      - main
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  validate:
    name: Validate documentation
    runs-on: ubuntu-latest
    permissions:
      contents: read
      checks: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
          cache-dependency-path: requirements-docs.txt

      - name: Install documentation dependencies
        run: python -m pip install --requirement requirements-docs.txt

      - name: Check writing style with Vale
        uses: vale-cli/vale-action@85f9f7f2c5f449ac0ae5b66662961bae3f77ca6a # v2.1.2
        with:
          version: 3.15.1
          files: docs
          fail_on_error: true
          filter_mode: nofilter
          reporter: github-check

      - name: Build documentation
        run: mkdocs build --strict

  deploy:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: validate
```

Read the complete
[current workflow](https://github.com/alison2fun/tech-docs-portfolio/blob/main/.github/workflows/ci.yml)
before modifying it. The omitted deployment steps remain in the source file.

## Verify a successful run

The current public evidence is
[Documentation CI run #36](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/30780106488)
for commit `9d050a7` on `main`.

The public run data confirms:

| Job or step | Observed result |
| --- | --- |
| `Validate documentation` job | Success |
| `Check writing style with Vale` step | Success |
| `Build documentation` step | Success |
| `Deploy documentation` job | Success |

This run proves that the committed workflow could load the repository, finish
the configured Vale check, complete the strict build, and deploy that commit.

It doesn't include this uncommitted English page. The page needs a new Actions
run after publication before its CI status can be marked as observed.

<!--
Add assets/english-docs/vale-ci-success.png only after capturing a current,
non-sensitive screenshot that shows the workflow name, validation job, Vale
step, and success status. The linked run remains the primary evidence.
-->

## Verify a controlled failure

A successful run doesn't prove that an error-level documentation finding
fails the current workflow end to end.

Use a temporary test file and the existing `MyStyle.Spacing` error rule:

1. create a test branch;
2. add a temporary Markdown file under `docs/` with the controlled
   missing-space pattern used in the local rule test;
3. confirm locally that `vale` reports `MyStyle.Spacing` at the `error` level;
4. commit and push only the temporary test branch;
5. open the Actions run and confirm that the Vale step and validation job fail;
6. correct the text, push again, and confirm that validation passes;
7. remove the temporary test before merge.

!!! warning "Pending end-to-end evidence"

    This controlled failure hasn't been run in the current GitHub Actions
    workflow. The expected failure follows from the configured
    `fail_on_error: true` behavior, but it remains unverified in this repository.

Don't publish the deliberate error on `main` and don't replace the controlled
rule with invented output.

## Read failures by layer

Start with the first failed step, not the final job label.

### The workflow fails before the writing check

Typical locations include workflow parsing, checkout, Python setup, and
dependency installation.

Check:

- the first failed step;
- Action references;
- workflow syntax;
- repository permissions;
- `requirements-docs.txt`.

Vale hasn't made a documentation decision when it never starts.

### Vale reports a documentation error

Vale completes and reports a file, location, message, and rule.

Check whether the content violates the repository policy. Change the rule only
after confirming that the policy or rule is wrong.

### Vale has a runtime failure

The Action starts, but Vale can't load a configuration, style, vocabulary, or
selected file.

Check:

- whether `.vale.ini` is committed at the repository root;
- whether `StylesPath` resolves to the committed `styles/` directory;
- path spelling and capitalization;
- the `files: docs` input;
- the Vale version and Action log.

### Vale passes but MkDocs fails

Vale and MkDocs answer different questions. Vale checks prose rules. The strict
build checks whether the documentation site can be built with the configured
navigation, extensions, templates, and links that MkDocs validates.

Inspect the `Build documentation` step and correct the reported site problem.

### Validation passes but deployment fails

The quality gate completed, but the publishing job failed later.

Check the deployment job's checkout, permissions, dependencies, Git
configuration, and `mkdocs gh-deploy --force` output.

## Keep local and automated checks aligned

The current relationship is:

| Local | GitHub Actions |
| --- | --- |
| `vale docs` | `files: docs` |
| Repository `.vale.ini` | The checked-out `.vale.ini` |
| Repository `styles/` | The checked-out `styles/` directory |
| Vale 3.13.0 in the current local environment | Vale 3.15.1 requested by the Action |
| `mkdocs build --strict` | `mkdocs build --strict` |

The documentation scope and MkDocs command match. The Vale versions don't.
When the results differ, compare version behavior before changing a rule or
document.

## Security and maintenance notes

The Vale Action uses a full commit hash. The current checkout and Python setup
steps use major-version tags:

```text
actions/checkout@v4
actions/setup-python@v5
```

GitHub identifies a full-length commit hash as the immutable way to reference
an Action. Converting the remaining Action references to verified commit hashes is a
separate workflow-hardening change and isn't part of this documentation update.

Review workflow and prose changes in focused diffs when practical. Small diffs
make trigger, permission, and dependency changes easier to audit.

## Completion check

You understand the current workflow when you can:

- identify `.github/workflows/ci.yml` as the active workflow file;
- explain its three triggers;
- explain why validation has `checks: write`;
- map `vale docs` to `files: docs`;
- explain `fail_on_error: true` and `filter_mode: nofilter`;
- explain why the strict build belongs in the validation job;
- show that deployment requires a successful validation job;
- open the real successful run;
- identify the controlled failure as pending evidence;
- describe the local and Action-managed Vale version difference.

## Common problems

### The workflow doesn't start

Confirm that the workflow file exists under `.github/workflows/`, the event
matches the current action, and GitHub Actions is enabled for the repository.

For a push, confirm that the target branch is `main`. This workflow doesn't
define path filters.

### Vale checks the wrong files

Compare the local `vale docs` command with the Action's `files: docs` input.
Also confirm the workflow starts from the repository checkout root.

### Vale can't find a style

Confirm that `.vale.ini`, `styles/`, custom rule files, and vocabulary files
were committed. Linux path matching is case-sensitive.

### The job passes when Vale reports an error

Confirm that the reporting rule uses the `error` level and that the workflow
still includes:

```yaml
fail_on_error: true
filter_mode: nofilter
```

Also confirm that the affected file is under `docs/`.

### Local checks pass but the automated workflow fails

Compare the Vale versions, checked paths, active configuration, committed
styles, and first failed log message. The current local and automated Vale
versions differ.

### Deployment starts for the wrong event

Confirm that the deployment job retains both its `if` condition and
`needs: validate` dependency.

## Project boundaries

This guide covers:

- the repository's current combined validation and deployment workflow;
- pull request, main-branch push, and manual triggers;
- the Vale Action inputs;
- MkDocs strict build validation;
- the validation-to-deployment gate;
- observed successful-run evidence;
- the pending controlled-failure test;
- local and automated check alignment.

This guide doesn't cover:

- branch protection administration;
- organization-wide GitHub Actions policies;
- self-hosted runners;
- automatic documentation fixes;
- deployment secrets;
- a completed controlled-failure run;
- the CI result for this uncommitted page.

## Next steps

Return to [Configure Vale for a documentation repository](configure-vale.md)
when the workflow runs successfully but the enabled rules or terminology need
to change.

Use [Troubleshooting](troubleshooting.md) when local and GitHub Actions results
don't match.

## Sources

- [Current repository workflow](https://github.com/alison2fun/tech-docs-portfolio/blob/main/.github/workflows/ci.yml)
- [Documentation CI run #36](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/30780106488)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [GitHub secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [Official Vale GitHub Action](https://github.com/vale-cli/vale-action)
