# Instituto Patas Que Transformam — estilos

O projeto usa `css/style.css` como folha de estilos principal, compartilhada pelas quatro páginas HTML.

## Organização do CSS
O arquivo está dividido em seções identificadas por comentários: variáveis/design tokens, reset e base, acessibilidade, estrutura geral, grid de 12 colunas, cabeçalho e navegação, seções, botões, cards, campanha, formulários, feedback, galeria, rodapé e breakpoints.

## Design system
- Cores: variáveis CSS em `:root`, incluindo cores de marca, neutras e de feedback.
- Tipografia: seis tamanhos nomeados (`--fonte-xs` até `--fonte-3xl`).
- Espaçamento: escala modular de 8, 16, 24, 32, 48 e 64px.
- Grid: 12 colunas com classes responsivas `.col-sm-*`, `.col-md-*`, `.col-lg-*` e `.col-xl-*`.
- Breakpoints: 576px, 768px, 992px, 1200px e 1400px (além do estilo mobile-first).
- Flexbox: alinhamentos internos do cabeçalho, menu, botões, formulários e cards.
- Acessibilidade: link para pular ao conteúdo, foco visível, rótulos auxiliares e suporte a movimento reduzido.

## Estrutura
- HTML na raiz do projeto
- `css/style.css`: estilos
- `js/script.js`: interações de menu, dropdown, toast, doação e modal
- `img/`: imagens
- `video/`: vídeos
