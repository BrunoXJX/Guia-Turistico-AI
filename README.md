# VOYAGE AI

Protótipo mobile-first de um guia turístico inteligente em PT-PT.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons

## Comandos

```bash
npm install
npm run dev
npm run build
```

## OpenAI em segurança

Não coloques a chave da OpenAI no frontend, em `VITE_*`, no GitHub Pages ou no código. A chave fica apenas no processo do servidor/proxy.

Para testar localmente:

```bash
$env:OPENAI_API_KEY="a-tua-chave-nova"
$env:ALLOWED_ORIGINS="http://127.0.0.1:5173,http://localhost:5173"
npm run dev:api
npm run dev
```

O frontend chama o proxy local em `http://127.0.0.1:8787/api/guide`.

Para produção com IA pública, usa `api/guide.mjs` num deploy serverless, por exemplo Vercel, e define `OPENAI_API_KEY` como secret do projeto. O GitHub Pages continua a servir o frontend estático.

## Segurança operacional

- CSP no `index.html` para limitar scripts, imagens e APIs externas.
- CORS restrito no proxy por `ALLOWED_ORIGINS`.
- Rate limit por IP no proxy (`RATE_LIMIT_MAX` e `RATE_LIMIT_WINDOW_MS`).
- Limite de body, validação de input, timeout da OpenAI e `store: false`.
- `npm run security:scan` bloqueia chaves OpenAI e CORS wildcard antes do deploy.
- GitHub Actions corre security scan, audit de produção e build.

## Rotas

O deploy usa hash routing para funcionar bem em hosting estático:

- `/#/`
- `/#/tours/vilnius-segredos`
- `/#/audio/vilnius-segredos`
- `/#/itinerario`
- `/#/voz`
- `/#/passaporte`
- `/#/perfil`
