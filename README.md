# Urban Sneakers - E-Commerce API

Uma aplicação Full-Stack desenvolvida com **Test-Driven Development (TDD)** e Design responsivo Premium.

## 🛠️ Tecnologias

- **Backend:** Node.js, Express, TypeScript, Jest (Testes Unitários)
- **Frontend:** Vanilla JavaScript, HTML5 Estruturado, Vanilla CSS (Glassmorphism UI)

## Funcionalidades

- **API Restful Blindada:** O carrinho de compras e o gerenciamento de totais funciona na camada de servidor usando rotas isoladas.
- **TDD:** A regra de negócios `cart.ts` não permite valores negativos ou quebras lógicas, todas as possibilidades foram cobertas com os testes em Jest!
- **Motor de Filtros Profundo:** O painel lateral filtra independentemente: Categorias cruzando com Tamanhos e delimitações de Preços renderizando milhares de itens na tela sem travamentos, recriando o layout via JS.
- **Atualização Dinâmica:** Sincronia limpa da API usando Promises no Frontend para interceptar as respostas com a foto perfeita para cada calçado!

## Como Rodar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor Web e entre no paraíso:
   ```bash
   npm run dev
   ```
4. _Opcional:_ Para checar o nível de proteção do servidor, rode os testes:
   ```bash
   npm test
   ```
