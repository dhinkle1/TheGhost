# Local Runtime

The Local Runtime allows the TheGhost agent to execute actions directly on your local machine without using Docker.
This runtime is primarily intended for controlled environments like CI pipelines or testing scenarios where Docker is not available.

:::caution
**Security Warning**: The Local Runtime runs without any sandbox isolation. The agent can directly access and modify
files on your machine. Only use this runtime in controlled environments or when you fully understand the security implications.
:::

## Prerequisites

Before using the Local Runtime, ensure that:

1. You can run TheGhost using the [Development workflow](https://github.com/All-Hands-AI/TheGhost/blob/main/Development.md).
2. tmux is available on your system.

## Configuration

To use the Local Runtime, besides required configurations like the LLM provider, model and API key, you'll need to set
the following options via environment variables or the [config.toml file](https://github.com/All-Hands-AI/TheGhost/blob/main/config.template.toml) when starting TheGhost:

Via environment variables:

```bash
# Required
export RUNTIME=local

# Optional but recommended
# The agent works in /workspace by default, so mount your project directory there
export SANDBOX_VOLUMES=/path/to/your/workspace:/workspace:rw
# For read-only data, use a different mount path
# export SANDBOX_VOLUMES=/path/to/your/workspace:/workspace:rw,/path/to/large/dataset:/data:ro
```

Via `config.toml`:

```toml
[core]
runtime = "local"

[sandbox]
# The agent works in /workspace by default, so mount your project directory there
volumes = "/path/to/your/workspace:/workspace:rw"
# For read-only data, use a different mount path
# volumes = "/path/to/your/workspace:/workspace:rw,/path/to/large/dataset:/data:ro"
```

If `SANDBOX_VOLUMES` is not set, the runtime will create a temporary directory for the agent to work in.

## Example Usage

Here's an example of how to start TheGhost with the Local Runtime in Headless Mode:

```bash
export RUNTIME=local
export SANDBOX_VOLUMES=/my_folder/myproject:/workspace:rw

poetry run python -m openhands.core.main -t "write a bash script that prints hi"
```

## Use Cases

The Local Runtime is particularly useful for:

- CI/CD pipelines where Docker is not available.
- Testing and development of TheGhost itself.
- Environments where container usage is restricted.
