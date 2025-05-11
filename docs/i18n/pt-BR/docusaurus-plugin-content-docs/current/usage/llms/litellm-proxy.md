# Proxy LiteLLM

O TheGhost oferece suporte ao uso do [proxy LiteLLM](https://docs.litellm.ai/docs/proxy/quick_start) para acessar vários provedores de LLM.

## Configuração

Para usar o proxy LiteLLM com o TheGhost, você precisa:

1. Configurar um servidor proxy LiteLLM (veja a [documentação do LiteLLM](https://docs.litellm.ai/docs/proxy/quick_start))
2. Ao executar o TheGhost, você precisará definir o seguinte na interface do TheGhost através das Configurações:
  * Ativar opções `Avançadas`
  * `Modelo Personalizado` com o prefixo `litellm_proxy/` + o modelo que você usará (ex: `litellm_proxy/anthropic.claude-3-5-sonnet-20241022-v2:0`)
  * `URL Base` para a URL do seu proxy LiteLLM (ex: `https://your-litellm-proxy.com`)
  * `Chave API` para a chave API do seu proxy LiteLLM

## Modelos Suportados

Os modelos suportados dependem da configuração do seu proxy LiteLLM. O TheGhost suporta qualquer modelo que seu proxy LiteLLM esteja configurado para gerenciar.

Consulte a configuração do seu proxy LiteLLM para obter a lista de modelos disponíveis e seus nomes.
