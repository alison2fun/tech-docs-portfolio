---
title: Configure Vale for a documentation repository
description: Read the active repository configuration, change a rule or vocabulary entry, and verify the result.
---

<div class="english-doc" markdown>

# Configure Vale for a documentation repository

This page focuses on three maintenance tasks: read the active configuration,
change one repository setting, and verify both matching and non-matching text.

## Current configuration

The repository entry point is `.vale.ini`:

```ini
StylesPath = styles
MinAlertLevel = suggestion
Vocab = Portfolio

[*.{md,txt}]
BasedOnStyles = Vale, Microsoft, Google, MyStyle
```

| Setting | Current effect |
| --- | --- |
| `StylesPath = styles` | Loads rules committed under `styles/` |
| `MinAlertLevel = suggestion` | Displays suggestions, warnings, and errors |
| `Vocab = Portfolio` | Loads accepted and rejected project terminology |
| `BasedOnStyles` | Enables Vale, Microsoft, Google, and `MyStyle` for Markdown and text files |

Run this optional command to confirm which configuration Vale loaded:

```bash
vale ls-config
```

The `RootINI` and style paths should resolve to the current repository. Use an
explicit path when the working directory is uncertain:

```bash
vale --config=".vale.ini" docs
```

## Styles and vocabulary

The repository commits its style snapshots and project vocabulary:

```text
styles/
├── Google/
├── Microsoft/
├── MyStyle/
│   └── Spacing.yml
└── config/vocabularies/Portfolio/
    ├── accept.txt
    └── reject.txt
```

Add a valid product name or technical term to `accept.txt` when the repository
should recognize its spelling. Add a consistently discouraged term to
`reject.txt` only when the replacement policy is clear.

This repository doesn't declare `Packages`. The required styles are already
committed, so the current setup doesn't require `vale sync`. If a package is
added later, document the source and review the downloaded rule changes before
committing them.

## The custom spacing rule

`styles/MyStyle/Spacing.yml` checks whether Chinese characters touch Latin
letters or digits without a space:

```yaml
extends: existence
message: "错误：中英文之间必须加空格"
level: error
tokens:
  - ".*[\u4e00-\u9fa5][a-zA-Z0-9].*"
  - ".*[a-zA-Z0-9][\u4e00-\u9fa5].*"
```

The rule is repository-specific and runs at `error` level. Microsoft and
Google rules supply broader writing guidance. The project uses three severity
levels deliberately:

| Severity | Repository use |
| --- | --- |
| `error` | A rule that can block the current quality gate |
| `warning` | A likely issue that deserves review |
| `suggestion` | Optional editorial guidance shown for author feedback |

## Change a setting

Keep each configuration change focused:

1. record the current `vale docs` result;
2. change one rule, vocabulary entry, or `.vale.ini` setting;
3. inspect `vale ls-config` if configuration loading changed;
4. test one string that should match;
5. test one string that shouldn't match;
6. run `vale docs` and review the diff before committing.

For example, a new accepted term should remove only the intended vocabulary
alert. A spacing-rule change should still reject mixed-language text without spaces
and allow the corrected form.

## Verify the change

Create a temporary Markdown file with one matching and one corrected example:

```text
Matching text: 中文Vale
Corrected text: 中文 Vale
```

Run the targeted check:

```bash
vale --config=".vale.ini" path/to/temporary-test.md --no-wrap
```

Verify that the matching text reports `MyStyle.Spacing` and that the corrected
text doesn't. Then remove the temporary file and run the repository check:

```bash
vale docs
```

Don't weaken the alert level or add a broad exception only to make the check
pass. Confirm that the rule still detects the behavior it was created to
prevent.

## Next steps

- Review [Run Vale in GitHub Actions](github-actions.md) before changing the automated check.
- Use [Troubleshooting](troubleshooting.md) when a style, vocabulary, or custom rule doesn't load.

Sources: [Vale configuration](https://vale.sh/docs/vale-ini),
[Vale styles](https://vale.sh/docs/styles), and
[Vale vocabularies](https://vale.sh/docs/keys/vocab).

</div>
