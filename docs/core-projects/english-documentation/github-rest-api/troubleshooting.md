---
title: Troubleshoot repository metadata requests
description: Diagnose GitHub CLI, authentication, connection, repository path, and rate-limit failures.
---

<div class="english-doc" markdown>

# Troubleshoot repository metadata requests

Use this guide when the request in
[Get repository details with the GitHub REST API](quickstart.md) doesn't reach
GitHub or returns an error.

Find the message that matches the output in your terminal.

| Message or symptom | Where the request stopped |
| --- | --- |
| `accepts 1 arg(s), received 5` | The shell didn't parse the GitHub CLI command correctly |
| GitHub CLI authentication doesn't complete | GitHub CLI can't use an authenticated account |
| `Could not resolve host` or `Failed to connect` | The terminal can't connect to the GitHub API |
| `404 Not Found` | GitHub can't find or expose the requested repository |
| `403 Forbidden` or `429 Too Many Requests` | GitHub received the request but refused to process it |

## `accepts 1 arg(s), received 5`

GitHub CLI displays:

```text
accepts 1 arg(s), received 5
```

This error occurs before the request reaches GitHub. In Windows PowerShell, a
backslash doesn't continue a command on the next line. PowerShell passes each
`\` to GitHub CLI as another argument.

A command copied in this Bash format therefore fails:

```text
gh api --include \
  --method GET \
  --header "Accept: application/vnd.github+json" \
  --header "X-GitHub-Api-Version: 2022-11-28" \
  /repos/alison2fun/tech-docs-portfolio
```

Remove the backslashes and enter the command on one line:

```powershell
gh api /repos/alison2fun/tech-docs-portfolio --include --method GET --header "Accept: application/vnd.github+json" --header "X-GitHub-Api-Version: 2022-11-28"
```

Return to [Verify the response](quickstart.md#verify-the-response) after sending
the corrected request.

## GitHub CLI authentication doesn't complete

Use this section when `gh auth login` doesn't reach `Authentication complete`,
`gh api` reports an authentication error, or you are unsure which GitHub
account is active.

Check the authentication state for GitHub.com:

```powershell
gh auth status --hostname github.com
```

The command tests the stored credentials and identifies the active account. If
the output lists `github.com` and shows the intended account as active, use the
error returned by `gh api` to select another section on this page.

If the output reports that you aren't logged in or that the stored
authentication has a problem, start browser authentication again:

```powershell
gh auth login --hostname github.com --web
```

When GitHub CLI displays a one-time code:

1. Copy the code.
2. Press Enter to open the GitHub device activation page. If the page doesn't
   open, use the URL displayed in the terminal.
3. Paste the code into the browser.
4. Authorize GitHub CLI.
5. Return to the terminal and wait for `Authentication complete`.

If `gh auth status` shows the wrong account and the intended account is already
registered, switch accounts:

```powershell
gh auth switch --hostname github.com --user USERNAME
```

Replace `USERNAME` with the account shown by `gh auth status`. Don't use
`gh auth status --show-token` when recording screenshots or publishing test
results because that option displays the authentication token.

After authentication completes, return to the
[GitHub CLI procedure](quickstart.md#send-the-request).

For more information, see the GitHub CLI references for
[`gh auth login`](https://cli.github.com/manual/gh_auth_login) and
[`gh auth status`](https://cli.github.com/manual/gh_auth_status).

## `Could not resolve host` or `Failed to connect`

`curl` might stop without returning an HTTP status:

```text
curl: (6) Could not resolve host: api.github.com
```

or:

```text
curl: (7) Failed to connect to api.github.com port 443
```

Error `6` means that curl couldn't resolve `api.github.com` to an IP address.
Error `7` means that curl obtained an address but couldn't establish the
connection. The request hasn't reached the GitHub REST API, so changing the
repository owner or name won't resolve either error.

### For `Could not resolve host`

First, confirm that the request URL contains this exact host:

```text
api.github.com
```

The URL must not contain spaces, line breaks, a misspelled host name, or
additional punctuation inside the quotation marks. Next, test whether the
operating system can resolve the host name.

=== "Windows PowerShell"

    ```powershell
    Resolve-DnsName api.github.com
    ```

    DNS resolution is working when the result contains one or more `IPAddress`
    values.

=== "macOS"

    ```bash
    dscacheutil -q host -a name api.github.com
    ```

    DNS resolution is working when the result contains an `ip_address` value.

=== "Linux"

    ```bash
    getent hosts api.github.com
    ```

    DNS resolution is working when the command returns an IP address followed
    by `api.github.com`.

If the lookup doesn't return an address:

1. Confirm that the computer is connected to the internet.
2. Reconnect the VPN or proxy required by your network.
3. Run the DNS lookup again.
4. If the host name still can't be resolved, use another permitted network or
   contact the network administrator.

### For `Failed to connect`

In Windows PowerShell, test whether the terminal can reach port `443`:

```powershell
Test-NetConnection api.github.com -Port 443
```

Find `TcpTestSucceeded` in the output.

- `TcpTestSucceeded : True` means that the TCP connection is available. Run
  the original request again.
- `TcpTestSucceeded : False` means that the connection is being blocked or
  can't be established.

If the connection fails:

1. Check [GitHub Status](https://www.githubstatus.com/) for an incident
   affecting API requests.
2. Confirm that the VPN or proxy required by your network is connected.
3. Confirm that the network permits HTTPS connections to `api.github.com` on
   port `443`.
4. If the network is managed by an organization, ask the administrator whether
   the domain is blocked.

Don't disable an organization-managed firewall or security control to
complete the request. After the connection is available, return to the
[`curl` procedure](quickstart.md#send-the-request).

The meanings of curl errors `6` and `7` are documented in
[curl exit codes](https://everything.curl.dev/cmdline/exitcode.html).

## `404 Not Found`

The response contains:

```text
HTTP/1.1 404 Not Found
```

and a response body similar to:

```json
{
  "message": "Not Found"
}
```

Begin with the repository address. Open this page in a private browser window:

```text
https://github.com/OWNER/REPOSITORY
```

For the Quickstart example, open:

```text
https://github.com/alison2fun/tech-docs-portfolio
```

If the page opens without requiring you to sign in, copy the owner and
repository name from the browser address. The matching API endpoint must use
this structure:

```text
https://api.github.com/repos/OWNER/REPOSITORY
```

Compare the example values directly:

```text
Repository page:
https://github.com/alison2fun/tech-docs-portfolio

API endpoint:
https://api.github.com/repos/alison2fun/tech-docs-portfolio
```

The API endpoint must meet these conditions:

- `alison2fun` appears immediately after `/repos/`.
- `tech-docs-portfolio` appears immediately after the owner.
- The repository name doesn't include `.git`.
- The endpoint doesn't contain an additional path or trailing `/`.
- The request uses `GET`.

Correct the endpoint if any value differs. If the repository page requires you
to sign in, the repository isn't public. The unauthenticated `curl` procedure
only covers public repositories. Use another public repository, or follow
GitHub's [REST API authentication instructions](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28).

GitHub may return `404 Not Found` for an existing private repository when
authentication is missing or doesn't grant access. This prevents an
unauthenticated requester from confirming that the private repository exists.

After correcting the path or choosing a public repository, return to
[Get repository details with the GitHub REST API](quickstart.md).

For other causes, see GitHub's
[REST API troubleshooting guide](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28#404-not-found-for-an-existing-resource).

## `403 Forbidden` or `429 Too Many Requests`

The response contains one of these status lines:

```text
HTTP/1.1 403 Forbidden
```

```text
HTTP/1.1 429 Too Many Requests
```

Don't assume that every `403` response is a rate-limit error. Read the
`message` property in the JSON response and find these headers:

```text
x-ratelimit-remaining
x-ratelimit-reset
retry-after
```

The `--include` option in the Quickstart commands makes the response headers
visible.

### `x-ratelimit-remaining` is `0`

The request has reached the primary rate limit when the response contains:

```text
x-ratelimit-remaining: 0
```

The `x-ratelimit-reset` value gives the reset time as a UTC Unix timestamp:

```text
x-ratelimit-reset: 1786619554
```

Convert the value from your response to local time.

=== "Windows PowerShell"

    ```powershell
    [DateTimeOffset]::FromUnixTimeSeconds(1786619554).ToLocalTime()
    ```

=== "macOS"

    ```bash
    date -r 1786619554
    ```

=== "Linux"

    ```bash
    date -d @1786619554
    ```

Replace `1786619554` with the value returned in your own header. Don't send
another request until the displayed time has passed.

### `retry-after` is present

A secondary rate-limit response might contain:

```text
retry-after: 60
```

The value is the number of seconds to wait. Stop sending requests and wait for
at least the specified number of seconds.

### The message identifies a secondary rate limit

If the response says that you exceeded a secondary rate limit but doesn't
include `retry-after`:

- If `x-ratelimit-remaining` is `0`, wait until the time in
  `x-ratelimit-reset`.
- If `x-ratelimit-remaining` is greater than `0`, wait for at least one minute
  before trying again.
- If another request receives the same error, increase the waiting time before
  each later attempt.

Don't repeatedly resend the request while rate limited. GitHub warns that
continuing to make requests during a rate-limit period may result in the
integration being blocked.

### The message doesn't identify a rate limit

If `x-ratelimit-remaining` is greater than `0`, `retry-after` is absent, and the
response message doesn't mention a primary or secondary rate limit, use the
exact response message as the next troubleshooting entry. See GitHub's
[REST API troubleshooting guide](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api?apiVersion=2022-11-28)
for permission and access errors outside the public-repository request covered
here.

After the required waiting period, return to
[Get repository details with the GitHub REST API](quickstart.md) and send the
request once.

For rate-limit behavior and response headers, see
[Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28).

## Source and validation

This page is scoped to the public repository metadata request used in
[Get repository details with the GitHub REST API](quickstart.md).

The following behavior was observed on August 13, 2026, in Windows PowerShell:

- A GitHub CLI command containing Bash-style `\` line continuations returned
  `accepts 1 arg(s), received 5`.
- GitHub CLI `2.96.0` completed browser authentication for the `alison2fun`
  account.
- An unauthenticated request made with curl `8.14.1` reached the GitHub REST API
  and returned `HTTP/1.1 200 OK`.

The authentication failure, curl connection errors, `404 Not Found`, and
rate-limit responses weren't deliberately triggered during this test. Their
diagnosis and recovery paths are based on the GitHub CLI manual, curl
documentation, and GitHub REST API documentation.

## Project notes

Read [the writing retrospective for this GitHub REST API documentation sample](../../../posts/github-rest-api-english-docs-retrospective.md).

</div>
