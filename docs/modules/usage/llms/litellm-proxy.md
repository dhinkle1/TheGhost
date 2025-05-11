# LiteLLM Proxy

TheGhost supports using the [LiteLLM proxy](https://docs.litellm.ai/docs/proxy/quick_start) to access various LLM providers.

## Configuration

To use LiteLLM proxy with TheGhost, you need to:

1. Set up a LiteLLM proxy server (see [LiteLLM documentation](https://docs.litellm.ai/docs/proxy/quick_start))
2. When running TheGhost, you'll need to set the following in the TheGhost UI through the Settings:
  * Enable `Advanced` options
  * `Custom Model` to the prefix `litellm_proxy/` + the model you will be using (e.g. `litellm_proxy/anthropic.claude-3-5-sonnet-20241022-v2:0`)
  * `Base URL` to your LiteLLM proxy URL (e.g. `https://your-litellm-proxy.com`)
  * `API Key` to your LiteLLM proxy API key

## Supported Models

The supported models depend on your LiteLLM proxy configuration. TheGhost supports any model that your LiteLLM proxy is configured to handle.

Refer to your LiteLLM proxy configuration for the list of available models and their names.
