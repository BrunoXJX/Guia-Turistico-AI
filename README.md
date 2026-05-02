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

Não coloques a chave da OpenAI no frontend. Para testar localmente:

```bash
$env:OPENAI_API_KEY="a-tua-chave-nova"
npm run dev:api
npm run dev
```

O frontend chama o proxy local em `http://127.0.0.1:8787/api/guide`.

## Rotas

O deploy usa hash routing para funcionar bem em hosting estático:

- `/#/`
- `/#/tours/vilnius-segredos`
- `/#/audio/vilnius-segredos`
- `/#/itinerario`
- `/#/voz`
- `/#/passaporte`
- `/#/perfil`
