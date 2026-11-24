# Site institucional do ApiceFlow

Site de apresentação em Vite + React + Tailwind, com a mesma identidade visual do app. Não dá acesso ao app: apresenta o produto, mostra os planos e leva a pessoa para o WhatsApp.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # gera dist/
```

## Páginas

| Rota | Arquivo | Conteúdo |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Hero (mensagem no WhatsApp vira tarefa no quadro), tour pelas telas, assistente, integrações, preço inicial |
| `/recursos` | `src/pages/Recursos.jsx` | Clientes, campanhas, tarefas, arquivos, financeiro, relatórios, equipe |
| `/assistente` | `src/pages/Assistente.jsx` | Como funciona, o que dá para pedir, arquivos pelo WhatsApp, perguntas |
| `/planos` | `src/pages/Planos.jsx` | Preço por faixa de clientes, comparação, perguntas |
| `/contato` | `src/pages/Contato.jsx` | Formulário que abre o WhatsApp com a mensagem pronta |

## Onde mexer

- **Preços:** tabela `PRICES` em `src/data/plans.js`. A faixa "até 5" usa os preços atuais do app; as outras são proposta a confirmar.
- **Telas do app usadas como imagens:** `src/screens/` (HTML/Tailwind com dados de exemplo, renderizadas em 1180px e escaladas).
- **Número do WhatsApp:** `VITE_SALES_WHATSAPP_NUMBER` (padrão `5591984125519`), ver `.env.example`.
- **Assinatura da Vylos no rodapé:** `VylosSignature` em `src/components/Layout.jsx`. O link vem de `VITE_VYLOS_URL` (padrão: Instagram da Vylos); troque pelo site da Vylos quando estiver no ar.

## Referências usadas

- Refero Styles: estilos Ordinal e Linear (produto como imagem principal, verde só nas ações).
- Inspora: Wispr Flow e Superlist (mostrar o produto funcionando logo no topo).
- Spell UI: Light Rays (`src/components/LightRays.jsx`, portado para WebGL puro) e Blur Reveal (`src/components/BlurReveal.jsx`, em CSS).

## Deploy

`vercel.json` reescreve as rotas para `index.html` e define CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy e Permissions-Policy.

## Depoimentos e "Sobre"

Ficaram de fora de propósito. Entram quando houver depoimentos reais de clientes e a história da empresa.
