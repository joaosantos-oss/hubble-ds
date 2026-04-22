# Hubble Design System — Regras para Claude

## Tokens de design

- **Nunca crie CSS vars ou classes Tailwind que não existam nos arquivos da pasta `TokensDS`.**
- **Nunca use cores hardcoded em componentes.** Toda cor deve referenciar um token via classe Tailwind (ex: `bg-primary`, `text-destructive-foreground`).
- Todos os tokens do `TokensDS` já estão traduzidos em `src/index.css` (CSS vars) e `tailwind.config.ts` (classes Tailwind). Use-os.
- Se um componente precisar de uma cor que não existe como classe Tailwind, consulte `src/index.css` para encontrar o CSS var correspondente. Se não existir lá, pergunte ao usuário antes de criar qualquer coisa.

## Mapeamento rápido de tokens → classes Tailwind

| Necessidade | Classe |
|---|---|
| Fundo primário | `bg-primary` |
| Texto sobre fundo primário | `text-primary-foreground` |
| Superfície primária (ponto/destaque) | `bg-primary-bg` |
| Destaque primário suave | `bg-primary-accent` / `bg-primary-accent-2` |
| Fundo secundário | `bg-secondary` |
| Texto secundário | `text-secondary-foreground` |
| Fundo destrutivo (button) | `bg-destructive-bg` |
| Fundo destrutivo suave (badge) | `bg-destructive-subtle` |
| Fundo destrutivo accent | `bg-destructive-accent` |
| Texto destrutivo | `text-destructive-foreground` |
| Fundo sucesso | `bg-success-bg` |
| Texto sucesso | `text-success` |
| Fundo alerta | `bg-warning-bg` |
| Texto alerta | `text-warning` |
| Ghost (quase transparente) | `bg-ghost` |
| Outline bg | `bg-outline-bg` |
| Input fundo | `bg-input-bg` |
| Input borda | `border-input` |
| Input desabilitado | `bg-input-disabled` |
| Borda destrutiva | `border-border-destructive` |
| Focus ring | `shadow-focus-ring` |
| Focus ring erro | `shadow-focus-ring-error` |
| Hover primário | `bg-hover-primary` |
| Hover destrutivo | `bg-hover-destructive` |

## Ícones

- Apenas `@phosphor-icons/react`, pesos `regular` e `fill` somente.
- **Nunca use o componente `<Icon>` do DS dentro de outros componentes.** Use o ícone Phosphor diretamente como componente React, passando `size` em px (ex: `<MagnifyingGlass size={16} />`).
- O componente `<Icon>` existe apenas para uso isolado (ex: stories de fundação). Em button, badge, inputs e similares, use sempre o ícone Phosphor direto.
- Para receber ícones via prop, use o tipo `Icon as PhosphorIcon` de `@phosphor-icons/react` e renderize com uma const local: `const LeftIcon = iconLeft; <LeftIcon size={16} />`.

## Componentes

- Sempre use tokens do DS. Nunca use classes Tailwind de paleta direta (ex: `bg-zinc-100`, `text-red-700`) em componentes — use sempre os tokens semânticos.
- Paletas raw (`bg-primary-700`, `bg-destructive-900` etc.) só são permitidas dentro de `tailwind.config.ts` para definir os próprios tokens.
