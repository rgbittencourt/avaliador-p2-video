# Avaliador P2 · Roteiro e Vídeo — Guia passo a passo

Guia completo para **publicar** o aplicativo e para **usá-lo** na avaliação da P2 (Portfólio "Apresentando meu desafio") do TEDPRO/IFSC.

O guia tem quatro partes:

- **Parte A — Publicar o app** (colocar no ar, no Render)
- **Parte B — Usar o app** (avaliar um aluno do começo ao fim)
- **Parte C — Rodar no seu computador** (opcional, para testar antes)
- **Parte D — Solução de problemas** e tabela de variáveis

---

## Visão geral em uma frase

Você sobe o código para um repositório no GitHub, cria um serviço no Render a partir do `render.yaml`, informa os segredos (senha, chave de IA da OpenAI ou da Anthropic, banco de dados e token de backup) e acessa o endereço gerado. No app, você cria uma turma, importa o roteiro em PDF, assiste ao vídeo, preenche a rubrica (com ajuda da IA), gera o feedback e salva. O relatório executivo consolida a turma.

---

# Parte A — Publicar o app (deploy)

## Pré-requisitos (contas gratuitas)

1. **GitHub** — para hospedar o código e os dados. (https://github.com)
2. **Render** — para rodar o app. (https://render.com)
3. **Neon** — banco PostgreSQL gratuito, para guardar as turmas com segurança. (https://neon.tech)
4. **IA (OpenAI ou Anthropic/Claude)** — *opcional*, só se quiser o botão "Avaliar automaticamente" e a leitura semântica do roteiro. Basta uma das duas: OpenAI (https://platform.openai.com) ou Anthropic (https://console.anthropic.com).

> Sem chave de IA o app funciona normalmente: a avaliação automática usa uma versão **local** mais conservadora e você ajusta a rubrica manualmente. Sem o Neon o app roda, mas os dados ficam em arquivo temporário e **podem se perder** quando o Render reinicia — por isso o banco é fortemente recomendado.

---

## Passo 1 — Subir o código para o GitHub

1. Descompacte o `avaliador-p2-video.zip` no seu computador.
2. No GitHub, clique em **New repository**, dê um nome (ex.: `avaliador-p2-video`), deixe **público ou privado** (tanto faz) e crie.
3. Suba os arquivos. Pela interface do GitHub: abra o repositório → **Add file → Upload files** → arraste **todo o conteúdo da pasta** `avaliador-p2-video` (não a pasta em si, mas os arquivos de dentro: `server.js`, `public/`, `render.yaml`, etc.) → **Commit changes**.
   - Se preferir o terminal:
     ```bash
     cd avaliador-p2-video
     git init
     git add .
     git commit -m "Avaliador P2 - versão inicial"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/avaliador-p2-video.git
     git push -u origin main
     ```

> A pasta `node_modules` **não** vai no repositório (o Render instala sozinho). O `.gitignore` já cuida disso.

---

## Passo 2 — Criar o repositório de dados (backup)

Este repositório guarda uma **cópia de segurança** das turmas em JSON, versionada.

1. No GitHub, crie **outro** repositório, **privado**, chamado exatamente **`avaliador-p2-dados`**.
2. Deixe-o **vazio** (sem README). O app cria o arquivo `dados/turmas.json` dentro dele automaticamente no primeiro backup.

> Se você escolher outro nome, lembre de ajustar `GITHUB_DATA_REPO` no Passo 7.

---

## Passo 3 — Criar o banco PostgreSQL (Neon)

1. Entre no Neon, clique em **Create project**, escolha a região mais próxima (ex.: AWS São Paulo) e crie.
2. Na tela do projeto, copie a **Connection string** (algo como `postgresql://usuario:senha@host/neondb?sslmode=require`).
3. Guarde esse texto — ele será o valor de **`DATABASE_URL`** no Passo 7.

---

## Passo 4 — Obter a chave de IA (opcional)

O app funciona com **OpenAI** ou com **Anthropic (Claude)**. Você escolhe qual usar na variável `IA_PROVEDOR` (`openai` ou `anthropic`) e pode trocar a qualquer momento no Render, sem mexer no código.

**OpenAI**
1. Em https://platform.openai.com/api-keys clique em **Create new secret key**.
2. Copie a chave (começa com `sk-...`). Ela será **`OPENAI_API_KEY`**.
3. O modelo padrão é o `gpt-4o-mini`. Dá para trocar em `OPENAI_MODEL`.

**Anthropic (Claude)**
1. Em https://console.anthropic.com, abra **API Keys** e clique em **Create Key**.
2. Copie a chave (começa com `sk-ant-...`). Ela será **`ANTHROPIC_API_KEY`**.
3. O modelo padrão é o `claude-haiku-5-5`. Dá para trocar em `ANTHROPIC_MODEL` (por exemplo, `claude-sonnet-5-5`).

> Pode cadastrar as duas chaves e alternar só mudando `IA_PROVEDOR`. Se `IA_PROVEDOR` ficar vazia, o app usa a OpenAI quando houver a chave dela; senão, a Anthropic.

---

## Passo 5 — Criar o token do GitHub para backup (opcional, mas recomendado)

1. No GitHub: **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Em **Repository access**, escolha **Only select repositories** e marque o `avaliador-p2-dados`.
3. Em **Permissions → Repository permissions**, dê **Contents: Read and write**.
4. Gere e copie o token. Ele será **`GITHUB_DATA_TOKEN`**.

---

## Passo 6 — Criar o serviço no Render

1. No Render, clique em **New → Blueprint**.
2. Conecte sua conta do GitHub e selecione o repositório `avaliador-p2-video`.
3. O Render lê o arquivo `render.yaml` e já propõe o serviço **`avaliador-p2-video`** (Docker, plano Free). Clique em **Apply**.

---

## Passo 7 — Configurar os segredos no Render

Na tela do serviço, em **Environment**, preencha (os marcados como `sync: false` precisam ser digitados por você):

| Variável | O que colocar |
|---|---|
| `APP_PASSWORD` | **Crie uma senha** forte — será pedida para usar o app. |
| `OPENAI_API_KEY` | A chave `sk-...` da OpenAI (Passo 4; em branco se não for usar). |
| `ANTHROPIC_API_KEY` | A chave `sk-ant-...` da Anthropic (Passo 4; em branco se não for usar). |
| `DATABASE_URL` | A connection string do Neon (Passo 3). |
| `GITHUB_DATA_TOKEN` | O token do Passo 5 (deixe em branco se não for usar backup). |

Já vêm preenchidas (não precisa mexer): `APP_USERNAME` = `professor`, `IA_PROVEDOR` = `openai`, `OPENAI_MODEL` = `gpt-4o-mini`, `ANTHROPIC_MODEL` = `claude-haiku-5-5`, e os `GITHUB_DATA_OWNER/REPO/BRANCH/PATH`.

Clique em **Save changes**. O Render reconstrói e publica.

---

## Passo 8 — Conferir se está no ar

1. Espere o deploy ficar **Live** (algumas versões levam 2–5 min).
2. Acesse o endereço do serviço (ex.: `https://avaliador-p2-video.onrender.com`).
3. Teste a saúde do app abrindo `.../api/health` — deve responder `{"ok":true,...}`.
4. Ao abrir o app, o navegador pede **usuário e senha**: usuário `professor` e a senha que você definiu em `APP_PASSWORD`.

> No plano Free o serviço "dorme" após inatividade; a primeira abertura do dia pode levar ~30 segundos para acordar.

---

## Passo 9 — Instalar como aplicativo (PWA)

No computador (Chrome/Edge) ou no celular, abra o endereço e use **Instalar aplicativo** (ícone na barra de endereço, ou menu → "Adicionar à tela inicial"). Ele passa a abrir como um app, em janela própria.

---

# Parte B — Usar o app (avaliar um aluno do começo ao fim)

A tela tem a **coluna da esquerda** (importar, vídeo, dados, rubrica) e a **coluna da direita** (nota, feedback, turma).

## 1. Criar ou escolher a turma

1. No painel **Turma** (direita), digite o nome em **Nome da turma** (ex.: `TEDPRO 2026 · Turma A`).
2. Clique em **Criar nova turma**. Ela passa a ser a turma ativa.

## 2. Importar o roteiro (PDF)

1. No bloco **1. Importar roteiro do aluno (PDF)**, clique em **Choose File** e selecione o PDF do roteiro.
2. O app lê as páginas, separa as colunas **Voz** e **Imagens/Outros** e preenche automaticamente as **Cenas 1 a 5**, o nome, a matrícula e o tema/desafio.
3. Se algum campo vier torto, clique em **Reinterpretar roteiro com IA** (precisa da chave de IA) ou ajuste à mão. Use **Ver páginas do roteiro** para conferir o original.

> Nada do PDF vai para o servidor; a leitura acontece no seu navegador. Só os campos de texto revisados são enviados à IA, e apenas quando você pede uma análise.

## 3. O vídeo

No bloco **2. Vídeo do aluno** você tem três caminhos:

- **Link (YouTube/Vimeo/Drive):** cole o link e clique em **▶ Assistir aqui** — o vídeo abre **embutido** na própria tela. No YouTube, a **duração é preenchida automaticamente** ao dar play.
- **Arquivo MP4:** clique em **Choose File** e selecione o arquivo. Ele **toca inline**, a **duração é medida sozinha** (e já pontua o Critério 2), e o app extrai **6 quadros** para você inspecionar (**Ver quadros extraídos**).
- **Áudio:** com o MP4 carregado, clique em **🔊 Analisar áudio** para ver **volume médio, pico (com aviso de estouro) e % de silêncio**. O botão **Anexar às observações** joga o resumo no campo de observação.

Preencha a **Observação do professor sobre o vídeo** (o que aparece e é dito, edição, imagens de apoio, criatividade) — vários critérios de vídeo se apoiam nela.

## 4. Dados do aluno e tema

Confira **Nome, Matrícula e Orientador(a)**. O **orientador** define a assinatura do feedback (ex.: "Prof. Rogério", "Prof. Luís"). Revise o **Tema/Desafio** e as cenas.

## 5. Preencher a rubrica

No bloco **4. Rubrica oficial da P2**, marque um nível em cada um dos 11 critérios (4 de Roteiro + 7 de Vídeo). A **nota** (0 a 10) e a tabela colorida à direita se atualizam na hora. Você pode escrever uma **Observação do avaliador** em cada critério.

- Atalho: clique em **✨ Avaliar automaticamente**. Com a chave de IA configurada, a IA sugere notas, justificativas, alertas e o feedback a partir do roteiro e das suas observações. **Sempre revise** — a sugestão é um ponto de partida, especialmente nos critérios que dependem de assistir ao vídeo.

## 6. Feedback

No painel **Feedback gerado** (direita), o texto sai no formato padrão: saudação, mensagem motivacional, **Tema/Assunto**, bloco **"O que consertar"** (apenas os critérios que **não** atingiram o máximo) e avaliação final, assinado pelo orientador. É **totalmente editável**. Use **Atualizar conforme avaliação** para regerar a partir das notas, ou **Copiar** para levar o texto.

## 7. Salvar o aluno

Clique em **Salvar aluno** (painel Turma). Ele aparece na lista com a nota. Para abrir de novo, use **Abrir** na tabela; para começar outro, **Nova avaliação**.

## 8. Relatório executivo da turma

Com vários alunos salvos, clique em **📊 Relatório executivo**. Abre uma página pronta para **imprimir / salvar em PDF** com média, mediana, distribuição de notas, desempenho por critério (separado em Roteiro e Vídeo), recomendações e a tabela individual.

## 9. Backup e portabilidade

- **Salvar cópia no GitHub** — grava a turma no repositório de dados (se o token estiver configurado).
- **Exportar JSON** — baixa a turma inteira (use **Importar turma do JSON** para restaurar ou levar a outro dispositivo).
- **Exportar CSV** — planilha com as notas por critério.

---

# Parte C — Rodar no seu computador (opcional)

Para testar antes de publicar. Precisa do **Node.js 18+**.

```bash
cd avaliador-p2-video
cp .env.example .env      # edite .env e coloque pelo menos APP_PASSWORD
npm install
npm start
```

Abra `http://localhost:3000`. Sem `DATABASE_URL`, os dados ficam no arquivo `data/turmas.json` local (bom para teste).

Para rodar os testes automáticos: `npm test`.

---

# Parte D — Solução de problemas

**Pede usuário e senha e não entra.** Usuário é `professor` (ou o que estiver em `APP_USERNAME`); a senha é a que você pôs em `APP_PASSWORD`. Se esqueceu, troque a variável no Render e salve.

**O botão "Avaliar automaticamente" dá erro ou vem "local".** Falta a chave do provedor escolhido em `IA_PROVEDOR` (`OPENAI_API_KEY` ou `ANTHROPIC_API_KEY`), ela está inválida, ou sem créditos. Abra `/api/health` para ver qual provedor e modelo estão ativos. O app cai para a avaliação local conservadora — revise as notas manualmente.

**"Reinterpretar roteiro com IA" não funciona.** Mesmo motivo: depende da chave de IA. A leitura preliminar (sem IA) continua preenchendo os campos.

**A duração não preencheu sozinha no YouTube.** Dê **play** no vídeo embutido — a duração chega logo após iniciar. Em Vimeo/Drive, informe no campo "Duração do vídeo" ou carregue o MP4.

**"Analisar áudio" falhou.** A análise só funciona com o **MP4 carregado localmente** (link do YouTube não entrega o áudio). Alguns codecs não são suportados pela Web Audio API; nesse caso, assista pelo player e avalie o som de ouvido.

**As turmas sumiram depois de um tempo.** É sinal de que o `DATABASE_URL` não está configurado e o Render reiniciou. Configure o Neon (Passo 3) — com ele os dados são permanentes.

**"Salvar cópia no GitHub" dá falha.** Confira o `GITHUB_DATA_TOKEN` (permissão **Contents: Read and write** no repositório `avaliador-p2-dados`) e se o repositório existe.

**O app demora a abrir.** No plano Free do Render ele "dorme"; a primeira abertura acorda o serviço em ~30s.

---

## Tabela de variáveis de ambiente

| Variável | Obrigatória? | Função |
|---|---|---|
| `APP_PASSWORD` | **Sim** (em produção) | Senha de acesso ao app. |
| `APP_USERNAME` | Não (padrão `professor`) | Usuário de acesso. |
| `DATABASE_URL` | **Sim** (em produção) | Banco PostgreSQL/Neon — guarda as turmas. |
| `IA_PROVEDOR` | Não (`openai` ou `anthropic`) | Qual IA usar. Vazio: OpenAI se houver chave, senão Anthropic. |
| `OPENAI_API_KEY` | Não | Chave da OpenAI. |
| `OPENAI_MODEL` | Não (padrão `gpt-4o-mini`) | Modelo da OpenAI. |
| `ANTHROPIC_API_KEY` | Não | Chave da Anthropic (Claude). |
| `ANTHROPIC_MODEL` | Não (padrão `claude-haiku-5-5`) | Modelo da Anthropic. |
| `IA_MAX_TOKENS` | Não (padrão `16000`) | Tamanho máximo da resposta da Anthropic (se cortar, o app tenta de novo com o dobro). |
| `GITHUB_DATA_OWNER` | Não (padrão `rgbittencourt`) | Dono do repositório de backup. |
| `GITHUB_DATA_REPO` | Não (padrão `avaliador-p2-dados`) | Repositório de backup. |
| `GITHUB_DATA_BRANCH` | Não (padrão `main`) | Branch do backup. |
| `GITHUB_DATA_PATH` | Não (padrão `dados/turmas.json`) | Caminho do arquivo de backup. |
| `GITHUB_DATA_TOKEN` | Não | Token para gravar o backup no GitHub. |
| `PORT` | Não (padrão `3000`) | Porta local (o Render define sozinho). |

---

## Resumo rápido (para quem já conhece)

1. Suba o código num repositório GitHub.
2. Crie o repositório privado `avaliador-p2-dados` (vazio).
3. Crie um banco no Neon e copie a `DATABASE_URL`.
4. (Opcional) chave de IA (OpenAI ou Anthropic) e token do GitHub.
5. Render → New → Blueprint → selecione o repo → Apply.
6. Preencha `APP_PASSWORD`, `DATABASE_URL`, `GITHUB_DATA_TOKEN` e a chave de IA (`OPENAI_API_KEY` e/ou `ANTHROPIC_API_KEY`, conforme `IA_PROVEDOR`).
7. Abra `/api/health`, depois o app, e instale como PWA.
