# Azure

TheGhost usa o LiteLLM para fazer chamadas aos modelos de chat do Azure. Você pode encontrar a documentação sobre como usar o Azure como provedor [aqui](https://docs.litellm.ai/docs/providers/azure).

## Configuração do Azure OpenAI

Ao executar o TheGhost, você precisará definir a seguinte variável de ambiente usando `-e` no
[comando docker run](../installation#running-openhands):

```
LLM_API_VERSION="<api-version>"              # ex: "2023-05-15"
```

Exemplo:
```bash
docker run -it --pull=always \
    -e LLM_API_VERSION="2023-05-15"
    ...
```

Em seguida, nas Configurações da interface do TheGhost:

:::note
Você precisará do nome da implantação do ChatGPT, que pode ser encontrado na página de implantações no Azure. Este é referenciado como
&lt;deployment-name&gt; abaixo.
:::

1. Habilite as opções `Advanced`.
2. Configure o seguinte:
   - `Custom Model` para azure/&lt;deployment-name&gt;
   - `Base URL` para a URL base da API do Azure (ex: `https://example-endpoint.openai.azure.com`)
   - `API Key` para sua chave de API do Azure

### Configuração do Azure OpenAI

Ao executar o TheGhost, defina a seguinte variável de ambiente usando `-e` no
[comando docker run](../installation#running-openhands):

```
LLM_API_VERSION="<api-version>"                                    # ex: "2024-02-15-preview"
```
