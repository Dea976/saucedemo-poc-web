# Documentação
Prova de Conceito (POC) – Automação Web com Playwright

## Objetivo
Criar uma prova de conceito (POC) de automação de testes web para validar o **fluxo de login, pesquisa, validação de produto e checkout** no site público de e-commerce fictício [https://www.saucedemo.com/](https://www.saucedemo.com/).

---

## Ferramentas e Tecnologias Utilizadas
- **Linguagem:** JavaScript
- **Framework de Teste:** [Playwright](https://playwright.dev/)
- **Padrão de Arquitetura:** Page Object Model (POM)
- **Controle de Versão:** Git / GitHub
- **Execução Contínua (CI):** GitHub Actions

---

## Arquitetura do Projeto
O projeto segue o padrão **Page Object Model (POM)**, que separa a lógica de automação (ações e seletores) dos casos de teste.

**Estrutura de diretórios:**
saucedemo-poc-web/
?
??? pages/ # Page Objects (camada de páginas)
? ??? LoginPage.js
? ??? ProductsPage.js
? ??? CartPage.js
? ??? CheckoutPage.js
? ??? OverviewPage.js
?
??? tests/ # Casos de teste automatizados
? ??? saucedemo.spec.js
?
??? playwright.config.js # Configurações gerais (headless, slowMo, reporter)
??? package.json # Dependências e scripts de execução
??? README.md # Documentação do projeto
??? .github/workflows/ # Pipeline CI (GitHub Actions)
??? playwright.yml

yaml
Copiar código

---

## Configuração do Ambiente

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **VS Code** (opcional, mas recomendado)
- **Git** instalado e configurado

---

### Instalar dependências
No terminal, dentro da pasta do projeto:

```bash
npm install
npx playwright install

Estrutura mínima do package.json
json
Copiar código
{
  "name": "saucedemo-poc-web",
  "version": "1.0.0",
  "description": "POC Playwright - SauceDemo",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}

 Execução dos Testes
 Rodar os testes em modo “headless” (sem abrir o navegador)
bash
Copiar código
npx playwright test
 Rodar com navegador visível
bash
Copiar código
npx playwright test --headed
 Rodar mais devagar (útil para demonstração)
bash
Copiar código
npx playwright test --headed --slow-mo 200
 Gerar e abrir o relatório HTML
bash
Copiar código
npx playwright show-report
Ou abra manualmente:

bash
Copiar código
playwright-report/index.html

 Fluxo de Teste Automatizado
O teste cobre todo o ciclo de compra no site SauceDemo:

Etapa	Descrição
 Login	Acessa o site e realiza login com standard_user e secret_sauce.
 Navegação e Pesquisa	Acessa a listagem de produtos (inventory).
 Validação	Seleciona um produto e valida nome, preço e descrição.
 Carrinho e Checkout	Adiciona o produto ao carrinho e inicia o checkout.
 Finalização	Preenche dados de checkout e valida mensagem de sucesso.

 Decisões Técnicas
Decisão	Justificativa
Playwright	Framework moderno e rápido, com suporte a múltiplos navegadores.
JavaScript	Linguagem solicitada e de fácil integração com Playwright.
POM (Page Object Model)	Facilita manutenção, reutilização e clareza do código.
GitHub Actions	Permite execução automática dos testes (CI/CD).
Relatório HTML	Geração automática de relatório com evidências.

 Execução Contínua (CI) – GitHub Actions
Arquivo .github/workflows/playwright.yml:

yaml
Copiar código
name: Playwright Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - name: Upload Playwright Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
 Ao fazer push para o GitHub, os testes serão executados automaticamente em ambiente Linux e o relatório será salvo como artefato.

Suposições Importantes
O site https://www.saucedemo.com/ está acessível.

Credenciais padrão:

Usuário: standard_user

Senha: secret_sauce

O campo de pesquisa é simulado (não há busca real no site).

O teste foi desenvolvido e validado com Playwright v1.40.0 e Node 18+.

Evidências
O Playwright gera automaticamente:

Relatórios HTML: playwright-report/

Screenshots e vídeos em caso de falha

Logs e traces para análise detalhada

Como Reproduzir
Clonar o repositório:

bash
Copiar código
git clone https://github.com/SEU-USUARIO/saucedemo-poc-web.git
cd saucedemo-poc-web
Instalar dependências:

bash
Copiar código
npm install
npx playwright install
Executar os testes:

bash
Copiar código
npm run test:headed
Visualizar o relatório:

bash
Copiar código
npx playwright show-report
Resultado Esperado
Todos os testes executam com sucesso, validando o fluxo completo de compra.

Relatório HTML gerado sem falhas.

Estrutura POM clara e modular.

Execução automática validada via GitHub Actions.

Desenvolvido por:
Andréa Cunha da Fonseca
Analista de Testes e Qualidade de Software | Automação | QA | Playwright | JavaScript