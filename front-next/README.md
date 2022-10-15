## RODAR O SERVIDOR

Node Version: `v16.17.1`

Abilitar o Yarn utilizando o comando: `corepack enable`


Instalar as dependências: 

```bash
yarn install
```

Rodar servidor de desenvolvimento:

```bash
yarn dev
```

# USUÁRIOS WSL2 QUE ENFRETAM PROBLEMA COM O FAST REFRESH

```bash
echo "WATCHPACK_POLLING=true" > .env.local
```
