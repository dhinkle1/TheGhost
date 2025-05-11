# Microagents Overview

Microagents are specialized prompts that enhance TheGhost with domain-specific knowledge.
They provide expert guidance, automate common tasks, and ensure consistent practices across projects.

## Microagent Types

Currently TheGhost supports the following types of microagents:

- [General Repository Microagents](./microagents-repo): General guidelines for TheGhost about the repository.
- [Keyword-Triggered Microagents](./microagents-keyword): Guidelines activated by specific keywords in prompts.

To customize TheGhost' behavior, create a .openhands/microagents/ directory in the root of your repository and
add `<microagent_name>.md` files inside.

:::note
Loaded microagents take up space in the context window.
These microagents, alongside user messages, inform TheGhost about the task and the environment.
:::

Example repository structure:

```
some-repository/
└── .openhands/
    └── microagents/
        └── repo.md            # General repository guidelines
        └── trigger_this.md    # Microagent triggered by specific keywords
        └── trigger_that.md    # Microagent triggered by specific keywords
```

## Microagents Frontmatter Requirements

Each microagent file may include frontmatter that provides additional information. In some cases, this frontmatter
is required:

| Microagent Type                  | Required |
|----------------------------------|----------|
| `General Repository Microagents` | No       |
| `Keyword-Triggered Microagents`  | Yes      |
