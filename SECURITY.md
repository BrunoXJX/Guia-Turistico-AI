# Security Policy

## Secrets

OpenAI keys must never be committed, exposed as `VITE_*` variables, pasted into frontend code, or stored in GitHub Pages. Use `OPENAI_API_KEY` only in a server runtime or serverless secret manager.

## Runtime Controls

- The frontend uses a restrictive Content Security Policy.
- The OpenAI proxy restricts CORS with `ALLOWED_ORIGINS`.
- Requests are rate-limited, size-limited, validated and time-boxed.
- OpenAI calls use `store: false`.
- CI runs `npm run security:scan`, `npm audit --omit=dev --audit-level=high` and `npm run build`.

## Local Setup

Copy `.env.example` into your local environment manager and set a newly generated OpenAI key. Rotate any key that was shared in chat, screenshots, logs or commits.
