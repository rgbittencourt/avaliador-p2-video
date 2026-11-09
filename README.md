# Avaliador P2 - Roteiro e Vídeo (TEDPRO)

PWA para apoiar a avaliação da atividade **P2 - Portfólio "Apresentando meu desafio"** do TEDPRO/IFSC. A ferramenta segue os 11 descritores da rubrica oficial (4 de roteiro + 7 de vídeo) e converte a pontuação para a escala de 0 a 10.

## Aplicativo publicado

- **App (P2 Roteiro e Vídeo):** https://avaliador-p2-video.onrender.com
- **Verificação do servidor:** https://avaliador-p2-video.onrender.com/api/health
- Hospedagem: Render (serviço `avaliador-p2-video`). O plano gratuito "dorme" sem uso: a primeira abertura pode levar uns 50 segundos.

## Funcionalidades

- importação do roteiro em PDF no modelo oficial da P2 (Cenas 1 a 5, colunas Voz/Imagens/Outros);
- extração e revisão semântica dos campos de cada cena;
- leitura do vídeo **no navegador**: mede a duração automaticamente (que pontua o critério de tempo) e extrai quadros para inspeção visual;
- campo de link do vídeo (YouTube etc.) para abrir e assistir;
- rubrica completa de 30 pontos, integralmente editável, agrupada em Roteiro e Vídeo;
- sugestão automática de notas, justificativas, alertas e feedback;
- feedback no formato padrão do orientador: saudação, mensagem motivacional, tema, "o que consertar" (somente descritores não máximos) e avaliação final;
- assinatura automática pelo primeiro nome do orientador (ex.: "Prof. Rogério", "Prof. Luís");
- turmas nomeadas, avaliações reabertas e detecção de duplicidade;
- exportação JSON e CSV, importação JSON e relatório executivo;
- persistência local ou PostgreSQL/Neon;
- backup automático opcional em repositório GitHub privado (`avaliador-p2-dados`);
- instalação como aplicativo (PWA) em computador, tablet e celular.

## Executar localmente

Requer Node.js 18 ou superior.

```bash
cp .env.example .env
npm install
npm start
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

- `IA_PROVEDOR`: `openai` ou `anthropic` (vazio: OpenAI se houver chave, senão Anthropic);
- `OPENAI_API_KEY` / `OPENAI_MODEL` (padrão `gpt-4o-mini`): OpenAI;
- `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` (padrão `claude-haiku-5-5`): Anthropic (Claude);
- a IA é usada na avaliação automática e na extração semântica do roteiro; toda a chamada fica em `ia.js`;
- `APP_USERNAME` e `APP_PASSWORD`: proteção das APIs;
- `DATABASE_URL`: PostgreSQL/Neon; sem ela, usa `data/turmas.json`;
- `GITHUB_DATA_*`: repositório privado de backup das turmas.

## Critérios da rubrica (máximo 30 pontos)

**Roteiro**
1. Utiliza o modelo sugerido — 1 ponto.
2. Explora, de forma diversificada, as linguagens visual e auditiva — 3 pontos.
3. Apresenta imagens/cenas que complementem a informação oral — 3 pontos.
4. Apresenta estrutura com abertura, desenvolvimento e fechamento — 3 pontos.

**Vídeo**
5. O vídeo segue o roteiro elaborado — 3 pontos.
6. Respeita o limite de 2 minutos — 2 pontos.
7. Apresenta um desafio claro e relevante — 3 pontos.
8. Comunica o desafio de forma criativa e inovadora — 3 pontos.
9. Apresenta contexto e público-alvo ligados às tecnologias para a educação profissional — 3 pontos.
10. Apresenta a motivação e justifica a importância do desafio — 3 pontos.
11. Sugere ideias/soluções focadas nas tecnologias e na educação profissional — 3 pontos.

**Nota final = (soma dos pontos obtidos ÷ 30) × 10.**

## Privacidade

O PDF do roteiro e o arquivo de vídeo são lidos no navegador. Somente os campos textuais revisados pelo professor são enviados à API quando uma análise automática é solicitada. Nem o PDF, nem o vídeo, nem as imagens são armazenados pelo servidor.

## Seletor de IA

Com as duas chaves configuradas (`OPENAI_API_KEY` e `ANTHROPIC_API_KEY`), a janela de login do app tem o campo **Inteligência artificial** (OpenAI ou Claude), e o topo da página tem o seletor **IA** para trocar a qualquer momento. A escolha fica salva no navegador. `IA_PROVEDOR` define só a opção inicial. A janela de login agora é do próprio app (o servidor envia `X-Login-Necessario` em vez de `WWW-Authenticate`).
