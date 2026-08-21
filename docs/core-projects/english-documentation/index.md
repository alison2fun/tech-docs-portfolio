---
title: English documentation
description: English developer documentation samples for the GitHub REST API and a documentation quality pipeline.
---

<div class="english-doc" markdown>

# English documentation

This section contains two English documentation projects. The GitHub REST API
sample is a short, complete path through one API task. Documentation Quality
Pipeline is a larger Docs-as-Code project with five task-based pages.

## GitHub REST API documentation sample

**Recommended first sample**

This two-page documentation sample uses the real GitHub REST API and the public
repository `alison2fun/tech-docs-portfolio`. The Quickstart offers GitHub CLI
and `curl` procedures, identifies platform differences, and gives observable
criteria for the HTTP response and repository fields. The companion
Troubleshooting page starts from terminal errors and HTTP status codes, then
narrows the diagnosis with commands, response headers, and explicit branches.

The tested environment, observed output, and unverified cases are recorded in
the pages. Read them in this order:

1. [Get repository details with the GitHub REST API](github-rest-api/quickstart.md)
2. [Troubleshoot repository metadata requests](github-rest-api/troubleshooting.md)

This is the smaller of the two projects and can be reviewed quickly as a
complete developer-documentation sample.

## Documentation Quality Pipeline

Documentation Quality Pipeline is a five-page Docs-as-Code project for the
workflow used by this portfolio. It covers local Vale checks, repository rules,
GitHub Actions, MkDocs strict builds, and recovery from local or automated
failures.

Start with the [Project overview](documentation-quality-pipeline.md), then
continue with the page that matches the current task.

### Documentation Quality Pipeline pages

- [Set up local documentation checks with Vale](quick-start.md)
- [Configure Vale for a documentation repository](configure-vale.md)
- [Run Vale in GitHub Actions](github-actions.md)
- [Troubleshoot Vale and CI checks](troubleshooting.md)

The five pages pass the current local Vale check and MkDocs strict build. A
published workflow run includes this documentation set. The controlled CI
failure-and-recovery test remains pending.

</div>
