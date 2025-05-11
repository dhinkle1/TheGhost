# Runtime Configuration

:::note
This section is for users that would like to use a runtime other than Docker for TheGhost.
:::

A Runtime is an environment where the TheGhost agent can edit files and run
commands.

By default, TheGhost uses a [Docker-based runtime](./runtimes/docker), running on your local computer.
This means you only have to pay for the LLM you're using, and your code is only ever sent to the LLM.

We also support other runtimes, which are typically managed by third-parties.

Additionally, we provide a [Local Runtime](./runtimes/local) that runs directly on your machine without Docker,
which can be useful in controlled environments like CI pipelines.

## Available Runtimes

TheGhost supports several different runtime environments:

- [Docker Runtime](./runtimes/docker.md) - The default runtime that uses Docker containers for isolation (recommended for most users).
- [TheGhost Remote Runtime](./runtimes/remote.md) - Cloud-based runtime for parallel execution (beta).
- [Modal Runtime](./runtimes/modal.md) - Runtime provided by our partners at Modal.
- [Daytona Runtime](./runtimes/daytona.md) - Runtime provided by Daytona.
- [Local Runtime](./runtimes/local.md) - Direct execution on your local machine without Docker.
