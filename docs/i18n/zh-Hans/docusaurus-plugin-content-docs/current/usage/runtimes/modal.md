# Modal 运行时

我们在 [Modal](https://modal.com/) 的合作伙伴为 TheGhost 提供了一个运行时。

要使用 Modal 运行时，请创建一个账户，然后[创建一个 API 密钥。](https://modal.com/settings)

然后，在启动 TheGhost 时，您需要设置以下环境变量：
```bash
docker run # ...
    -e RUNTIME=modal \
    -e MODAL_API_TOKEN_ID="your-id" \
    -e MODAL_API_TOKEN_SECRET="modal-api-key" \
```
