require('dotenv').config();
const express = require('express');
const path = require('path');
const {RUBRICA, ORDEM, PONTOS_MAXIMOS, notaFinal} = require('./rubrica');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const APP_USERNAME = process.env.APP_USERNAME || 'professor';
const APP_PASSWORD = process.env.APP_PASSWORD || '';

if(process.env.NODE_ENV === 'production' && !APP_PASSWORD){
  throw new Error('APP_PASSWORD é obrigatória em produção.');
}
if(process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL){
  throw new Error('DATABASE_URL é obrigatória em produção para impedir perda de turmas em armazenamento temporário.');
}

app.use((req,res,next)=>{
  if(!APP_PASSWORD || req.path === '/api/health' || !req.path.startsWith('/api/')) return next();
  const header = req.headers.authorization || '';
  let usuario='', senha='';
  try{ [usuario,senha] = Buffer.from(header.replace(/^Basic\s+/i,''),'base64').toString('utf8').split(':'); }catch{}
  if(usuario === APP_USERNAME && senha === APP_PASSWORD) return next();
  res.set('WWW-Authenticate','Basic realm="Avaliador P2 Vídeo e Roteiro", charset="UTF-8"');
  return res.status(401).send('Autenticação necessária.');
});

app.use(express.json({limit:'4mb'}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/api/health',(_req,res)=>res.json({ok:true,openaiConfigurada:Boolean(OPENAI_API_KEY)}));

function precisaChave(res){
  if(OPENAI_API_KEY) return false;
  res.status(401).json({erro:'OPENAI_API_KEY não configurada no servidor.'});
  return true;
}

app.get('/api/turmas',async(_req,res)=>{try{res.json(await db.listarTurmas());}catch(e){res.status(500).json({erro:e.message});}});
app.post('/api/turmas',async(req,res)=>{try{res.status(201).json(await db.criarTurma(req.body?.nome));}catch(e){res.status(400).json({erro:e.message});}});
app.patch('/api/turmas/:id',async(req,res)=>{try{res.json(await db.renomearTurma(req.params.id,req.body?.nome));}catch(e){res.status(400).json({erro:e.message});}});
app.delete('/api/turmas/:id',async(req,res)=>{try{res.json(await db.excluirTurma(req.params.id,req.body?.confirmarNome));}catch(e){res.status(400).json({erro:e.message});}});
app.get('/api/turmas/:id/avaliacoes',async(req,res)=>{try{res.json(await db.listarAvaliacoes(req.params.id));}catch(e){res.status(404).json({erro:e.message});}});
app.put('/api/turmas/:id/avaliacoes/:avaliacaoId',async(req,res)=>{try{res.json(await db.upsertAvaliacao(req.params.id,req.params.avaliacaoId,req.body));}catch(e){res.status(500).json({erro:e.message});}});
app.post('/api/importar-turma',async(req,res)=>{try{res.json(await db.importarTurma(req.body||{}));}catch(e){res.status(400).json({erro:e.message});}});
app.delete('/api/turmas/:id/avaliacoes/:avaliacaoId',async(req,res)=>{try{await db.removerAvaliacao(req.params.id,req.params.avaliacaoId);res.json({ok:true});}catch(e){res.status(500).json({erro:e.message});}});
app.delete('/api/turmas/:id/avaliacoes',async(req,res)=>{try{await db.limparAvaliacoes(req.params.id);res.json({ok:true});}catch(e){res.status(500).json({erro:e.message});}});
app.get('/api/backup/github',(_req,res)=>res.json(db.statusBackupGitHub()));
app.post('/api/backup/github',async(_req,res)=>{try{res.json(await db.sincronizarBackupGitHub());}catch(e){res.status(503).json({erro:e.message,...db.statusBackupGitHub()});}});

function textoCampo(valor){
  const s=String(valor||'').trim();
  return s || '(não preenchido)';
}

function assinatura(campos={}){
  const orientador = String(campos.orientador||'').trim();
  if(!orientador) return 'Prof. Rogério';
  // Extrai "Prof. <PrimeiroNome(s)>" preservando o título quando houver.
  const semTitulo = orientador.replace(/^\s*(prof\.?|professor[ao]?|dr\.?|dra\.?|me\.?|ma\.?)\s+/i,'').trim();
  const primeiro = semTitulo.split(/\s+/)[0] || orientador;
  return `Prof. ${primeiro}`;
}

function montarPrompt(campos={}){
  const rubrica = ORDEM.map(chave=>{
    const c=RUBRICA[chave];
    return `${chave} — ${c.label} (máximo ${c.max}):\n${c.niveis.map(n=>`- ${n.pontos} ponto(s): ${n.desc}`).join('\n')}`;
  }).join('\n\n');
  const nomeAssinatura = assinatura(campos);
  return `Você auxilia o professor orientador a avaliar a atividade P2 - Portfólio "Apresentando meu desafio", do TEDPRO/IFSC, composta por um ROTEIRO (PDF no modelo oficial) e um VÍDEO (máximo 2 minutos). Aplique SOMENTE a rubrica oficial. Escolha exatamente um valor previsto em cada critério. A soma máxima é ${PONTOS_MAXIMOS} pontos e a nota final é (soma/${PONTOS_MAXIMOS})×10.

REGRAS DE EVIDÊNCIA
- Diferencie o texto extraído do roteiro (PDF) das observações manuais do professor sobre o vídeo.
- O conteúdo do vídeo (fala, imagens, edição, cortes) é conhecido SOMENTE pelas observações do professor e pelos dados técnicos informados (duração, nº de cortes de cena, nº de frames). Não presuma o que foi dito ou mostrado sem essas evidências.
- roteiroModelo: pontue 1 apenas se o roteiro usa o modelo oficial do IFSC/TEDPRO (cabeçalho, identificação, Cenas 1 a 5 com colunas Voz/Imagens/Outros). Um roteiro em formato próprio recebe 0.
- Se o roteiro NÃO foi entregue, todos os critérios de ROTEIRO recebem 0 e "videoSegueRoteiro" recebe 0 (a rubrica diz "Não entregou o roteiro ou não fez o vídeo").
- videoTempo: use a duração informada. Até 2min00s = 2 pontos; de 2min01s até 2min20s = 1 ponto; acima de 2min20s = 0 ponto.
- videoSolucoes: exige DUAS ou mais ideias/soluções distintas e ligadas às tecnologias educacionais para a pontuação máxima.
- videoContextoPublico e videoMotivacao: exigem vínculo com Tecnologias para a Educação Profissional e, no caso da motivação, evidências/dados.
- Produza justificativas específicas, citando evidências concretas ou ausências.

RUBRICA OFICIAL DA P2
${rubrica}

DADOS EXTRAÍDOS E REVISTOS
Nome: ${textoCampo(campos.nome)}
Matrícula: ${textoCampo(campos.matricula)}
Orientador(a): ${textoCampo(campos.orientador)}
Conformidade com o modelo de roteiro: ${textoCampo(campos.conformidadeModelo)}
Tema/Desafio (como o aluno escreveu): ${textoCampo(campos.desafio)}
Cena 1 - Introdução / desafio (Voz): ${textoCampo(campos.cena1Voz)}
Cena 1 (Imagens/Outros): ${textoCampo(campos.cena1Img)}
Cena 2 - Como descobri (Voz): ${textoCampo(campos.cena2Voz)}
Cena 2 (Imagens/Outros): ${textoCampo(campos.cena2Img)}
Cena 3 - Contexto (Voz): ${textoCampo(campos.cena3Voz)}
Cena 3 (Imagens/Outros): ${textoCampo(campos.cena3Img)}
Cena 4 - Público (Voz): ${textoCampo(campos.cena4Voz)}
Cena 4 (Imagens/Outros): ${textoCampo(campos.cena4Img)}
Cena 5 - Conclusão / duas ideias (Voz): ${textoCampo(campos.cena5Voz)}
Cena 5 (Imagens/Outros): ${textoCampo(campos.cena5Img)}
Declaração de uso de IA: ${textoCampo(campos.iaDeclaracao)} — ${textoCampo(campos.iaDescricao)}
--- VÍDEO ---
Link do vídeo (YouTube/arquivo): ${textoCampo(campos.linkVideo)}
Duração informada: ${textoCampo(campos.videoDuracao)}
Dados técnicos (cortes/frames): ${textoCampo(campos.videoTecnico)}
Observação do professor sobre o vídeo (o que aparece/é dito, edição, imagens): ${textoCampo(campos.videoObservacao)}
Observação sobre linguagens visual/auditiva no roteiro: ${textoCampo(campos.obsLinguagens)}

Responda APENAS em JSON válido:
{"pontuacoes":{${ORDEM.map(k=>`"${k}":{"pontos":0,"justificativa":""}`).join(',')}},"alertas":[""],"feedback":"Texto pedagógico ao estudante, no formato: saudação pelo primeiro nome; um parágrafo motivacional que estimule o aluno a seguir no curso; a linha 'Tema/Assunto (conforme você escreveu):' com o tema entre aspas; o bloco 'O que \\"consertar\\":' listando SOMENTE os descritores que NÃO atingiram a pontuação máxima, cada um com seu título em negrito e um parágrafo de orientação construtiva; e um parágrafo final de avaliação geral, encorajador. Termine exatamente com: Um abraço\\n\\n${nomeAssinatura}"}`;
}

function pontoValido(chave,pontos){
  const niveis=RUBRICA[chave].niveis;
  const numero=Number(pontos);
  if(niveis.some(n=>n.pontos===numero)) return numero;
  return niveis.reduce((melhor,n)=>Math.abs(n.pontos-numero)<Math.abs(melhor-numero)?n.pontos:melhor,niveis[0].pontos);
}

function limparAvaliacao(resultado={},campos={}){
  const pontuacoes={};
  for(const chave of ORDEM){
    const item=resultado.pontuacoes?.[chave]||{};
    pontuacoes[chave]={pontos:pontoValido(chave,item.pontos),justificativa:String(item.justificativa||'').trim()};
  }
  const nomeAssinatura=assinatura(campos);
  const fimRe=new RegExp(`\\s*Um abraço[,.]?\\s*(?:Prof\\.?[^\\n]*)?\\s*$`,'i');
  let feedback=String(resultado.feedback||'').trim().replace(fimRe,'').trim();
  feedback += `\n\nUm abraço\n\n${nomeAssinatura}`;
  const soma=ORDEM.reduce((s,k)=>s+pontuacoes[k].pontos,0);
  return {pontuacoes,soma,nota:notaFinal(soma),alertas:Array.isArray(resultado.alertas)?resultado.alertas.map(String).filter(Boolean):[],feedback};
}

async function chamarOpenAI(prompt,temperatura=0.2){
  const resposta=await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',headers:{Authorization:`Bearer ${OPENAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:OPENAI_MODEL,response_format:{type:'json_object'},temperature:temperatura,messages:[{role:'user',content:prompt}]})
  });
  if(!resposta.ok){
    const detalhe=await resposta.text().catch(()=>'');
    console.error('OpenAI',resposta.status,detalhe);
    throw new Error(`A API da OpenAI recusou a análise (${resposta.status}).`);
  }
  const data=await resposta.json();
  return JSON.parse(data.choices?.[0]?.message?.content||'{}');
}

app.post('/api/avaliar',async(req,res)=>{
  const campos=req.body||{};
  if(!OPENAI_API_KEY) return res.json(avaliarLocalmente(campos));
  try{res.json(limparAvaliacao(await chamarOpenAI(montarPrompt(campos)),campos));}
  catch(e){
    const fallback=avaliarLocalmente(campos);
    fallback.modo='local-fallback';
    fallback.alertas.unshift(`A avaliação com IA não pôde ser concluída (${e.message}). A rubrica foi preenchida pela análise local conservadora; revise as notas.`);
    res.json(fallback);
  }
});

// Converte "2min01s", "2:01", "121", "121s" em segundos.
function duracaoSegundos(txt){
  const s=String(txt||'').trim();
  if(!s) return null;
  let m=s.match(/(\d+)\s*min(?:uto)?s?\s*(?:e\s*)?(\d+)?\s*s?\w*/i); if(m) return Number(m[1])*60+Number(m[2]||0);
  m=s.match(/^(\d{1,3}):(\d{2})$/); if(m) return Number(m[1])*60+Number(m[2]);
  m=s.match(/^(\d+(?:[.,]\d+)?)\s*s?$/i); if(m) return Math.round(Number(m[1].replace(',','.')));
  return null;
}

function avaliarLocalmente(c={}){
  const tem=(...xs)=>xs.every(x=>String(x||'').trim());
  const algum=(...xs)=>xs.some(x=>String(x||'').trim());
  const roteiroEntregue=algum(c.cena1Voz,c.cena2Voz,c.cena3Voz,c.cena4Voz,c.cena5Voz,c.conformidadeModelo);
  const videoEntregue=algum(c.linkVideo,c.videoDuracao,c.videoObservacao,c.videoTecnico);
  const usouModelo=/modelo (oficial|sugerido|tedpro|ifsc)|cenas?\s*1\s*a\s*5|voz\/imagens/i.test(c.conformidadeModelo||'')||tem(c.cena1Voz,c.cena1Img);
  const segs=duracaoSegundos(c.videoDuracao);
  const nVoz=[c.cena1Voz,c.cena2Voz,c.cena3Voz,c.cena4Voz,c.cena5Voz].filter(x=>String(x||'').trim()).length;
  const nImg=[c.cena1Img,c.cena2Img,c.cena3Img,c.cena4Img,c.cena5Img].filter(x=>String(x||'').trim()).length;
  const imgDetalhada=nImg>=4 && [c.cena1Img,c.cena2Img,c.cena3Img,c.cena4Img,c.cena5Img].some(x=>String(x||'').trim().length>40);
  const estruturaCompleta=tem(c.cena1Voz)&&algum(c.cena2Voz,c.cena3Voz,c.cena4Voz)&&tem(c.cena5Voz);
  const p={
    roteiroModelo:{pontos:roteiroEntregue&&usouModelo?1:0,justificativa:usouModelo?'O roteiro segue o modelo oficial (Cenas 1 a 5, colunas Voz/Imagens/Outros).':'Não foi possível confirmar o uso do modelo oficial do roteiro.'},
    roteiroLinguagens:{pontos:!roteiroEntregue?0:(nVoz>=3&&nImg>=3?3:(nVoz>=1&&nImg===0)||(nImg>=1&&nVoz===0)?1:2),justificativa:'Verificação da presença de linguagem auditiva (coluna Voz) e visual (coluna Imagens) ao longo das cenas.'},
    roteiroImagens:{pontos:!roteiroEntregue?0:(imgDetalhada?3:nImg>=3?2:nImg>=1?1:0),justificativa:imgDetalhada?'As imagens/cenas estão previstas e descritas de forma detalhada.':'As descrições de imagens existem, mas podem estar genéricas ou incompletas; revise o detalhamento.'},
    roteiroEstrutura:{pontos:!roteiroEntregue?0:(estruturaCompleta?3:(tem(c.cena1Voz)&&tem(c.cena5Voz))||(tem(c.cena1Voz)&&algum(c.cena2Voz,c.cena3Voz,c.cena4Voz))?2:1),justificativa:'Verificação de abertura (Cena 1), desenvolvimento (Cenas 2 a 4) e fechamento (Cena 5).'},
    videoSegueRoteiro:{pontos:(!roteiroEntregue||!videoEntregue)?0:(tem(c.videoObservacao)?2:1),justificativa:(!roteiroEntregue||!videoEntregue)?'Roteiro ou vídeo não entregue.':'A correspondência entre vídeo e roteiro depende da observação do professor; revise se o vídeo segue plenamente o roteiro.'},
    videoTempo:{pontos:segs===null?2:(segs<=120?2:segs<=140?1:0),justificativa:segs===null?'Duração não informada; assumido dentro do limite. Confirme o tempo do vídeo.':`Duração de ${Math.floor(segs/60)}min${String(segs%60).padStart(2,'0')}s frente ao limite de 2 minutos (tolerância de 20s).`},
    videoDesafio:{pontos:!videoEntregue?0:(tem(c.desafio)&&tem(c.videoObservacao)?3:tem(c.desafio)?2:1),justificativa:'Pontuação preliminar com base na clareza do desafio; confirme pela observação do vídeo.'},
    videoCriatividade:{pontos:!videoEntregue?0:(/anima|gráfico|mapa|corte|edi[cç]|imagem de apoio|tela|slide|print|música/i.test(c.videoObservacao||'')?2:1),justificativa:'Pontuação preliminar: avalie recursos audiovisuais, cortes e originalidade pela observação do vídeo.'},
    videoContextoPublico:{pontos:!videoEntregue?0:(tem(c.cena3Voz)&&tem(c.cena4Voz)?2:algum(c.cena3Voz,c.cena4Voz)?1:0),justificativa:'Verificação de contexto (Cena 3) e público-alvo (Cena 4) e sua relação com as tecnologias para a educação profissional.'},
    videoMotivacao:{pontos:!videoEntregue?0:(/dado|estat[íi]stic|evid[êe]nci|pesquisa|percentual|\d+%/i.test((c.cena2Voz||'')+' '+(c.videoObservacao||''))?3:tem(c.cena2Voz)?1:0),justificativa:'A motivação pontua mais quando acompanhada de evidências/dados que comprovem a relevância.'},
    videoSolucoes:{pontos:!videoEntregue?0:(/outra solu|duas (ideias|solu)|segunda (ideia|solu)|1\).*2\)/i.test(c.cena5Voz||'')?3:tem(c.cena5Voz)?2:0),justificativa:'A pontuação máxima exige duas ou mais soluções distintas ligadas às tecnologias educacionais.'}
  };
  const resultado=limparAvaliacao({pontuacoes:p,alertas:['Avaliação automática local: revise as sugestões e confirme visualmente o vídeo (duração, cenas e edição).'],feedback:'A avaliação automática local verificou o preenchimento do roteiro e os dados do vídeo. Revise as justificativas da rubrica, assista ao vídeo e ajuste a pontuação quando necessário.'},c);
  return {...resultado,modo:'local'};
}

function montarPromptExtracao({paginas=[],camposPreliminares={}}={}){
  const textoPaginas=(Array.isArray(paginas)?paginas:[]).slice(0,30).map((p,i)=>`\n===== PÁGINA ${i+1} =====\n${String(p||'').slice(0,30000)}`).join('\n');
  return `Extraia fielmente as respostas de um ROTEIRO preenchido da atividade P2 - "Apresentando meu desafio" (TEDPRO/IFSC). O modelo é uma tabela com três colunas (Voz | Imagens | Outros/OBS) dividida em CENA 1 (Introdução/O desafio), CENA 2 (Desenvolvimento/Como descobri?), CENA 3 (Contexto), CENA 4 (Público) e CENA 5 (Conclusão/Duas ideias).

OBJETIVO
Corrigir uma extração automática que pode ter misturado enunciados, cabeçalhos, rodapés e colunas da tabela. NÃO resuma, não melhore e não invente respostas. Retorne apenas o que o estudante escreveu.

REGRAS
- Exclua títulos, textos de exemplo ("Ex: ...", "Exemplo: ..."), instruções do formulário, cabeçalhos e rodapés institucionais do IFSC.
- Para cada cena, separe o que está na coluna "Voz" (fala/narração) do que está nas colunas "Imagens" e "Outros/OBS" (junte Imagens + Outros/OBS em um único campo "Img").
- "desafio": transcreva o tema/desafio exatamente como o aluno escreveu (geralmente dentro da Cena 1, iniciando por "Como podemos..." ou similar).
- "linkVideo": qualquer URL de vídeo (YouTube etc.) presente no documento.
- "iaDeclaracao": use exatamente "Utilizou IA", "Não utilizou IA" ou "" conforme a marcação da declaração de transparência; "iaDescricao": a descrição das ferramentas.
- Campo ausente ou só com texto do modelo deve ser "".

CAMPOS PRELIMINARES (podem estar errados; use apenas como pista)
${JSON.stringify(camposPreliminares)}

TEXTO EXTRAÍDO POR PÁGINA
${textoPaginas}

Responda APENAS com JSON válido, contendo todas estas chaves:
{"nome":"","matricula":"","orientador":"","desafio":"","cena1Voz":"","cena1Img":"","cena2Voz":"","cena2Img":"","cena3Voz":"","cena3Img":"","cena4Voz":"","cena4Img":"","cena5Voz":"","cena5Img":"","linkVideo":"","iaDeclaracao":"","iaDescricao":""}`;
}

function limparExtracaoSemantica(resultado={}){
  const chaves=['nome','matricula','orientador','desafio','cena1Voz','cena1Img','cena2Voz','cena2Img','cena3Voz','cena3Img','cena4Voz','cena4Img','cena5Voz','cena5Img','linkVideo','iaDeclaracao','iaDescricao'];
  const saida={};
  for(const chave of chaves) saida[chave]=String(resultado?.[chave]||'').trim();
  if(!['Utilizou IA','Não utilizou IA'].includes(saida.iaDeclaracao)) saida.iaDeclaracao='';
  return saida;
}

app.post('/api/extrair-roteiro',async(req,res)=>{
  if(precisaChave(res)) return;
  try{res.json(limparExtracaoSemantica(await chamarOpenAI(montarPromptExtracao(req.body||{}),0)));}
  catch(e){res.status(502).json({erro:e.message});}
});

app.use((err,_req,res,_next)=>res.status(500).json({erro:err.message||'Erro interno.'}));

if(require.main===module) app.listen(PORT,()=>console.log(`Avaliador P2 em http://localhost:${PORT}`));
module.exports={app,montarPrompt,montarPromptExtracao,limparExtracaoSemantica,limparAvaliacao,avaliarLocalmente,pontoValido,assinatura,duracaoSegundos};
