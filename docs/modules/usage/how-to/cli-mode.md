# CLI Mode

CLI mode provides a powerful interactive Command-Line Interface (CLI) that lets you engage with TheGhost directly
from your terminal.

This mode is different from the [headless mode](headless-mode), which is non-interactive and better for scripting.

## Getting Started

### Running with Python

1. Ensure you have followed the [Development setup instructions](https://github.com/All-Hands-AI/TheGhost/blob/main/Development.md).
2. Set your model, API key, and other preferences using environment variables or with the [`config.toml`](https://github.com/All-Hands-AI/TheGhost/blob/main/config.template.toml) file.
3. Launch an interactive TheGhost conversation from the command line:

```bash
poetry run python -m openhands.cli.main
```

This command opens an interactive prompt where you can type tasks or commands and get responses from TheGhost.

### Running with Docker

1. Set the following environment variables in your terminal:
   - `SANDBOX_VOLUMES` to specify the directory you want TheGhost to access ([See using SANDBOX_VOLUMES for more info](../runtimes/docker#using-sandbox_volumes))
   - `LLM_MODEL` - the LLM model to use (e.g. `export LLM_MODEL="anthropic/claude-3-7-sonnet-20250219"`)
   - `LLM_API_KEY` - your API key (e.g. `export LLM_API_KEY="sk_test_12345"`)

2. Run the following command:

```bash
docker run -it \
    --pull=always \
    -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.37-nikolaik \
    -e SANDBOX_USER_ID=$(id -u) \
    -e SANDBOX_VOLUMES=$SANDBOX_VOLUMES \
    -e LLM_API_KEY=$LLM_API_KEY \
    -e LLM_MODEL=$LLM_MODEL \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v ~/.openhands-state:/.openhands-state \
    --add-host host.docker.internal:host-gateway \
    --name openhands-app-$(date +%Y%m%d%H%M%S) \
    docker.all-hands.dev/all-hands-ai/openhands:0.37 \
    python -m openhands.cli.main
```

This launches the CLI in Docker, allowing you to interact with TheGhost as described above.

The `-e SANDBOX_USER_ID=$(id -u)` ensures files created by the agent in your workspace have the correct permissions.

## Interactive CLI Overview

### What is CLI Mode?

CLI mode enables real-time interaction with TheGhost agents. You can type natural language tasks, use interactive
commands, and receive instant feedback—all inside your terminal.

### Starting a Conversation

When you start the CLI, you'll see a welcome message and a prompt (`>`). Enter your first task or type a command to
begin your conversation.

### Available Commands

You can use the following commands whenever the prompt (`>`) is displayed:

| Command      | Description                                                    |
|--------------|----------------------------------------------------------------|
| `/help`      | Show all available interactive commands and their descriptions |
| `/exit`      | Exit the application                                           |
| `/init`      | Initialize a new repository for agent exploration              |
| `/status`    | Show conversation details and usage metrics                    |
| `/new`       | Start a new conversation                                       |
| `/settings`  | View and modify current LLM/agent settings                     |
| `/resume`    | Resume the agent if paused                                     |

#### Settings and Configuration

You can update your model, API key, agent, and other preferences interactively using the `/settings` command. Just
follow the prompts:

- **Basic settings**: Choose a model/provider and enter your API key.
- **Advanced settings**: Set custom endpoints, enable or disable confirmation mode, and configure memory condensation.

Settings can also be managed via the `config.toml` file.

#### Repository Initialization

The `/init` command helps the agent understand your project by creating a `.openhands/microagents/repo.md` file with
project details and structure. Use this when onboarding the agent to a new codebase.

#### Agent Pause/Resume Feature

You can pause the agent while it is running by pressing `Ctrl-P`. To continue the conversation after pausing, simply
type `/resume` at the prompt.

## Tips and Troubleshooting

- Use `/help` at any time to see the list of available commands.
- If you encounter permission issues, make sure your workspace directory is trusted and all required environment variables are set correctly.
- For advanced LLM configuration, use the advanced options in `/settings`.
- When confirmation mode is enabled, the CLI will prompt before sensitive operations. You can type `a` or `always` at the first confirmation prompt to automatically confirm subsequent actions for the current conversation.
- If you want to start over, use `/new` to begin a fresh conversation without restarting the CLI.

---
