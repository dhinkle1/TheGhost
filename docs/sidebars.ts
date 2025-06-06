import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [require('./modules/python/sidebar.json')],
  docsSidebar: [
    {
      type: 'doc',
      label: 'Running TheGhost',
      id: 'usage/installation',
    },
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'usage/getting-started',
    },
    {
      type: 'doc',
      label: 'Key Features',
      id: 'usage/key-features',
    },
    {
      type: 'category',
      label: 'TheGhost Cloud',
      items: [
        {
          type: 'doc',
          label: 'Openhands Cloud',
          id: 'usage/cloud/openhands-cloud',
        },
        {
          type: 'doc',
          label: 'Cloud API',
          id: 'usage/cloud/cloud-api',
        },
        {
          type: 'doc',
          label: 'Cloud GitHub Resolver',
          id: 'usage/cloud/cloud-github-resolver',
        },
      ],
    },
    {
      type: 'category',
      label: 'Prompting',
      items: [
        {
          type: 'doc',
          label: 'Best Practices',
          id: 'usage/prompting/prompting-best-practices',
        },
      ],
    },
    {
      type: 'category',
      label: 'Customization',
      items: [
        {
          type: 'doc',
          label: 'Repository Customization',
          id: 'usage/customization/repository',
        },
        {
          type: 'category',
          label: 'Microagents',
          items: [
            {
              type: 'doc',
              label: 'Overview',
              id: 'usage/prompting/microagents-overview',
            },
            {
              type: 'doc',
              label: 'General Repository Microagents',
              id: 'usage/prompting/microagents-repo',
            },
            {
              type: 'doc',
              label: 'Keyword-Triggered Microagents',
              id: 'usage/prompting/microagents-keyword',
            },
            {
              type: 'doc',
              label: 'Global Microagents',
              id: 'usage/prompting/microagents-public',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Usage Methods',
      items: [
        {
          type: 'doc',
          label: 'GUI Mode',
          id: 'usage/how-to/gui-mode',
        },
        {
          type: 'doc',
          label: 'CLI Mode',
          id: 'usage/how-to/cli-mode',
        },
        {
          type: 'doc',
          label: 'Headless Mode',
          id: 'usage/how-to/headless-mode',
        },
        {
          type: 'doc',
          label: 'Github Action',
          id: 'usage/how-to/github-action',
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced Configuration',
      items: [
        {
          type: 'category',
          label: 'LLM Configuration',
          items: [
            {
              type: 'doc',
              label: 'Overview',
              id: 'usage/llms/llms',
            },
            {
              type: 'category',
              label: 'Providers',
              items: [
                {
                  type: 'doc',
                  label: 'Azure',
                  id: 'usage/llms/azure-llms',
                },
                {
                  type: 'doc',
                  label: 'Google',
                  id: 'usage/llms/google-llms',
                },
                {
                  type: 'doc',
                  label: 'Groq',
                  id: 'usage/llms/groq',
                },
                {
                  type: 'doc',
                  label: 'Local LLMs with SGLang or vLLM',
                  id: 'usage/llms/local-llms',
                },
                {
                  type: 'doc',
                  label: 'LiteLLM Proxy',
                  id: 'usage/llms/litellm-proxy',
                },
                {
                  type: 'doc',
                  label: 'OpenAI',
                  id: 'usage/llms/openai-llms',
                },
                {
                  type: 'doc',
                  label: 'OpenRouter',
                  id: 'usage/llms/openrouter',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Runtime Configuration',
          items: [
            {
              type: 'doc',
              label: 'Overview',
              id: 'usage/runtimes-index',
            },
            {
              type: 'doc',
              label: 'Docker Runtime',
              id: 'usage/runtimes/docker',
            },
            {
              type: 'doc',
              label: 'Remote Runtime',
              id: 'usage/runtimes/remote',
            },
            {
              type: 'doc',
              label: 'Modal Runtime',
              id: 'usage/runtimes/modal',
            },
            {
              type: 'doc',
              label: 'Daytona Runtime',
              id: 'usage/runtimes/daytona',
            },
            {
              type: 'doc',
              label: 'Local Runtime',
              id: 'usage/runtimes/local',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Configuration Options',
          id: 'usage/configuration-options',
        },
        {
          type: 'doc',
          label: 'Custom Sandbox',
          id: 'usage/how-to/custom-sandbox-guide',
        },
        {
          type: 'doc',
          label: 'MCP',
          id: 'usage/mcp',
        }
      ],
    },
    {
      type: 'doc',
      label: 'Troubleshooting',
      id: 'usage/troubleshooting/troubleshooting',
    },
    {
      type: 'doc',
      label: 'Feedback',
      id: 'usage/feedback',
    },
    {
      type: 'category',
      label: 'For TheGhost Developers',
      items: [
        {
          type: 'doc',
          label: 'Development Overview',
          id: 'usage/how-to/development-overview',
        },
        {
          type: 'category',
          label: 'Architecture',
          items: [
            {
              type: 'doc',
              label: 'Backend',
              id: 'usage/architecture/backend',
            },
            {
              type: 'doc',
              label: 'Runtime',
              id: 'usage/architecture/runtime',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Debugging',
          id: 'usage/how-to/debugging',
        },
        {
          type: 'doc',
          label: 'Evaluation',
          id: 'usage/how-to/evaluation-harness',
        },
      ],
    },
    {
      type: 'doc',
      label: 'About',
      id: 'usage/about',
    },
  ],
};

export default sidebars;
