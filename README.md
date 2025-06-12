# HypeMode E-Commerce

## Descrição

HypeMode é uma loja online de moda e estilo, desenvolvida com React 19 e Vite. A aplicação oferece uma experiência de compra moderna, com suporte a SEO nativo, gerenciamento de carrinho, autenticação de usuários e integração com APIs externas.

## Requisitos Funcionais

- **Autenticação de Usuários:** Login e registro de usuários.
- **Gerenciamento de Produtos:** Listagem, busca e detalhes de produtos.
- **Carrinho de Compras:** Adição, remoção e atualização de itens.
- **SEO Otimizado:** Meta tags dinâmicas para cada página.
- **Responsividade:** Interface adaptável a diferentes dispositivos.

## Requisitos Não Funcionais

- **Performance:** Carregamento rápido e otimização de assets.
- **Segurança:** Proteção de rotas e dados sensíveis.
- **Acessibilidade:** Suporte a leitores de tela e navegação por teclado.
- **Compatibilidade:** Funcionamento em navegadores modernos.

## Bibliotecas Utilizadas

- **React 19:** Framework principal para construção da UI.
- **Vite:** Build tool para desenvolvimento rápido.
- **React Router DOM:** Gerenciamento de rotas.
- **React Hot Toast:** Notificações de sucesso/erro.
- **Axios:** Cliente HTTP para requisições.
- **TailwindCSS:** Framework CSS para estilização.
- **DaisyUI:** Componentes estilizados para TailwindCSS.

## Decisões de Design

- **SEO:** Migração de `react-helmet-async` para tags nativas do React 19, garantindo melhor performance e compatibilidade.
- **UI/UX:** Uso de TailwindCSS e DaisyUI para uma interface moderna e responsiva.
- **Gerenciamento de Estado:** Context API do React para estado global (carrinho, autenticação).

## Problemas Enfrentados

- **Conflito de Dependências:** Incompatibilidade do `react-helmet-async` com React 19, resolvida com migração para tags nativas.
- **Case Sensitivity no Git:** Problemas com nomes de pastas (`pages` vs `Pages`), resolvidos com renomeação forçada.
- **SEO:** Inicialmente, meta tags não eram injetadas corretamente, corrigido com ajustes na ordem de renderização.

## Dados e Funcionalidades

- **Produtos:** Dados mockados em `data.js`, simulando uma API real.
- **Carrinho:** Persistência local via `localStorage`.
- **Autenticação:** Simulação de login/registro com dados mockados.

## Casos de Uso

- **Usuário não autenticado:** Pode navegar, buscar produtos e adicionar ao carrinho.
- **Usuário autenticado:** Pode finalizar compras, gerenciar perfil e ver histórico de pedidos.
- **Admin:** Gerenciamento de produtos e pedidos (funcionalidade futura).

## Regras de Negócio

- **Carrinho:** Máximo de 10 itens por produto.
- **Frete:** Grátis para compras acima de R\$ 200,00.
- **Desconto:** 10% para usuários autenticados.

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Custom hooks
├── contexts/      # Contextos do React
├── utils/         # Funções utilitárias
└── data.js        # Dados mockados
```
