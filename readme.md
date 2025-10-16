# Documenta��o
Prova de Conceito (POC) � Automa��o Web com Playwright

## Objetivo
Criar uma prova de conceito (POC) de automa��o de testes web para validar o **fluxo de login, pesquisa, valida��o de produto e checkout** no site p�blico de e-commerce fict�cio [https://www.saucedemo.com/](https://www.saucedemo.com/).

---

## Ferramentas e Tecnologias Utilizadas
- **Linguagem:** JavaScript
- **Framework de Teste:** [Playwright](https://playwright.dev/)
- **Padr�o de Arquitetura:** Page Object Model (POM)
- **Controle de Vers�o:** Git / GitHub
- **Execu��o Cont�nua (CI):** GitHub Actions

---

## Arquitetura do Projeto
O projeto segue o padr�o **Page Object Model (POM)**, que separa a l�gica de automa��o (a��es e seletores) dos casos de teste.

**Estrutura de diret�rios:**
saucedemo-poc-web/
?
??? pages/ # Page Objects (camada de p�ginas)
? ??? LoginPage.js
? ??? ProductsPage.js
? ??? CartPage.js
? ??? CheckoutPage.js
? ??? OverviewPage.js
?
??? tests/ # Casos de teste automatizados
? ??? saucedemo.spec.js
?
??? playwright.config.js # Configura��es gerais (headless, slowMo, reporter)
??? package.json # Depend�ncias e scripts de execu��o
??? README.md # Documenta��o do projeto
??? .github/workflows/ # Pipeline CI (GitHub Actions)
??? playwright.yml

yaml
Copiar c�digo

---

## Configura��o do Ambiente

### Pr�-requisitos
- **Node.js** vers�o 18 ou superior
- **VS Code** (opcional, mas recomendado)
- **Git** instalado e configurado

---

### Instalar depend�ncias
No terminal, dentro da pasta do projeto:

```bash
npm install
npx playwright install

Estrutura m�nima do package.json
json
Copiar c�digo
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

 Execu��o dos Testes
 Rodar os testes em modo �headless� (sem abrir o navegador)
bash
Copiar c�digo
npx playwright test
 Rodar com navegador vis�vel
bash
Copiar c�digo
npx playwright test --headed
 Rodar mais devagar (�til para demonstra��o)
bash
Copiar c�digo
npx playwright test --headed --slow-mo 200
 Gerar e abrir o relat�rio HTML
bash
Copiar c�digo
npx playwright show-report
Ou abra manualmente:

bash
Copiar c�digo
playwright-report/index.html

 Fluxo de Teste Automatizado
O teste cobre todo o ciclo de compra no site SauceDemo:

Etapa	Descri��o
 Login	Acessa o site e realiza login com standard_user e secret_sauce.
 Navega��o e Pesquisa	Acessa a listagem de produtos (inventory).
 Valida��o	Seleciona um produto e valida nome, pre�o e descri��o.
 Carrinho e Checkout	Adiciona o produto ao carrinho e inicia o checkout.
 Finaliza��o	Preenche dados de checkout e valida mensagem de sucesso.

 Decis�es T�cnicas
Decis�o	Justificativa
Playwright	Framework moderno e r�pido, com suporte a m�ltiplos navegadores.
JavaScript	Linguagem solicitada e de f�cil integra��o com Playwright.
POM (Page Object Model)	Facilita manuten��o, reutiliza��o e clareza do c�digo.
GitHub Actions	Permite execu��o autom�tica dos testes (CI/CD).
Relat�rio HTML	Gera��o autom�tica de relat�rio com evid�ncias.

 Execu��o Cont�nua (CI) � GitHub Actions
Arquivo .github/workflows/playwright.yml:

yaml
Copiar c�digo
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
 Ao fazer push para o GitHub, os testes ser�o executados automaticamente em ambiente Linux e o relat�rio ser� salvo como artefato.

Suposi��es Importantes
O site https://www.saucedemo.com/ est� acess�vel.

Credenciais padr�o:

Usu�rio: standard_user

Senha: secret_sauce

O campo de pesquisa � simulado (n�o h� busca real no site).

O teste foi desenvolvido e validado com Playwright v1.40.0 e Node 18+.

Evid�ncias
O Playwright gera automaticamente:

Relat�rios HTML: playwright-report/

Screenshots e v�deos em caso de falha

Logs e traces para an�lise detalhada

Como Reproduzir
Clonar o reposit�rio:

bash
Copiar c�digo
git clone https://github.com/SEU-USUARIO/saucedemo-poc-web.git
cd saucedemo-poc-web
Instalar depend�ncias:

bash
Copiar c�digo
npm install
npx playwright install
Executar os testes:

bash
Copiar c�digo
npm run test:headed
Visualizar o relat�rio:

bash
Copiar c�digo
npx playwright show-report
Resultado Esperado
Todos os testes executam com sucesso, validando o fluxo completo de compra.

Relat�rio HTML gerado sem falhas.

Estrutura POM clara e modular.

Execu��o autom�tica validada via GitHub Actions.

Desenvolvido por:
Andr�a Cunha da Fonseca
Analista de Testes e Qualidade de Software | Automa��o | QA | Playwright | JavaScript