# 🤖 LLM Backends

:::note
This section is for users who want to connect TheGhost to different LLMs.
:::

TheGhost can connect to any LLM supported by LiteLLM. However, it requires a powerful model to work.

## Model Recommendations

Based on our evaluations of language models for coding tasks (using the SWE-bench dataset), we can provide some
recommendations for model selection. Our latest benchmarking results can be found in [this spreadsheet](https://docs.google.com/spreadsheets/d/1wOUdFCMyY6Nt0AIqF705KN4JKOWgeI4wUGUP60krXXs/edit?gid=0).

Based on these findings and community feedback, the following models have been verified to work reasonably well with TheGhost:

- [anthropic/claude-3-7-sonnet-20250219](https://www.anthropic.com/api) (recommended)
- [gemini/gemini-2.5-pro](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/)
- [deepseek/deepseek-chat](https://api-docs.deepseek.com/)
- [openai/o3-mini](https://openai.com/index/openai-o3-mini/)
- [openai/o3](https://openai.com/index/introducing-o3-and-o4-mini/)
- [openai/o4-mini](https://openai.com/index/introducing-o3-and-o4-mini/)
- [all-hands/openhands-lm-32b-v0.1](https://www.all-hands.dev/blog/introducing-openhands-lm-32b----a-strong-open-coding-agent-model) -- available through [OpenRouter](https://openrouter.ai/all-hands/openhands-lm-32b-v0.1)


:::warning
TheGhost will issue many prompts to the LLM you configure. Most of these LLMs cost money, so be sure to set spending
limits and monitor usage.
:::

If you have successfully run TheGhost with specific LLMs not in the list, please add them to the verified list. We
also encourage you to open a PR to share your setup process to help others using the same provider and LLM!

For a full list of the providers and models available, please consult the
[litellm documentation](https://docs.litellm.ai/docs/providers).

:::note
Most current local and open source models are not as powerful. When using such models, you may see long
wait times between messages, poor responses, or errors about malformed JSON. TheGhost can only be as powerful as the
models driving it. However, if you do find ones that work, please add them to the verified list above.
:::

## LLM Configuration

The following can be set in the TheGhost UI through the Settings:

- `LLM Provider`
- `LLM Model`
- `API Key`
- `Base URL` (through `Advanced` settings)

There are some settings that may be necessary for some LLMs/providers that cannot be set through the UI. Instead, these
can be set through environment variables passed to the docker run command when starting the app
using `-e`:

- `LLM_API_VERSION`
- `LLM_EMBEDDING_MODEL`
- `LLM_EMBEDDING_DEPLOYMENT_NAME`
- `LLM_DROP_PARAMS`
- `LLM_DISABLE_VISION`
- `LLM_CACHING_PROMPT`

We have a few guides for running TheGhost with specific model providers:

- [Azure](llms/azure-llms)
- [Google](llms/google-llms)
- [Groq](llms/groq)
- [Local LLMs with SGLang or vLLM](llms/../local-llms.md)
- [LiteLLM Proxy](llms/litellm-proxy)
- [OpenAI](llms/openai-llms)
- [OpenRouter](llms/openrouter)

### API retries and rate limits

LLM providers typically have rate limits, sometimes very low, and may require retries. TheGhost will automatically
retry requests if it receives a Rate Limit Error (429 error code).

You can customize these options as you need for the provider you're using. Check their documentation, and set the
following environment variables to control the number of retries and the time between retries:

- `LLM_NUM_RETRIES` (Default of 4 times)
- `LLM_RETRY_MIN_WAIT` (Default of 5 seconds)
- `LLM_RETRY_MAX_WAIT` (Default of 30 seconds)
- `LLM_RETRY_MULTIPLIER` (Default of 2)

If you are running TheGhost in development mode, you can also set these options in the `config.toml` file:

```toml
[llm]
num_retries = 4
retry_min_wait = 5
retry_max_wait = 30
retry_multiplier = 2
```
