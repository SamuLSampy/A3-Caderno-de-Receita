# Caderno de Receitas — Projeto A3 (Grupo 9)

Aplicação web desenvolvida em **React** para o Projeto A3 (**Usabilidade, desenvolvimento web, mobile e jogos**), consumindo a API pública **TheMealDB** com foco na aplicação prática das **Heurísticas de Nielsen** e critérios de acessibilidade da **WCAG**.

- **Deploy:** [https://a3-caderno-de-receita.vercel.app/](https://a3-caderno-de-receita.vercel.app/)

---

## Visão Geral do Projeto

O **Caderno de Receitas** permite explorar pratos de diferentes categorias e culinárias do mundo, buscar receitas por nome, descobrir sugestões aleatórias (**Surpreenda-me**) e acompanhar ingredientes (com checklist interativo) e modo de preparo passo a passo.

### Tecnologias Utilizadas
- **React 19** (`react`, `react-dom`)
- **React Router DOM 7** (`react-router-dom`)
- **Vite 8** (`vite`)
- **Lucide React** (`lucide-react`)
- **CSS3** (`src/index.css`) com layout responsivo em Grid/Flexbox

---

## Funcionalidades e Rotas

- **`/` (`HomePage`)**
  - Barra de busca por nome, filtro por categoria e seletor de culinária/origem sincronizados via parâmetros de URL (`?q=...&categoria=...&origem=...`).
  - Grade responsiva de cards (`MealCard`) clicáveis com imagem, tags de categoria/origem e botão **Ver receita**.
  - Paginação incremental (**Carregar mais**) exibindo os resultados de 12 em 12.
  - Estados dedicados para busca sem resultados (`NotFoundRecipe`) e erro de comunicação com a API (`ErrorMessage`).
- **`/recipe/:id` (`RecipeDetailPage`)**
  - Exibição completa da receita: imagem, tags clicáveis que filtram na página inicial, contagem de ingredientes e passos.
  - Links externos condicionais para vídeo no **YouTube** e **Fonte Original** (exibidos apenas quando disponíveis na receita).
  - Checklist interativo de ingredientes com contador em tempo real (`X de Y separados`).
  - Modo de preparo numerado automaticamente e botão **Voltar**.
- **`*` (`NotFoundPage`)**
  - Página 404 para rotas inexistentes.

---

## API Pública Utilizada

- **API:** [TheMealDB](https://www.themealdb.com/api.php)
- **Endpoint base:** `https://www.themealdb.com/api/json/v1/1`

### Endpoints consumidos (`src/services/mealApi.jsx`)
| Finalidade | Endpoint | Exemplo |
| --- | --- | --- |
| Busca por nome / lista inicial | `/search.php?s={query}` | `/search.php?s=chicken` |
| Filtrar por categoria | `/filter.php?c={category}` | `/filter.php?c=Seafood` |
| Filtrar por culinária/origem | `/filter.php?a={area}` | `/filter.php?a=Brazil` |
| Buscar detalhes por ID | `/lookup.php?i={id}` | `/lookup.php?i=53483` |
| Buscar receita aleatória | `/random.php` | `/random.php` |

---

## Integrantes do Projeto (Grupo 9)
| Nome | RA |
| --- | --- |
| Bianca Rodrigues dos Santos	| 825153938
| Deivison Silva de menezes |	12724146135
| João Vitor Guimarães de Oliveira | 1272118643
| joao vittor santos bandeira	| 12626122120
| Maria Eduarda Barbosa de Santana | 1352624841
| Mariaclara Gomes Mejía | 825232067
| Samuel Bispo Sampaio | 824218589
| Yann Francisco de Souza | 12624210295

---

## Como Executar Localmente

```bash
npm install
npm run dev
```

Outros scripts disponíveis:

```bash
npm run build
npm run preview
npm run lint
```
