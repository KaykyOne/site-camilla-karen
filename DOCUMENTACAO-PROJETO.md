# Documentacao Tecnica do Projeto

## 1. Visao geral

Este projeto e um site institucional estatico de pagina unica para a Dra. Camilla Karen, com foco em apresentacao profissional, exibicao de servicos e conversao de contato via WhatsApp.

O projeto nao usa framework frontend, bundler nem pipeline de build. A execucao depende apenas de:

- `index.html`
- `css/style.css`
- `js/main.js`

O carregamento visual tambem depende de:

- Google Fonts para a familia `Montserrat`
- imagens locais em `images/`

## 2. Objetivo funcional

O site foi estruturado para cumprir quatro objetivos principais:

- apresentar a profissional e seu posicionamento
- listar especialidades e diferenciais
- reforcar percepcao de autoridade e confianca
- converter o visitante para contato rapido por WhatsApp

## 3. Estrutura atual de arquivos

```text
site-camilla-karen/
|-- index.html
|-- css/
|   |-- style.css
|   |-- global.css
|   |-- navbar.css
|   |-- hero.css
|   |-- about.css
|   |-- services.css
|   |-- numbers.css
|   |-- gallery.css
|   |-- testimonials.css
|   |-- differentials.css
|   |-- contact.css
|   |-- footer.css
|   `-- responsive.css
|-- js/
|   `-- main.js
|-- images/
|   |-- icons/
|   |-- original/
|   `-- optimized/
|-- fonts/
|   `-- dolce_vita/
|-- dados.txt
`-- fazer.md
```

### Papel de cada area

- `index.html`: estrutura completa da pagina, secoes, CTAs, links e modal.
- `css/style.css`: ponto de entrada do CSS; agrega os demais arquivos via `@import`.
- `css/global.css`: tokens, reset, tipografia, layout base, utilitarios e componentes compartilhados.
- `css/*.css` por secao: regras especificas de cada bloco visual do site.
- `css/responsive.css`: media queries globais do projeto.
- `js/main.js`: comportamentos interativos da navegacao, contadores, lightbox e slider.
- `images/icons/`: icones SVG e PNG usados por botoes, contato, metricas e diferenciais.
- `images/original/`: arquivos raster originais locais e copias locais das imagens antes remotas.
- `images/optimized/`: versoes otimizadas em WebP usadas pelo HTML.
- `fonts/`: arquivos locais de fonte disponiveis no projeto, mas nao usados no CSS atual.
- `dados.txt`: referencia textual auxiliar.
- `fazer.md`: anotacao curta de apoio.

## 4. Arquitetura do HTML ativo

A pagina ativa segue esta ordem:

1. CTA flutuante de WhatsApp
2. navbar fixa
3. hero
4. secao `#sobre`
5. secao `#especialidades`
6. secao de numeros
7. secao de diferenciais
8. secao `#contato`
9. footer
10. modal de lightbox

### Componentes estruturais ativos

#### WhatsApp flutuante

- seletor: `#whatsapp-float`
- funcao: CTA persistente de contato
- comportamento: link externo fixo no canto inferior direito

#### Navbar

- seletor: `#navbar`
- subestrutura: `.nav-inner`, `.nav-logo`, `#nav-toggle`, `#nav-menu`
- funcao: navegacao por ancora e CTA principal
- estados controlados por JS:
  - `scrolled`
  - `menu-open`

#### Hero

- seletor principal: `.hero.overlay-dark.bg-cover`
- funcao: mensagem principal e CTA primario
- padroes:
  - imagem de fundo inline
  - overlay escuro compartilhado
  - centralizacao por utilitarios

#### Secao Sobre

- id: `#sobre`
- estrutura: `.split-section`
- colunas:
  - `.split-img.split-media.bg-cover`
  - `.split-content > .split-box`

#### Secao Especialidades

- id: `#especialidades`
- grid: `.services-grid`
- unidade repetida: `.service-card`
- subestrutura:
  - `.service-img.media-frame`
  - `h4`
  - `p`
  - `.btn-site.whatsapp-cta`

#### Secao Numeros

- seletor: `.numbers-section`
- grid: `.numbers-grid`
- unidade repetida: `.number-item`
- valor animado: `.count-up[data-target]`

#### Secao Diferenciais

- grid: `.diff-grid`
- unidade repetida: `.diff-item`
- variante visual: `.diff-border`

#### Secao Contato

- id: `#contato`
- estrutura: `.split-section`
- colunas:
  - `.contact-panel.overlay-dark.bg-cover`
  - `.contact-side-img.split-media.bg-cover`
- unidade repetida:
  - `.contact-item`
  - `.contact-icon`
  - `.contact-copy`
  - `.contact-link`

#### Footer

- classes principais: `.footer-inner`, `.footer-logo`

#### Modal

- id: `#lightbox`
- funcao: suporte ao lightbox da galeria
- estado atual: presente no DOM, mas sem uso visivel porque a secao da galeria esta comentada

## 5. Organizacao de imagens

Os assets visuais foram reorganizados em tres grupos:

- `images/icons/`: icones e pequenos assets de interface
- `images/original/`: arquivos de origem em `jpg`, `jpeg` e `png`
- `images/optimized/`: arquivos finais em `webp`

### 5.1 Estrategia aplicada

- imagens locais antigas da raiz foram redistribuidas entre `icons`, `original` e `optimized`
- imagens remotas do Pexels referenciadas no HTML foram baixadas para dentro do projeto
- os arquivos raster usados na pagina foram convertidos para WebP
- o `index.html` passou a apontar somente para caminhos locais em `images/icons/` e `images/optimized/`

### 5.2 Resultado pratico

- o projeto nao depende mais de imagens externas do Pexels para renderizar a pagina
- os backgrounds, fotos de cards, galeria comentada e depoimentos comentados agora possuem copias locais
- os assets visuais de interface ficaram separados dos arquivos fotograficos

## 6. Blocos comentados preservados

Existem dois blocos importantes comentados no HTML:

- secao `#espaco`
- secao `#depoimentos`

Esses blocos continuam relevantes tecnicamente porque:

- ainda existem regras CSS dedicadas para eles
- ainda existe logica JS associada a eles
- o modal de lightbox continua no DOM

Nada disso foi removido para evitar alteracao estrutural desnecessaria e para manter pronta uma eventual reativacao futura.

## 7. Organizacao atual do CSS

### 7.1 Estrategia adotada

O CSS foi reorganizado para arquivos menores por responsabilidade, sem alterar o design nem a estrutura do projeto.

O fluxo atual funciona assim:

1. `index.html` carrega apenas `css/style.css`
2. `css/style.css` importa os demais arquivos na ordem correta
3. `css/global.css` fornece a base compartilhada
4. os arquivos de secao adicionam apenas regras especificas
5. `css/responsive.css` concentra os breakpoints

Essa abordagem preserva o ponto de entrada original do projeto e reduz risco de regressao visual.

### 7.2 Ordem de carregamento

O arquivo `css/style.css` importa os arquivos nesta ordem:

1. `global.css`
2. `navbar.css`
3. `hero.css`
4. `about.css`
5. `services.css`
6. `numbers.css`
7. `gallery.css`
8. `testimonials.css`
9. `differentials.css`
10. `contact.css`
11. `footer.css`
12. `responsive.css`

Essa ordem foi mantida para respeitar a cascata original do projeto.

### 7.3 Conteudo de `global.css`

O arquivo `global.css` concentra o que e compartilhado entre varias partes do site:

- tokens em `:root`
- reset global
- tipografia base
- regras de `html` e `body`
- utilitarios de layout
- classes genericas como:
  - `.container`
  - `.container-fluid`
  - `.section-padding`
  - `.section-head`
  - `.bg-gray`
  - `.bg-cover`
  - `.overlay-dark`
  - `.text-center`
  - `.media-frame`
  - `.split-section`
- componente de botao:
  - `.btn-site`
  - `.btn-outline`
- CTA flutuante:
  - `#whatsapp-float`

### 7.4 Arquivos por secao

Cada arquivo abaixo concentra regras especificas de uma parte da interface:

- `navbar.css`: navbar, menu, toggle e estados visuais
- `hero.css`: hero, titulo principal, CTA central e `text-hero`
- `about.css`: estrutura da secao sobre
- `services.css`: cards e grid de especialidades
- `numbers.css`: secao de contadores
- `gallery.css`: galeria comentada e lightbox
- `testimonials.css`: slider de depoimentos comentado
- `differentials.css`: grade de diferenciais
- `contact.css`: painel de contato e coluna lateral
- `footer.css`: rodape
- `responsive.css`: media queries de todos os blocos

## 8. Tokens e reutilizacao visual

Os valores recorrentes foram centralizados em custom properties em `:root`, incluindo:

- cores
- sombras
- raios
- largura maxima de container
- altura da navbar
- escala de espacamento de titulos
- parametros tipograficos
- tempo base de transicao

Isso melhora manutencao sem mudar a aparencia do site.

## 9. Hooks e aliases semanticos introduzidos

Algumas classes foram adicionadas como hooks semanticos ou aliases de reutilizacao, sem objetivo de alterar o visual:

- `.section-title`
- `.whatsapp-cta`
- `.media-frame`
- `.contact-link`
- `.split-media`

### Motivo desses hooks

- desacoplar estilo de uma unica estrutura HTML
- facilitar manutencao futura
- tornar o markup mais legivel
- permitir rastreamento ou evolucao futura sem depender apenas de seletor estrutural

## 10. Comportamentos JavaScript

O arquivo `js/main.js` controla seis grupos de comportamento.

### 10.1 Navbar dinamica

Responsabilidades:

- adicionar ou remover a classe `scrolled`
- adicionar ou remover a classe `menu-open`
- trocar a logo conforme estado do topo/menu

Dados usados no HTML:

- `data-logo-default`
- `data-logo-scrolled`

### 10.2 Menu mobile

Responsabilidades:

- abrir e fechar `#nav-menu`
- atualizar `aria-expanded`
- fechar o menu ao clicar em ancora valida

### 10.3 Scroll suave e link ativo

Responsabilidades:

- interceptar links internos
- usar `scrollIntoView`
- atualizar `.nav-link.active` com base na secao atual

Observacao:

- o menu ainda possui link para `#espaco`, mas essa secao esta comentada no HTML
- nesse caso o JS apenas nao encontra destino e nao executa scroll

### 10.4 Contador animado

Responsabilidades:

- observar `.count-up`
- ler `data-target`
- animar os numeros quando entram na viewport

### 10.5 Lightbox da galeria

Responsabilidades:

- abrir a imagem ampliada
- navegar entre imagens
- fechar por clique externo
- fechar por `Escape`
- navegar por setas do teclado

Status atual:

- infraestrutura preservada
- secao da galeria comentada
- funcionalidade inativa na experiencia atual

### 10.6 Slider de depoimentos

Responsabilidades:

- trocar slides
- criar dots dinamicamente
- autoplay

Status atual:

- codigo preservado
- secao de depoimentos comentada
- funcionalidade inativa na experiencia atual

## 11. Mudancas recentes registradas

As mudancas recentes foram de organizacao, sem alterar design, estrutura de pagina ou objetivo funcional.

### 11.1 Mudancas no HTML

- adicao de comentarios organizacionais por bloco
- adicao de classes semanticas para reaproveitamento e leitura:
  - `.section-title`
  - `.whatsapp-cta`
  - `.media-frame`
  - `.contact-link`
  - `.split-media`
- substituicao das URLs remotas de imagem por caminhos locais
- atualizacao das referencias para `images/icons/` e `images/optimized/`

### 11.2 Mudancas no CSS

- divisao do antigo CSS monolitico em arquivos por secao
- criacao de `global.css` para regras compartilhadas
- manutencao de `style.css` como ponto de entrada unico
- criacao de `responsive.css` para breakpoints
- preservacao da cascata por ordem explicita de `@import`

### 11.3 Mudancas nos assets

- criacao das pastas `images/icons/`, `images/original/` e `images/optimized/`
- download local das imagens antes servidas pelo Pexels
- geracao de arquivos WebP para os rasters usados pelo HTML
- preservacao dos arquivos originais para manutencao futura

### 11.4 O que nao mudou

- o HTML continua sendo servido como pagina estatica unica
- o arquivo carregado no HTML continua sendo `css/style.css`
- o design visual continua o mesmo
- a estrutura de navegacao continua a mesma
- o JS continua centralizado em `js/main.js`
- os blocos comentados continuam preservados

## 12. Padroes recomendados para manutencao futura

### Ao adicionar uma nova secao

- mantenha `index.html` como ponto unico de markup
- prefira criar um novo arquivo CSS de secao quando o bloco tiver identidade propria
- importe o novo arquivo em `css/style.css` na ordem adequada da cascata
- coloque apenas regras compartilhadas em `global.css`

### Ao adicionar um novo titulo de secao

Use:

```html
<div class="section-head">
  <h4 class="section-title">Novo titulo</h4>
</div>
```

### Ao adicionar uma nova imagem com o mesmo enquadramento visual

Use:

```html
<div class="media-frame">
  <img src="..." alt="">
</div>
```

### Ao adicionar ou substituir imagens raster

- coloque o arquivo de origem em `images/original/`
- gere a versao final em `images/optimized/` preferencialmente em WebP
- aponte o HTML para a versao em `images/optimized/`

### Ao adicionar um novo icone

- coloque o arquivo em `images/icons/`
- prefira SVG para icones simples e PNG apenas quando houver necessidade visual

### Ao adicionar um novo CTA de WhatsApp

Use:

```html
<a class="btn-site whatsapp-cta" href="https://wa.me/...">
  <span>Texto do CTA</span>
</a>
```

### Ao adicionar um novo link de contato

Use:

```html
<a class="contact-link" href="mailto:...">...</a>
```

## 13. Dependencias externas

O projeto depende de recursos fora do repositorio:

- Google Fonts para `Montserrat`

Impacto:

- sem rede, a fonte pode nao carregar como esperado

## 14. Observacoes importantes

### 14.1 Recursos inativos preservados

Mesmo com secao de galeria e depoimentos comentadas:

- `gallery.css` continua no projeto
- `testimonials.css` continua no projeto
- o JS dessas experiencias continua em `main.js`
- o modal de lightbox continua no DOM
- as imagens dessas secoes agora tambem existem localmente

Isso e intencional para nao quebrar uma futura reativacao.

### 14.2 Codificacao

Os arquivos funcionam normalmente no navegador. Em alguns terminais Windows, a exibicao de acentos pode parecer incorreta por causa da codificacao do console, sem que isso indique defeito no arquivo real.

## 15. Resumo executivo

O projeto permanece como um site estatico de pagina unica, com HTML simples, CSS modularizado e JavaScript enxuto para interacoes de navegacao e destaque visual.

As melhorias recentes focaram em manutencao e legibilidade:

- comentarios estruturais no HTML
- hooks semanticos para componentes e links
- centralizacao de regras compartilhadas em `global.css`
- divisao do CSS em arquivos por secao
- localizacao de todas as imagens do HTML para dentro do projeto
- organizacao dos assets em `icons`, `original` e `optimized`
- conversao dos rasters usados para WebP
- preservacao integral do design, da estrutura e do comportamento atual

O resultado e uma base mais facil de manter, expandir e documentar sem alterar o front entregue.
