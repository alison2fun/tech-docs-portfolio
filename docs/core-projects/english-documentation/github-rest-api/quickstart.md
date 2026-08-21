---
title: Get repository details with the GitHub REST API
description: Request public repository metadata with GitHub CLI or curl and verify the response.
---

<div class="english-doc" markdown>

# Get repository details with the GitHub REST API

In this guide, you will request metadata for a public GitHub repository and
verify its full name, visibility, and default branch.

You can complete the request with GitHub CLI or `curl`. This guide uses the
public repository `alison2fun/tech-docs-portfolio`.

## Send the request

Choose a command-line tool.

=== "GitHub CLI"

    GitHub CLI handles authentication and simplifies requests to the GitHub
    REST API.

    1. Open a terminal and check whether GitHub CLI is installed.

       ```bash
       gh --version
       ```

       In the tested Windows PowerShell environment, the command returned:

       ```text
       gh version 2.96.0 (2026-07-02)
       https://github.com/cli/cli/releases/tag/v2.96.0
       ```

       Your version number and release date might differ. GitHub CLI is ready
       when the first line begins with `gh version` and includes a version
       number.

       If the terminal reports that `gh` is not recognized or cannot be found,
       install GitHub CLI and run `gh --version` again. See the
       [GitHub CLI installation instructions](https://github.com/cli/cli#installation).

    2. Authenticate to GitHub.

       ```bash
       gh auth login
       ```

       Select `GitHub.com`, then follow the prompts to authenticate in your
       browser.

       In the tested Windows PowerShell environment, a successful login
       included these lines:

       ```text
       ✓ Authentication complete.
       ✓ Logged in as alison2fun
       ```

       Continue when the output includes `Authentication complete` and
       `Logged in as` shows the account you intended to use. If this account is
       already authenticated, the output might also include `You were already
       logged in to this account`.

    3. Send the request.

       Enter the following command as one line. The same command works in
       Windows PowerShell, Command Prompt, macOS, and Linux.

       ```bash
       gh api /repos/alison2fun/tech-docs-portfolio --include --method GET --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
       ```

       !!! warning

           Do not add `\` characters between the arguments in Windows
           PowerShell. A backslash is a Bash line-continuation character, but
           PowerShell passes it to GitHub CLI as an additional argument.

       Continue when the output contains a response status line with status
       code `200`, response headers, and a JSON response body.

    ??? note "Command explanation"

        - `gh api` sends an authenticated request to the GitHub REST API.
        - `/repos/alison2fun/tech-docs-portfolio` identifies the repository.
        - `--include` displays the response status and headers.
        - `--method GET` retrieves the repository without changing it.
        - `Accept: application/vnd.github+json` requests the recommended JSON media type.
        - `X-GitHub-Api-Version` selects the API version used by this example.

=== "curl"

    The `curl` request does not require an access token because the example
    repository is public.

    1. Check whether `curl` is installed.

       In Windows PowerShell, run:

       ```powershell
       curl.exe --version
       ```

       In macOS or Linux, run:

       ```bash
       curl --version
       ```

       In the tested Windows PowerShell environment, the first lines were:

       ```text
       curl 8.14.1 (Windows) libcurl/8.14.1 Schannel zlib/1.3.1 WinIDN
       Release-Date: 2025-06-09
       ```

       Your version, operating system, and supported features might differ.
       Continue when the first line begins with `curl`, includes a `libcurl`
       version, and the `Protocols` line includes `https`.

       If the terminal reports that `curl` is not recognized or cannot be
       found, install it and run the version command again. See the
       [curl download page](https://curl.se/download.html).

    2. Send the request.

       In Windows PowerShell, enter the following command as one line:

       ```powershell
       curl.exe --include --location --request GET --url "https://api.github.com/repos/alison2fun/tech-docs-portfolio" --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
       ```

       In macOS or Linux, enter the following command as one line:

       ```bash
       curl --include --location --request GET --url "https://api.github.com/repos/alison2fun/tech-docs-portfolio" --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
       ```

       Continue when the output contains a response status line with status
       code `200`, response headers, and a JSON response body.

    ??? note "Command explanation"

        - `--include` displays the response status and headers.
        - `--location` follows a redirect if GitHub moves the resource.
        - `--request GET` retrieves the repository without changing it.
        - `--url` specifies the complete API endpoint.
        - `Accept: application/vnd.github+json` requests the recommended JSON media type.
        - `X-GitHub-Api-Version` selects the API version used by this example.

## Verify the response

Find the status line at the beginning of the response. The HTTP protocol text
can vary between environments, but the status code must be `200`.

```text
HTTP/2.0 200
HTTP/1.1 200 OK
```

Next, find these fields in the JSON response body:

```json
{
  "full_name": "alison2fun/tech-docs-portfolio",
  "visibility": "public",
  "default_branch": "main"
}
```

Check each value:

- `full_name` must be `alison2fun/tech-docs-portfolio`.
- `visibility` must be `public`.
- `default_branch` must be `main`.

!!! success "Expected result"

    The request is successful when the response status code is `200` and all
    three field values match the expected values above.

If the request returns an error or a required value is missing, see
[Troubleshoot repository metadata requests](troubleshooting.md).

## Request another public repository

Replace `OWNER` and `REPOSITORY` with the owner and name of another public
repository.

=== "GitHub CLI"

    ```bash
    gh api /repos/OWNER/REPOSITORY --include --method GET --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
    ```

=== "curl"

    In Windows PowerShell:

    ```powershell
    curl.exe --include --location --request GET --url "https://api.github.com/repos/OWNER/REPOSITORY" --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
    ```

    In macOS or Linux:

    ```bash
    curl --include --location --request GET --url "https://api.github.com/repos/OWNER/REPOSITORY" --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
    ```

After sending the request, confirm that the response status code is `200`,
`full_name` matches the requested repository, `visibility` is `public`, and
`default_branch` contains the repository's current default branch.

## Next steps

- Review the [Get a repository endpoint](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository) for other response fields.
- Learn how to [authenticate to the REST API](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28) before requesting private resources.
- If the request fails, use [Troubleshoot repository metadata requests](troubleshooting.md).

## Source and validation

The endpoint, request headers, and response fields are based on the GitHub REST
API documentation.

The `curl` procedure was run on August 13, 2026, in Windows PowerShell with curl
`8.14.1`. The request returned:

- `HTTP/1.1 200 OK`
- `Content-Type: application/json; charset=utf-8`
- `x-github-api-version-selected: 2022-11-28`
- `full_name`: `alison2fun/tech-docs-portfolio`
- `visibility`: `public`
- `default_branch`: `main`

The environment also returned `HTTP/1.1 200 Connection established` before the
GitHub response. This status came from the network proxy and wasn't treated as
the API result.

The GitHub CLI installation and authentication steps were run on August 13,
2026, in Windows PowerShell with GitHub CLI `2.96.0`. Authentication completed
for the `alison2fun` account.

The first GitHub CLI API attempt used Bash-style `\` line continuations in
Windows PowerShell and returned:

```text
accepts 1 arg(s), received 5
```

The GitHub CLI command in this guide was changed to a single line. The corrected
GitHub CLI request hasn't yet been rerun in Windows PowerShell.

## Project notes

Read [the writing retrospective for this GitHub REST API documentation sample](../../../posts/github-rest-api-english-docs-retrospective.md).

</div>
