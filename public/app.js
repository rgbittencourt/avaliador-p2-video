const RUBRIC={
roteiroModelo:{grupo:'Roteiro',label:'ROTEIRO — utiliza o modelo sugerido',max:1,levels:[{points:0,desc:'Não utilizou o modelo sugerido.'},{points:1,desc:'Utilizou o modelo sugerido.'}]},
roteiroLinguagens:{grupo:'Roteiro',label:'ROTEIRO — explora, de forma diversificada, as linguagens visual e auditiva',max:3,levels:[{points:0,desc:'Não entregou o roteiro ou ele não apresenta linguagem visual e auditiva.'},{points:1,desc:'O roteiro explora apenas uma das linguagens (auditiva ou visual).'},{points:2,desc:'O roteiro não explora as linguagens visual e auditiva de forma diversificada.'},{points:3,desc:'O roteiro explora, de forma diversificada, cenas com linguagem auditiva e visual.'}]},
roteiroImagens:{grupo:'Roteiro',label:'ROTEIRO — apresenta imagens, representações, cenas que complementem a informação oral',max:3,levels:[{points:0,desc:'Não entregou o roteiro ou as imagens/representações/cenas não estão descritas no roteiro.'},{points:1,desc:'Há inconsistências e faltam informações acerca da descrição das imagens, representações e cenas.'},{points:2,desc:'As imagens/cenas que complementam a informação oral estão previstas, mas não claramente descritas e detalhadas.'},{points:3,desc:'As imagens/cenas que complementam a informação oral estão claramente previstas e descritas de forma detalhada.'}]},
roteiroEstrutura:{grupo:'Roteiro',label:'ROTEIRO — apresenta estrutura com abertura, desenvolvimento e fechamento',max:3,levels:[{points:0,desc:'Não entregou o roteiro ou não é possível identificar estrutura mínima de abertura, desenvolvimento e fechamento.'},{points:1,desc:'Estrutura com apenas um dos itens (abertura, desenvolvimento ou fechamento).'},{points:2,desc:'Estrutura com apenas dois itens (abertura e desenvolvimento, abertura e fechamento ou desenvolvimento e fechamento).'},{points:3,desc:'Estrutura completa: abertura, desenvolvimento e fechamento.'}]},
videoSegueRoteiro:{grupo:'Vídeo',label:'VÍDEO — o vídeo segue o roteiro elaborado (Critério 1)',max:3,levels:[{points:0,desc:'Não entregou o roteiro ou não fez o vídeo.'},{points:1,desc:'O vídeo não segue o roteiro elaborado e entregue.'},{points:2,desc:'O vídeo segue parcialmente o roteiro elaborado.'},{points:3,desc:'O vídeo segue plenamente o roteiro elaborado.'}]},
videoTempo:{grupo:'Vídeo',label:'VÍDEO — respeita o limite de 2 minutos (Critério 2)',max:2,levels:[{points:0,desc:'O vídeo não respeita o tempo limite de 2 minutos.'},{points:1,desc:'O vídeo ultrapassa em poucos segundos (não mais que 20 seg) o limite de 2 minutos.'},{points:2,desc:'O vídeo respeita o tempo limite de 2 minutos.'}]},
videoDesafio:{grupo:'Vídeo',label:'VÍDEO — apresenta um desafio claro e relevante (Critério 3)',max:3,levels:[{points:0,desc:'Não entregou o vídeo ou o vídeo não apresenta o desafio.'},{points:1,desc:'Não há clareza na apresentação do desafio; prejudica a compreensão da relevância e viabilidade. Precisa de maior acompanhamento docente.'},{points:2,desc:'O desafio foi apresentado de forma satisfatória, mas faltam informações sobre relevância e viabilidade. Precisa de acompanhamento docente.'},{points:3,desc:'Apresenta o desafio de modo claro, direto e de fácil entendimento, permitindo compreender relevância e viabilidade nas próximas etapas do Portfólio (TCC).'}]},
videoCriatividade:{grupo:'Vídeo',label:'VÍDEO — comunica o desafio de forma criativa e inovadora (Critério 4)',max:3,levels:[{points:0,desc:'Não entregou o vídeo.'},{points:1,desc:'Abordagem e recursos multimídia tradicionais / convencionais.'},{points:2,desc:'Ao menos um aspecto não convencional; poderia explorar mais criatividade, espontaneidade, humor ou estratégias diferenciadas.'},{points:3,desc:'Abordagem não convencional, autêntica, com variadas linguagens e cenas (captação e edição), espontaneidade/humor e recursos digitais (animações, mapas, gráficos, música etc.).'}]},
videoContextoPublico:{grupo:'Vídeo',label:'VÍDEO — apresenta contexto e público-alvo ligados às tecnologias para a educação profissional (Critério 5)',max:3,levels:[{points:0,desc:'Não entregou o vídeo, ou não apresenta contexto e público-alvo, ou eles não têm relação com o desafio.'},{points:1,desc:'Apresenta ao menos um dos elementos: contexto e/ou público-alvo relacionados ao desafio.'},{points:2,desc:'Contexto e/ou público-alvo relacionados ao desafio, mas com pouca aproximação com as Tecnologias para a Educação Profissional.'},{points:3,desc:'Apresenta contexto e público-alvo relacionados ao desafio, descritos com clareza, ambos com relação direta com as Tecnologias para a Educação Profissional.'}]},
videoMotivacao:{grupo:'Vídeo',label:'VÍDEO — apresenta a motivação e justifica a importância do desafio (Critério 6)',max:3,levels:[{points:0,desc:'Não entregou o vídeo ou não apresenta a motivação e a importância do desafio.'},{points:1,desc:'Apresenta a motivação, mas não as evidências/dados que fundamentam a importância.'},{points:2,desc:'Apresenta superficialmente a razão da importância; há evidências, mas poderiam ser melhor detalhadas.'},{points:3,desc:'Apresenta com clareza a importância do desafio, com evidências (dados estatísticos, vivências, depoimentos etc.).'}]},
videoSolucoes:{grupo:'Vídeo',label:'VÍDEO — sugere ideias/soluções focadas nas tecnologias e na educação profissional (Critério 7)',max:3,levels:[{points:0,desc:'Não entregou o vídeo ou não apresenta ideias/soluções para o desafio.'},{points:1,desc:'Ao menos uma ideia/solução, mas sem relação com as tecnologias para a educação profissional.'},{points:2,desc:'Ao menos uma ideia/solução focada nas tecnologias para a educação profissional.'},{points:3,desc:'Mais de uma ideia/solução, focadas nas tecnologias para a educação profissional.'}]}
};
const ORDER=Object.keys(RUBRIC);
const PONTOS_MAXIMOS=ORDER.reduce((s,k)=>s+RUBRIC[k].max,0);
const notaFinal=p=>Math.round((p/PONTOS_MAXIMOS)*10*10)/10;
const FIELD_IDS=['nome','matricula','orientador','conformidadeModelo','desafio','cena1Voz','cena1Img','cena2Voz','cena2Img','cena3Voz','cena3Img','cena4Voz','cena4Img','cena5Voz','cena5Img','iaDeclaracao','iaDescricao','obsLinguagens','linkVideo','videoDuracao','videoTecnico','videoObservacao'];
let classes=[],evaluations=[],currentEvaluationId=null,authHeader=sessionStorage.getItem('p2Auth')||'',rawPdfPages=[],pagePreviews=[],annotatedLinks=[],structuredPageRows=[],videoFrames=[],videoSeconds=null,videoObjectUrl=null,ytApiPromise=null,videoFile=null,audioMetrics=null;
const $=id=>document.getElementById(id);
const value=id=>($(id)?.value||'').trim();
const escapeHtml=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const slug=s=>String(s||'avaliacao').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80)||`avaliacao-${Date.now()}`;
const fmtDur=secs=>secs==null?'—':`${Math.floor(secs/60)}min${String(Math.round(secs%60)).padStart(2,'0')}s`;

async function api(url,options={}){
  const headers={...(options.headers||{}),...(window.SeletorIA?SeletorIA.cabecalho():{})};
  if(authHeader) headers.Authorization=authHeader;
  if(options.body && !(options.body instanceof FormData)) headers['Content-Type']='application/json';
  let response=await fetch(url,{...options,headers});
  if(response.status===401&&response.headers.get('X-Login-Necessario')){
    const login=await SeletorIA.pedirLogin('professor'); if(!login) throw new Error('Autenticação cancelada.');
    authHeader=SeletorIA.basic(login.usuario,login.senha); sessionStorage.setItem('p2Auth',authHeader);
    response=await fetch(url,{...options,headers:{...headers,...SeletorIA.cabecalho(),Authorization:authHeader}});
    if(response.status===401){authHeader='';sessionStorage.removeItem('p2Auth');SeletorIA.esquecerLogin();throw new Error('Usuário ou senha incorretos.');}
  }
  const text=await response.text(); let data; try{data=JSON.parse(text);}catch{data={erro:text||`Erro ${response.status}`};}
  if(!response.ok) throw new Error(data.erro||`Erro ${response.status}`);
  return data;
}

function renderRubric(){
  let html='',grupoAtual='';
  for(const key of ORDER){const c=RUBRIC[key];
    if(c.grupo!==grupoAtual){grupoAtual=c.grupo;html+=`<h3 style="color:var(--brand);border-bottom:1px solid var(--soft);padding-bottom:4px">${grupoAtual==='Roteiro'?'📝 Roteiro':'🎬 Vídeo'}</h3>`;}
    html+=`<fieldset><legend>${escapeHtml(c.label)} <small>(0 a ${c.max} pt${c.max>1?'s':''})</small></legend>${c.levels.map(n=>`<label class="level"><input type="radio" name="rub_${key}" value="${n.points}"><span>${escapeHtml(n.desc)}</span><span class="pts">${n.points} pt${n.points===1?'':'s'}</span></label>`).join('')}<label>Observação do avaliador</label><textarea id="obs_${key}" placeholder="Evidência, ponto forte, ausência ou orientação personalizada."></textarea></fieldset>`;
  }
  $('rubric').innerHTML=html;
  $('rubric').addEventListener('change',()=>{updateScore();generateLocalFeedback(false);});
  ORDER.forEach(k=>$(`obs_${k}`).addEventListener('input',()=>generateLocalFeedback(false)));
}
function selected(key){const el=document.querySelector(`input[name="rub_${key}"]:checked`);return el?Number(el.value):null;}
function setScore(key,points){const el=document.querySelector(`input[name="rub_${key}"][value="${points}"]`);if(el)el.checked=true;}
function totalPontos(){return ORDER.reduce((n,k)=>n+(selected(k)??0),0);}
function updateScore(){
  const pontos=totalPontos();
  $('scorePontos').textContent=pontos;
  $('scoreNota').textContent=notaFinal(pontos).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
  let rows='',grupoAtual='';
  for(const k of ORDER){const c=RUBRIC[k],p=selected(k);
    if(c.grupo!==grupoAtual){grupoAtual=c.grupo;rows+=`<tr class="group"><td colspan="2">${grupoAtual}</td></tr>`;}
    const cls=p===null?'mid':p===c.max?'max':p===0?'zero':'mid';
    const curto=c.label.replace(/^(ROTEIRO|VÍDEO)\s*—\s*/,'');
    rows+=`<tr><td>${escapeHtml(curto)}</td><td style="text-align:right"><span class="badge ${cls}">${p===null?'—':`${p}/${c.max}`}</span></td></tr>`;
  }
  $('scoreTable').innerHTML=rows;
  renderAlerts();
}
function automaticAlerts(){
  const out=[];
  if(!value('nome'))out.push('Nome não preenchido.'); if(!value('matricula'))out.push('Matrícula não preenchida.'); if(!value('orientador'))out.push('Orientador(a) não informado(a).');
  if(!value('desafio'))out.push('Tema/desafio não preenchido.');
  if(![value('cena1Voz'),value('cena2Voz'),value('cena3Voz'),value('cena4Voz'),value('cena5Voz')].some(Boolean))out.push('Nenhuma cena do roteiro foi preenchida.');
  if(!value('linkVideo')&&!value('videoDuracao'))out.push('Vídeo não informado (sem link nem duração).');
  if(!value('videoObservacao'))out.push('Observação do professor sobre o vídeo ainda não registrada — vários critérios de vídeo dependem dela.');
  if(!value('iaDeclaracao'))out.push('Declaração de transparência sobre IA não respondida.');
  if(ORDER.some(k=>selected(k)===null))out.push('Há critérios da rubrica ainda não avaliados.');
  return out;
}
function renderAlerts(){const manual=value('manualAlerts').split('\n').map(s=>s.trim()).filter(Boolean);const all=[...automaticAlerts(),...manual];$('alerts').innerHTML=all.length?all.map(a=>`<div class="alert">${escapeHtml(a)}</div>`).join(''):'<div class="ok">Nenhum alerta pendente.</div>';}
function assinatura(){const o=value('orientador');if(!o)return'Prof. Rogério';const semTitulo=o.replace(/^\s*(prof\.?|professor[ao]?|dr\.?|dra\.?|me\.?|ma\.?)\s+/i,'').trim();return`Prof. ${semTitulo.split(/\s+/)[0]||o}`;}
function generateLocalFeedback(overwrite=true){
  if(!overwrite && value('feedback'))return;
  const first=value('nome').split(/\s+/)[0]||'estudante';
  const pontos=totalPontos();
  const lines=[`Olá, ${first}!`,`Parabéns pelo empenho nesta etapa do portfólio. Seu trabalho está tomando forma e cada ajuste te aproxima de uma apresentação mais forte para o TCC. As observações abaixo são para somar, não para desanimar: siga em frente, você está no caminho certo.`];
  if(value('desafio'))lines.push(`Tema/Assunto (conforme você escreveu):\n"${value('desafio')}"`);
  const naoMax=ORDER.filter(k=>selected(k)!==null&&selected(k)<RUBRIC[k].max);
  if(naoMax.length){lines.push('O que "consertar":');for(const k of naoMax){const obs=value(`obs_${k}`);lines.push(`${RUBRIC[k].label} (${selected(k)}/${RUBRIC[k].max})\n${obs||RUBRIC[k].levels.find(n=>n.points===selected(k))?.desc||''}`);}}
  else if(ORDER.every(k=>selected(k)!==null))lines.push('Todos os critérios atingiram a pontuação máxima. Excelente trabalho!');
  lines.push(`Avaliação final: ${pontos} de 30 pontos, nota ${notaFinal(pontos).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}. Continue com essa dedicação — conte com a orientação nas próximas etapas.`);
  lines.push('Um abraço',assinatura());
  $('feedback').value=lines.join('\n\n');
}
function formData(){const d={};FIELD_IDS.forEach(id=>d[id]=value(id));return d;}

async function autoEvaluate(){
  const b=$('autoEvaluate');b.disabled=true;b.textContent='Analisando...';
  try{const r=await api('/api/avaliar',{method:'POST',body:JSON.stringify(formData())});let preenchidos=0;for(const k of ORDER){const x=r.pontuacoes?.[k];if(x&&Number.isFinite(Number(x.pontos))){setScore(k,Number(x.pontos));$(`obs_${k}`).value=x.justificativa||'';preenchidos++;}}if(preenchidos!==ORDER.length)throw new Error(`a resposta preencheu apenas ${preenchidos} de ${ORDER.length} critérios`);$('manualAlerts').value=(r.alertas||[]).join('\n');$('feedback').value=r.feedback||'';$('autoEvaluateStatus').textContent=r.modo==='local-fallback'?'A IA não concluiu a análise. A rubrica foi preenchida pela avaliação local conservadora; revise as notas e o vídeo.':r.modo==='local'?'Avaliação automática local concluída. Revise as sugestões, especialmente os critérios de vídeo.':'Avaliação com IA concluída. Revise as sugestões antes de salvar.';updateScore();}
  catch(e){$('autoEvaluateStatus').textContent=`Não foi possível avaliar: ${e.message}`;}finally{b.disabled=false;b.textContent='✨ Avaliar automaticamente';}
}

function validExternalUrl(raw){try{const url=new URL(String(raw||'').trim());return ['http:','https:'].includes(url.protocol)?url:null;}catch{return null;}}
function openVideo(){const url=validExternalUrl(value('linkVideo'));if(!url){$('videoLinkStatus').textContent='Informe um link válido começando com https://.';$('linkVideo').focus();return;}window.open(url.href,'avaliadorP2Video','popup=yes,width=1080,height=760,menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes');$('videoLinkStatus').textContent='Vídeo aberto em uma janela separada.';}

// ---------- VÍDEO: player embutido ----------
function youtubeId(u){const m=String(u||'').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/i);return m?m[1]:null;}
function vimeoId(u){const m=String(u||'').match(/vimeo\.com\/(?:video\/)?(\d{6,})/i);return m?m[1]:null;}
function driveId(u){const m=String(u||'').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([A-Za-z0-9_-]{20,})/i);return m?m[1]:null;}
function isDirectVideo(u){return /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(String(u||''));}
function limparPlayer(){$('playerContainer').innerHTML='';}
function carregarPlayerVideo(){
  const box=$('playerContainer');const raw=value('linkVideo');const url=validExternalUrl(raw);
  if(!url){$('videoLinkStatus').textContent='Informe um link válido começando com https://.';$('linkVideo').focus();return;}
  const yt=youtubeId(url.href),vm=vimeoId(url.href),dr=driveId(url.href);
  if(yt){
    box.innerHTML=`<div class="player-wrap"><div class="player-16x9"><iframe id="ytPlayer" src="https://www.youtube.com/embed/${yt}?enablejsapi=1&rel=0" title="Vídeo do aluno" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><div class="hint" style="margin-top:6px">Assista à abertura e a trechos do meio e do fim antes de pontuar. A duração é preenchida automaticamente ao iniciar a reprodução.</div></div>`;
    $('videoLinkStatus').textContent='Player do YouTube carregado aqui mesmo.';
    initYouTubeDuration(yt);
  }else if(vm){
    box.innerHTML=`<div class="player-wrap"><div class="player-16x9"><iframe src="https://player.vimeo.com/video/${vm}" title="Vídeo do aluno" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div class="hint" style="margin-top:6px">Player do Vimeo embutido. Informe a duração no campo abaixo ou carregue o MP4 para medi-la automaticamente.</div></div>`;
    $('videoLinkStatus').textContent='Player do Vimeo carregado aqui mesmo.';
  }else if(dr){
    box.innerHTML=`<div class="player-wrap"><div class="player-16x9"><iframe src="https://drive.google.com/file/d/${dr}/preview" title="Vídeo do aluno" allow="autoplay" allowfullscreen></iframe></div><div class="hint" style="margin-top:6px">Pré-visualização do Google Drive. Requer que o arquivo esteja compartilhado para visualização.</div></div>`;
    $('videoLinkStatus').textContent='Pré-visualização do Google Drive carregada.';
  }else if(isDirectVideo(url.href)){
    box.innerHTML=`<div class="player-wrap"><video class="player-local" controls preload="metadata" src="${escapeHtml(url.href)}"></video></div>`;
    $('videoLinkStatus').textContent='Player de vídeo direto carregado.';
    const v=box.querySelector('video');v.addEventListener('loadedmetadata',()=>{if(v.duration&&isFinite(v.duration))aplicarDuracao(v.duration);});
  }else{
    box.innerHTML=`<div class="videobox">Este link não pode ser embutido aqui. <div class="toolbar"><a class="btn" href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">▶ Abrir em nova aba ↗</a></div></div>`;
    $('videoLinkStatus').textContent='Link não embutível — use "Abrir em nova aba".';
  }
}
function aplicarDuracao(secs){videoSeconds=secs;$('videoDuracao').value=fmtDur(secs);$('videoDurTxt').textContent=fmtDur(secs);const t=classificaTempo(secs);$('videoTempoTxt').textContent=t.txt;$('videoTempoTxt').className=t.cls;$('videoMeta').classList.remove('hidden');setScore('videoTempo',t.pontos);updateScore();}
function loadYouTubeApi(){if(window.YT&&window.YT.Player)return Promise.resolve();if(ytApiPromise)return ytApiPromise;ytApiPromise=new Promise(res=>{const prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{if(typeof prev==='function')try{prev();}catch{}res();};const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.onerror=()=>res();document.head.appendChild(s);});return ytApiPromise;}
async function initYouTubeDuration(id){
  try{await loadYouTubeApi();if(!window.YT||!window.YT.Player)return;
    const ler=p=>{const d=p.getDuration&&p.getDuration();if(d&&isFinite(d)&&d>0){aplicarDuracao(d);$('videoLinkStatus').textContent=`Player do YouTube carregado. Duração detectada: ${fmtDur(d)}.`;}};
    new window.YT.Player('ytPlayer',{events:{onReady:e=>ler(e.target),onStateChange:e=>ler(e.target)}});
  }catch{}
}

// ---------- VÍDEO: arquivo local (duração + quadros + player) ----------
async function loadVideoFile(file){
  if(!file)return;
  videoFile=file;audioMetrics=null;$('audioMetrics').innerHTML='';
  videoFrames=[];videoSeconds=null;$('frameGallery').innerHTML='';$('frameGallery').classList.add('hidden');
  $('videoStatus').textContent='Lendo o vídeo no navegador...';
  if(videoObjectUrl){URL.revokeObjectURL(videoObjectUrl);videoObjectUrl=null;}
  const url=URL.createObjectURL(file);videoObjectUrl=url;
  // player local embutido (toca aqui mesmo)
  $('playerContainer').innerHTML=`<div class="player-wrap"><video class="player-local" controls preload="metadata" src="${url}"></video></div>`;
  const video=document.createElement('video');video.preload='metadata';video.muted=true;video.src=url;
  try{
    await new Promise((res,rej)=>{video.onloadedmetadata=res;video.onerror=()=>rej(new Error('formato de vídeo não suportado pelo navegador'));});
    videoSeconds=video.duration;
    $('videoDurTxt').textContent=fmtDur(videoSeconds);
    $('videoResTxt').textContent=`${video.videoWidth}×${video.videoHeight}`;
    $('videoDuracao').value=fmtDur(videoSeconds);
    const tempo=classificaTempo(videoSeconds);
    $('videoTempoTxt').textContent=tempo.txt;$('videoTempoTxt').className=tempo.cls;
    $('videoMeta').classList.remove('hidden');
    // extrai ~6 quadros
    const n=6,canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');
    const w=Math.min(480,video.videoWidth||480);canvas.width=w;canvas.height=Math.round(w*(video.videoHeight||270)/(video.videoWidth||480));
    for(let i=0;i<n;i++){const t=Math.max(0.1,(videoSeconds*(i+0.5))/n);await seekTo(video,t);ctx.drawImage(video,0,0,canvas.width,canvas.height);videoFrames.push({t,src:canvas.toDataURL('image/jpeg',.72)});$('videoStatus').textContent=`Extraindo quadros... ${i+1}/${n}`;}
    renderFrameGallery();
    $('videoTecnico').value=`${n} quadros extraídos do arquivo (${fmtDur(videoSeconds)}).`;
    $('videoStatus').textContent=`Vídeo processado: ${fmtDur(videoSeconds)}. ${tempo.txt}. Veja os quadros e registre nas observações o que aparece e é dito.`;
    setScore('videoTempo',tempo.pontos);updateScore();
  }catch(e){$('videoStatus').textContent=`Não foi possível ler a duração (${e.message}); o player acima ainda deve tocar. Informe a duração manualmente no campo abaixo.`;}
}
function seekTo(video,t){return new Promise((res,rej)=>{const to=setTimeout(()=>rej(new Error('tempo esgotado ao buscar quadro')),4000);video.onseeked=()=>{clearTimeout(to);res();};video.currentTime=t;});}
function classificaTempo(secs){if(secs<=120)return{txt:'Dentro do limite (2 pts)',cls:'tempo-ok',pontos:2};if(secs<=140)return{txt:'Ultrapassa em até 20s (1 pt)',cls:'tempo-warn',pontos:1};return{txt:'Ultrapassa o limite (0 pt)',cls:'tempo-bad',pontos:0};}
function renderFrameGallery(){$('frameGallery').innerHTML=videoFrames.map((f,i)=>`<button type="button" class="page-thumb" data-frame="${i}"><img src="${f.src}" alt="Quadro em ${fmtDur(f.t)}"><span>${fmtDur(f.t)} · ampliar</span></button>`).join('');}
async function analisarAudio(){
  const box=$('audioMetrics');
  if(!videoFile){box.innerHTML='<div class="hint">Carregue um arquivo de vídeo (MP4) acima para analisar o áudio. Links do YouTube/Vimeo não fornecem a trilha para análise.</div>';return;}
  const b=$('analyzeAudio');b.disabled=true;b.textContent='Analisando áudio...';box.innerHTML='<div class="hint">Decodificando a trilha de áudio...</div>';
  try{
    const arrayBuffer=await videoFile.arrayBuffer();
    const AudioCtxClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtxClass)throw new Error('Web Audio API indisponível neste navegador');
    const ctx=new AudioCtxClass();
    const audioBuffer=await ctx.decodeAudioData(arrayBuffer);
    const duracaoSeg=audioBuffer.duration;
    let somaQuadrados=0,contagem=0,pico=0,amostrasSilencio=0;const limiarSilencio=0.02;
    const passo=Math.max(1,Math.floor(audioBuffer.sampleRate/4000));
    for(let ch=0;ch<audioBuffer.numberOfChannels;ch++){const dados=audioBuffer.getChannelData(ch);for(let i=0;i<dados.length;i+=passo){const v=dados[i];somaQuadrados+=v*v;contagem++;const av=Math.abs(v);if(av>pico)pico=av;if(av<limiarSilencio)amostrasSilencio++;}}
    const rms=Math.sqrt(somaQuadrados/(contagem||1));
    const rmsDb=20*Math.log10(rms||1e-8);
    const picoDb=20*Math.log10(pico||1e-8);
    const silencioPct=(amostrasSilencio/(contagem||1))*100;
    const clipping=pico>=0.99;
    if(ctx.close)ctx.close();
    audioMetrics={duracaoSeg:Math.round(duracaoSeg),volumeMedioDb:Math.round(rmsDb*10)/10,picoDb:Math.round(picoDb*10)/10,silencioPct:Math.round(silencioPct*10)/10,clipping};
    const nivel=rmsDb>=-23&&rmsDb<=-12?'<span class="badge max">bom</span>':rmsDb<-30?'<span class="badge mid">baixo</span>':rmsDb>-9?'<span class="badge mid">alto</span>':'';
    box.innerHTML=`<table class="score-table" style="margin-top:8px"><tr><td>Volume médio (RMS)</td><td style="text-align:right">${rmsDb.toFixed(1)} dBFS ${nivel}</td></tr><tr><td>Pico</td><td style="text-align:right">${picoDb.toFixed(1)} dBFS ${clipping?'<span class="badge zero">estouro</span>':''}</td></tr><tr><td>Silêncio</td><td style="text-align:right">${silencioPct.toFixed(0)}% ${silencioPct>30?'<span class="badge mid">alto</span>':''}</td></tr></table><div class="hint">Volume médio costuma soar bem entre -23 e -12 dBFS. Silêncio acima de 30% pode indicar pausas longas ou trechos sem áudio. Estes são indicadores objetivos — não substituem ouvir o vídeo. <button type="button" class="btn secondary" id="usarAudioObs" style="margin-top:6px">Anexar às observações</button></div>`;
    $('usarAudioObs').onclick=()=>{const resumo=`Áudio: volume médio ${rmsDb.toFixed(1)} dBFS${clipping?' (com estouro/clipping)':''}, silêncio ${silencioPct.toFixed(0)}%.`;const atual=value('videoObservacao');$('videoObservacao').value=atual?`${atual}\n${resumo}`:resumo;renderAlerts();};
  }catch(e){box.innerHTML=`<div class="alert">Não foi possível analisar o áudio (${escapeHtml(e.message)}). Alguns formatos/codecs não são suportados pela Web Audio API; o player acima ainda funciona.</div>`;}
  finally{b.disabled=false;b.textContent='🔊 Analisar áudio (volume e ruído)';}
}

// ---------- ROTEIRO: PDF ----------
function normalizePdfText(s){return String(s||'').replace(/\s+fi\s+/gi,'fi').replace(/desa\s+fi\s+o/gi,'desafio');}
function cleanPdfText(s,{preserveLines=false}={}){let out=normalizePdfText(s).replace(/Especializa[cç][aã]o\s*lato\s*sensu[^\n]*/gi,' ').replace(/Instituto Federal de Santa Catarina[^\n]*/gi,' ').replace(/Rua:\s*14 de julho[^\n]*/gi,' ').replace(/Fone:\s*\(48\)[^\n]*/gi,' ').replace(/CNPJ[^\n]*/gi,' ').replace(/P2\s*-\s*PORTFÓLIO/gi,' ').replace(/APRESENTANDO MEU DESAFIO/gi,' ').replace(/SEU NOME/gi,' ').replace(/MATRÍCULA/gi,' ').replace(/^\s*selecione\s*$/gim,' ');return preserveLines?out.replace(/[ \t]+\n/g,'\n').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim():out.replace(/\s+/g,' ').trim();}
function between(text,start,end,options){const a=text.search(start);if(a<0)return'';const rest=text.slice(a);const sm=rest.match(start);const from=a+(sm?.index||0)+(sm?.[0]?.length||0);const tail=text.slice(from);const b=tail.search(end);return cleanPdfText(b<0?tail:tail.slice(0,b),options);}
function simpleMatch(text,re){const m=text.match(re);return cleanPdfText(m?.[1]||'');}
function layoutRows(content){const rows=[];for(const item of content.items){const x=item.transform[4],y=item.transform[5],width=item.width||0;let row=rows.find(r=>Math.abs(r.y-y)<2.2);if(!row){row={y,items:[]};rows.push(row);}row.items.push({x,width,text:item.str});}rows.sort((a,b)=>b.y-a.y);for(const row of rows)row.items.sort((a,b)=>a.x-b.x);return rows;}
function rowText(row){let line='',end=null;for(const item of row.items){if(end!==null){const gap=item.x-end;line+=gap>28?'\t':gap>2?' ':'';}line+=item.text;end=item.x+item.width;}return line.trimEnd();}
function stripFormPrompt(text,patterns=[]){let out=String(text||'').trim();for(const re of patterns)out=out.replace(re,'').trim();return out;}
// Separa Voz, Imagens e Outros/OBS pela posição X detectada no cabeçalho da tabela.
// Imagens e Outros/OBS são reunidos no campo combinado exibido pelo aplicativo.
function splitVozImg(startRe,endRe){
  const partes=window.P2PdfColumns?.collect(structuredPageRows,startRe,endRe)||{voice:[],images:[],notes:[]};
  const voz=cleanPdfText(partes.voice.join(' ')).replace(/^(CENA\s*\d+|O desafio|Como\s*descobri\??|Contexto|Público|Duas\s*ideias|INTRODUÇÃO|DESENVOLVIMENTO|CONCLUSÃO)\s*/gi,'').trim();
  const imagens=cleanPdfText(partes.images.join(' ')).replace(/^Ex:?\s*/i,'').trim();
  const outros=cleanPdfText(partes.notes.join(' ')).replace(/^Ex:?\s*/i,'').trim();
  const img=[imagens&&`Imagens: ${imagens}`,outros&&`Outros/OBS: ${outros}`].filter(Boolean).join('\n');
  return {voz,img};
}
function applyPreliminaryExtraction(text,fileName=''){
  let nome=simpleMatch(text,/Nome completo:\s*([^\n]+)/i);if(!nome){const m=String(fileName).match(/\(([^()]+)\)\s*\.pdf$/i);nome=m?.[1]?.trim()||'';}$('nome').value=nome;
  $('matricula').value=simpleMatch(text,/(?:Número de matrícula|Matrícula):\s*([^\n]+)/i);
  $('orientador').value=simpleMatch(text,/Orientador\(a\):\s*([^\n]+)/i);
  const c1=splitVozImg(/CENA\s*1|O desafio/i,/CENA\s*2|Como\s*descobri/i);
  const c2=splitVozImg(/CENA\s*2|Como\s*descobri/i,/CENA\s*3|Contexto/i);
  const c3=splitVozImg(/CENA\s*3|Contexto/i,/CENA\s*4|Público/i);
  const c4=splitVozImg(/CENA\s*4|Público/i,/CENA\s*5|Duas\s*ideias|CONCLUSÃO/i);
  const c5=splitVozImg(/CENA\s*5|Duas\s*ideias/i,/Declaração de transparência|LINK PARA O VÍDEO|Este trabalho teve uso de IA/i);
  $('cena1Voz').value=c1.voz;$('cena1Img').value=c1.img;$('cena2Voz').value=c2.voz;$('cena2Img').value=c2.img;$('cena3Voz').value=c3.voz;$('cena3Img').value=c3.img;$('cena4Voz').value=c4.voz;$('cena4Img').value=c4.img;$('cena5Voz').value=c5.voz;$('cena5Img').value=c5.img;
  const comoPodemos=c1.voz.toLowerCase().lastIndexOf('como podemos');$('desafio').value=comoPodemos>=0?c1.voz.slice(comoPodemos).trim():c1.voz;
  const link=annotatedLinks.find(u=>/youtu\.?be|youtube|vimeo|drive\.google/i.test(u))||simpleMatch(text,/(https?:\/\/\S+)/i);$('linkVideo').value=link||'';
  const sim=/Este trabalho teve uso de IA:\s*\(\s*[xX✓]\s*\)\s*Sim/i.test(text);const nao=/Este trabalho teve uso de IA:[^\n]*?\(\s*[xX✓]\s*\)\s*Não/i.test(text)||/\(\s*[xX✓]\s*\)\s*Não/i.test(between(text,/Este trabalho teve uso de IA/i,/$/,{preserveLines:true}));
  $('iaDeclaracao').value=sim?'Utilizou IA':nao?'Não utilizou IA':'';
  $('iaDescricao').value=stripFormPrompt(between(text,/Se sim, descreva quais ferramentas de IA você utilizou[^:]*:/i,/Instituto Federal|LINK PARA O VÍDEO|$/,{preserveLines:true}),[]);
}
function renderPageGallery(){$('pageGallery').innerHTML=pagePreviews.map((src,i)=>`<button type="button" class="page-thumb" data-page="${i}"><img src="${src}" alt="Miniatura da página ${i+1}"><span>Página ${i+1} · ampliar</span></button>`).join('');}
function openImage(title,src){$('modalTitle').textContent=title;$('modalImage').src=src;$('pageModal').classList.remove('hidden');document.body.style.overflow='hidden';}
function closeModal(){$('pageModal').classList.add('hidden');$('modalImage').src='';document.body.style.overflow='';}
async function semanticExtract(){
  if(!rawPdfPages.length)return alert('Importe o PDF do roteiro primeiro.');const b=$('semanticExtract');b.disabled=true;b.textContent='Interpretando...';$('pdfStatus').textContent='Separando semanticamente as cenas e colunas...';
  try{const result=await api('/api/extrair-roteiro',{method:'POST',body:JSON.stringify({paginas:rawPdfPages,camposPreliminares:formData()})});for(const [key,val] of Object.entries(result)){const colunaVisual=/^cena[1-5]Img$/.test(key);if($(key)&&key!=='linkVideo'&&String(val||'').trim()&&!(colunaVisual&&value(key)))$(key).value=val;}if(result.linkVideo||!value('linkVideo'))$('linkVideo').value=result.linkVideo||annotatedLinks.find(u=>/youtu\.?be|youtube|vimeo/i.test(u))||'';$('pdfStatus').textContent='Interpretação concluída. Revise as cenas e confira as páginas do roteiro.';checkDuplicate();renderAlerts();}
  catch(e){$('pdfStatus').textContent=`Não foi possível interpretar: ${e.message}. Os campos preliminares permanecem para revisão manual.`;}finally{b.disabled=false;b.textContent='Reinterpretar roteiro com IA';}
}
async function importPdf(file){
  if(!file)return;if(!window.pdfjsLib){$('pdfStatus').textContent='A biblioteca de leitura de PDF não carregou (verifique a conexão). Você ainda pode preencher as cenas manualmente.';return;}newEvaluation(false);$('pdfStatus').textContent='Lendo texto, colunas e páginas do roteiro...';rawPdfPages=[];pagePreviews=[];annotatedLinks=[];structuredPageRows=[];$('semanticActions').classList.add('hidden');$('pageGallery').classList.add('hidden');
  try{
    const bytes=new Uint8Array(await file.arrayBuffer());const pdf=await pdfjsLib.getDocument({data:bytes}).promise;
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();const rows=layoutRows(content);structuredPageRows.push(rows);rawPdfPages.push(normalizePdfText(rows.map(rowText).join('\n')));const anns=await page.getAnnotations();anns.filter(a=>a.url).forEach(a=>annotatedLinks.push(a.url));const viewport=page.getViewport({scale:1.2});const canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;pagePreviews.push(canvas.toDataURL('image/jpeg',.8));}
    const text=rawPdfPages.join('\n\n');applyPreliminaryExtraction(text,file.name);renderPageGallery();$('semanticActions').classList.remove('hidden');
    const usouModelo=/Apresentando meu desafio/i.test(text)&&/CENA\s*1/i.test(text);
    $('conformidadeModelo').value=`Roteiro em PDF com ${pdf.numPages} página(s). Modelo oficial da P2 ${usouModelo?'identificado':'NÃO confirmado'} (Cenas 1 a 5, colunas Voz/Imagens/Outros). Revise a identificação e a estrutura antes de pontuar.`;
    if(usouModelo)setScore('roteiroModelo',1);
    $('pdfStatus').textContent=`Roteiro lido: ${pdf.numPages} página(s). Iniciando interpretação semântica das cenas...`;checkDuplicate();updateScore();await semanticExtract();
  }catch(e){$('pdfStatus').textContent=`Falha ao ler o PDF: ${e.message}`;}
}

function evaluationId(){return currentEvaluationId||slug(value('matricula')||value('nome'))+'-'+Date.now();}
function snapshot(){const scores={};ORDER.forEach(k=>scores[k]={points:selected(k),observation:value(`obs_${k}`)});const pontos=totalPontos();return {id:evaluationId(),...formData(),scores,manualAlerts:value('manualAlerts'),feedback:value('feedback'),...(window.CoerenciaUI?CoerenciaUI.valores():{}),pontos,total:notaFinal(pontos),videoSegundos:videoSeconds,audioMetrics,updatedAt:new Date().toISOString()};}
function loadEvaluation(e){newEvaluation(false);currentEvaluationId=e.id;FIELD_IDS.forEach(id=>{if($(id))$(id).value=e[id]||'';});ORDER.forEach(k=>{if(e.scores?.[k]?.points!==null&&e.scores?.[k]?.points!==undefined)setScore(k,e.scores[k].points);$(`obs_${k}`).value=e.scores?.[k]?.observation||'';});$('manualAlerts').value=e.manualAlerts||'';$('feedback').value=e.feedback||'';if(window.CoerenciaUI)CoerenciaUI.definir(e);videoSeconds=e.videoSegundos??null;updateScore();window.scrollTo({top:0,behavior:'smooth'});}
function newEvaluation(confirmFirst=true){if(confirmFirst&&!confirm('Limpar todo o formulário e iniciar nova avaliação?'))return;currentEvaluationId=null;FIELD_IDS.forEach(id=>{if($(id))$(id).value='';});ORDER.forEach(k=>{document.querySelectorAll(`input[name="rub_${k}"]`).forEach(x=>x.checked=false);$(`obs_${k}`).value='';});['manualAlerts','feedback'].forEach(id=>$(id).value='');if(window.CoerenciaUI)CoerenciaUI.limpar();['autoEvaluateStatus','pdfStatus','videoStatus','videoLinkStatus'].forEach(id=>$(id).textContent='');$('pdfFile').value='';$('videoFile').value='';$('pageGallery').innerHTML='';$('pageGallery').classList.add('hidden');$('frameGallery').innerHTML='';$('frameGallery').classList.add('hidden');$('semanticActions').classList.add('hidden');$('videoMeta').classList.add('hidden');$('audioMetrics').innerHTML='';limparPlayer();if(videoObjectUrl){URL.revokeObjectURL(videoObjectUrl);videoObjectUrl=null;}rawPdfPages=[];pagePreviews=[];annotatedLinks=[];structuredPageRows=[];videoFrames=[];videoSeconds=null;videoFile=null;audioMetrics=null;closeModal();checkDuplicate();updateScore();}
function checkDuplicate(){const n=value('nome').toLowerCase(),m=value('matricula').toLowerCase();const dup=evaluations.find(e=>e.id!==currentEvaluationId&&((m&&String(e.matricula||'').toLowerCase()===m)||(n&&String(e.nome||'').toLowerCase()===n)));$('nome').classList.toggle('duplicate',!!dup);$('matricula').classList.toggle('duplicate',!!dup);$('duplicidade').classList.toggle('hidden',!dup);$('duplicidade').textContent=dup?`Já existe avaliação para ${dup.nome||'este aluno'} nesta turma.`:'';}

async function loadClasses(preferred){try{classes=await api('/api/turmas');$('classSelect').innerHTML=classes.map(c=>`<option value="${escapeHtml(c.id)}">${escapeHtml(c.nome)} (${c.quantidade||0})</option>`).join('');if(preferred&&classes.some(c=>c.id===preferred))$('classSelect').value=preferred;if(classes.length){await loadEvaluations();const ativa=classes.find(c=>c.id===$('classSelect').value);$('classNameInput').value=ativa?.nome||'';}else{evaluations=[];$('classNameInput').value='';renderRoster();$('classStatus').textContent='Crie uma turma para começar.';}}catch(e){$('classStatus').textContent=e.message;}}
async function loadEvaluations(){const id=$('classSelect').value;if(!id)return;evaluations=await api(`/api/turmas/${encodeURIComponent(id)}/avaliacoes`);renderRoster();checkDuplicate();}
function renderRoster(){$('roster').innerHTML=evaluations.length?evaluations.map(e=>`<tr><td>${escapeHtml(e.nome||'Sem nome')}</td><td>${escapeHtml(e.matricula||'—')}</td><td>${Number(e.total||0).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})}</td><td><button class="btn secondary" data-open="${escapeHtml(e.id)}">Abrir</button><button class="btn danger" data-delete="${escapeHtml(e.id)}">Excluir</button></td></tr>`).join(''):'<tr><td colspan="4">Nenhum aluno salvo.</td></tr>';}
function sameStudent(e){const m=value('matricula').toLowerCase(),n=value('nome').toLowerCase(),em=String(e?.matricula||'').trim().toLowerCase(),en=String(e?.nome||'').trim().toLowerCase();return m&&em?m===em:Boolean(n&&en&&n===en);}
async function saveEvaluation(){const cid=$('classSelect').value;if(!cid){$('classStatus').textContent='Crie ou selecione uma turma antes de salvar o aluno.';return;}if(!value('nome')&&!value('matricula')){$('classStatus').textContent='Informe o nome ou a matrícula do aluno.';return;}try{const aberto=evaluations.find(e=>e.id===currentEvaluationId);const novaIdentidade=Boolean(aberto&&!sameStudent(aberto));if(novaIdentidade)currentEvaluationId=null;const data=snapshot();await api(`/api/turmas/${encodeURIComponent(cid)}/avaliacoes/${encodeURIComponent(data.id)}`,{method:'PUT',body:JSON.stringify(data)});currentEvaluationId=data.id;await loadClasses(cid);$('classStatus').textContent=`${novaIdentidade?'Nova avaliação':'Avaliação'} salva com sucesso para ${data.nome||data.matricula}.`;}catch(e){$('classStatus').textContent=`Não foi possível salvar: ${e.message}`;}}

function download(name,content,type='application/json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href);}
function exportJson(){const c=classes.find(x=>x.id===$('classSelect').value);download(`${slug(c?.nome)}-p2.json`,JSON.stringify({version:2,turma:c,avaliacoes:evaluations},null,2));}
function csvCell(v){return `"${String(v??'').replace(/"/g,'""')}"`;}
function exportCsv(){const header=['Nome','Matrícula','Pontos','Nota',...ORDER.map(k=>RUBRIC[k].label),'Alertas'];const rows=evaluations.map(e=>[e.nome,e.matricula,e.pontos??'',e.total,...ORDER.map(k=>e.scores?.[k]?.points??''),e.manualAlerts]);download('avaliacoes-p2.csv',[header,...rows].map(r=>r.map(csvCell).join(';')).join('\n'),'text/csv;charset=utf-8');}

function executiveReport(){
  if(!evaluations.length)return alert('A turma não possui avaliações.');
  const turma=classes.find(x=>x.id===$('classSelect').value);
  const temNota=v=>v!==null&&v!==undefined&&v!==''&&Number.isFinite(Number(v));
  const notas=evaluations.map(e=>Number(e.total)).filter(Number.isFinite);
  const media=notas.reduce((a,b)=>a+b,0)/(notas.length||1);
  const ordenadas=[...notas].sort((a,b)=>a-b);const meio=Math.floor(ordenadas.length/2);
  const mediana=ordenadas.length%2?ordenadas[meio]:(ordenadas[meio-1]+ordenadas[meio])/2;
  const minimo=Math.min(...notas),maximo=Math.max(...notas);
  const faixas=[{label:'Abaixo de 6,0',count:notas.filter(n=>n<6).length,color:'#b6473f'},{label:'6,0 a 7,9',count:notas.filter(n=>n>=6&&n<8).length,color:'#d39a2c'},{label:'8,0 a 8,9',count:notas.filter(n=>n>=8&&n<9).length,color:'#4f94a0'},{label:'9,0 a 10,0',count:notas.filter(n=>n>=9).length,color:'#28735e'}];
  const criterios=ORDER.map(k=>{const valores=evaluations.map(e=>e.scores?.[k]?.points).filter(temNota).map(Number);const mc=valores.reduce((a,b)=>a+b,0)/(valores.length||1);return {k,grupo:RUBRIC[k].grupo,label:RUBRIC[k].label.replace(/^(ROTEIRO|VÍDEO)\s*—\s*/,''),max:RUBRIC[k].max,media:mc,pct:Math.round((mc/RUBRIC[k].max)*100),respondidos:valores.length};});
  const completos=evaluations.filter(e=>ORDER.every(k=>temNota(e.scores?.[k]?.points))).length;
  const pendentes=evaluations.length-completos;const conclusao=Math.round((completos/evaluations.length)*100);
  const foraTempo=evaluations.filter(e=>temNota(e.scores?.videoTempo?.points)&&Number(e.scores.videoTempo.points)<2).length;
  const iaDecl=evaluations.filter(e=>String(e.iaDeclaracao||'').startsWith('Utilizou')).length;
  const alertas=evaluations.flatMap(e=>String(e.manualAlerts||'').split('\n')).map(s=>s.trim()).filter(Boolean);
  const alertasPrincipais=Object.entries(alertas.reduce((acc,a)=>(acc[a]=(acc[a]||0)+1,acc),{})).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const ranking=[...criterios].sort((a,b)=>b.pct-a.pct);const forte=ranking[0],fragil=[...ranking].reverse()[0];
  const pct=n=>Math.round((n/evaluations.length)*100);
  const diagnostico=media>=9?'desempenho geral excelente':media>=8?'desempenho geral muito bom':media>=6?'desempenho geral satisfatório, com oportunidades claras de consolidação':'desempenho geral abaixo do esperado, indicando necessidade de intervenção pedagógica';
  const orientacoes={roteiroModelo:'Reforçar o uso do modelo oficial do roteiro (Cenas 1 a 5, colunas Voz/Imagens/Outros) antes da gravação.',roteiroLinguagens:'Orientar a diversificar a coluna de imagens, evitando repetir “câmera no narrador” em todas as cenas.',roteiroImagens:'Pedir descrições detalhadas e específicas das imagens de cada cena, conectadas à fala.',roteiroEstrutura:'Garantir abertura, desenvolvimento e fechamento nítidos no roteiro.',videoSegueRoteiro:'Alinhar vídeo e roteiro: executar na gravação os recursos visuais planejados.',videoTempo:'Treinar a síntese da fala para respeitar o limite de 2 minutos.',videoDesafio:'Formular o desafio como pergunta objetiva “Como podemos...?”.',videoCriatividade:'Incentivar cortes, imagens de apoio, textos na tela e recursos digitais no vídeo.',videoContextoPublico:'Caracterizar contexto e público-alvo e ligá-los às tecnologias para a educação profissional.',videoMotivacao:'Fundamentar a motivação com dados/evidências da relevância do desafio.',videoSolucoes:'Apresentar pelo menos duas soluções distintas focadas em tecnologia educacional.'};
  const recomendacoes=[orientacoes[fragil.k]];
  if(foraTempo)recomendacoes.push(`Reforçar o limite de 2 minutos: ${foraTempo} vídeo(s) ultrapassaram o tempo.`);
  const criterioPct=k=>criterios.find(c=>c.k===k).pct;
  if(criterioPct('videoCriatividade')<80)recomendacoes.push(orientacoes.videoCriatividade);
  if(criterioPct('videoSolucoes')<80)recomendacoes.push(orientacoes.videoSolucoes);
  if(pendentes)recomendacoes.push(`Concluir os critérios pendentes em ${pendentes} avaliação${pendentes===1?'':'ões'} antes de decisões definitivas.`);
  const unicas=[...new Set(recomendacoes)].slice(0,5);
  const data=new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});
  const linhas=[...evaluations].sort((a,b)=>Number(b.total||0)-Number(a.total||0)||String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'));
  const grupoRows=g=>criterios.filter(c=>c.grupo===g).map(c=>`<div class="criterion"><div class="criterion-name">${escapeHtml(c.label)}</div><div class="track"><div class="fill" style="width:${Math.max(0,Math.min(100,c.pct))}%"></div></div><b>${c.pct}%<small>${c.media.toFixed(2).replace('.',',')} / ${c.max}</small></b></div>`).join('');
  const html=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relatório Executivo · P2 Roteiro e Vídeo</title><style>
  :root{--navy:#123f48;--teal:#217684;--teal2:#4d9aa5;--pale:#e8f3f4;--ink:#20343a;--muted:#61747a;--line:#d6e1e3;--gold:#d89b2b;--red:#b6473f;--green:#28735e}*{box-sizing:border-box}body{margin:0;background:#edf2f3;color:var(--ink);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}.page{width:min(1000px,calc(100% - 30px));margin:28px auto;background:#fff;box-shadow:0 12px 42px #173b4526}.hero{position:relative;overflow:hidden;padding:46px 54px 38px;background:linear-gradient(125deg,#123f48 0%,#1b6571 70%,#278291 100%);color:#fff}.hero:after{content:"";position:absolute;width:300px;height:300px;border:60px solid #ffffff12;border-radius:50%;right:-105px;top:-135px}.brand{display:flex;align-items:center;gap:18px;position:relative;z-index:1}.brand img{width:76px;height:76px;object-fit:contain;filter:drop-shadow(0 5px 10px #0b293555)}.eyebrow{text-transform:uppercase;letter-spacing:.15em;font-weight:800;font-size:11px;color:#bce3e8}.hero h1{font-size:34px;line-height:1.12;margin:5px 0 8px}.hero p{margin:0;color:#d9eef1}.hero-meta{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:22px;margin-top:27px;padding-top:18px;border-top:1px solid #ffffff38;font-size:13px}.content{padding:40px 54px 55px}.section{margin:0 0 38px}.section h2{margin:0 0 17px;color:var(--navy);font-size:21px;display:flex;gap:10px;align-items:center}.section h2 span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--pale);color:var(--teal);font-size:13px}.lead{font-size:16px;margin:0}.summary{padding:22px 24px;background:linear-gradient(90deg,#eaf5f5,#f7faf9);border-left:5px solid var(--teal);border-radius:0 10px 10px 0}.summary strong{color:var(--navy)}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.kpi{border:1px solid var(--line);border-radius:12px;padding:18px;background:#fff}.kpi small{display:block;color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.06em;font-weight:700}.kpi strong{display:block;color:var(--teal);font-size:29px;line-height:1.15;margin:6px 0}.kpi em{font-style:normal;color:var(--muted);font-size:12px}.grouptitle{font-size:13px;font-weight:800;color:var(--teal);text-transform:uppercase;letter-spacing:.05em;margin:16px 0 6px}.criterion{display:grid;grid-template-columns:minmax(230px,1.45fr) 2fr 70px;gap:14px;align-items:center;padding:9px 0}.criterion-name{font-size:13px}.track{height:12px;background:#e7edef;border-radius:8px;overflow:hidden}.fill{height:100%;border-radius:8px;background:linear-gradient(90deg,var(--teal),var(--teal2))}.criterion b{text-align:right;color:var(--navy);font-size:13px}.criterion b small{display:block;color:var(--muted);font-weight:500}.split{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{border:1px solid var(--line);border-radius:12px;padding:20px}.card h3{margin:0 0 13px;color:var(--navy);font-size:16px}.bands{display:flex;align-items:flex-end;height:155px;gap:12px;padding-top:12px}.band{flex:1;text-align:center;color:var(--muted);font-size:10px}.column{min-height:5px;border-radius:7px 7px 0 0;margin-bottom:6px}.band b{display:block;color:var(--navy);font-size:17px}.fact{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid #e8edef}.fact:last-child{border:0}.fact strong{color:var(--navy)}.callout{padding:18px 20px;border-radius:10px;background:#fff7e6;border-left:5px solid var(--gold)}.callout p{margin:5px 0 0}.alerts{margin:0;padding-left:20px}.alerts li{margin:8px 0}.alerts b{color:var(--red)}.recommendations{counter-reset:item;list-style:none;padding:0;margin:0}.recommendations li{counter-increment:item;position:relative;padding:0 0 15px 44px;min-height:34px}.recommendations li:before{content:counter(item);position:absolute;left:0;top:0;display:grid;place-items:center;width:29px;height:29px;background:var(--navy);color:#fff;border-radius:50%;font-weight:800;font-size:12px}table{border-collapse:collapse;width:100%;font-size:12px}thead{display:table-header-group}th{background:var(--navy);color:#fff;text-align:left;padding:10px}td{border-bottom:1px solid var(--line);padding:9px 10px}tbody tr:nth-child(even){background:#f7f9f9}.score{font-weight:800;color:var(--navy)}.status{display:inline-block;border-radius:12px;padding:2px 8px;font-size:10px;font-weight:700}.ok{background:#dff1e9;color:#1f644f}.warn{background:#fff0d0;color:#875e0f}.method{color:var(--muted);font-size:12px;border-top:1px solid var(--line);padding-top:18px}.print{position:fixed;right:25px;bottom:25px;border:0;border-radius:24px;background:var(--gold);color:#172e34;padding:13px 20px;font-weight:800;box-shadow:0 5px 18px #0003;cursor:pointer}@media(max-width:720px){.hero,.content{padding-left:24px;padding-right:24px}.hero h1{font-size:27px}.kpis{grid-template-columns:1fr 1fr}.split{grid-template-columns:1fr}.criterion{grid-template-columns:1fr 75px}.criterion .track{grid-column:1/-1;grid-row:2}.brand img{width:60px;height:60px}}@media print{@page{size:A4;margin:13mm}body{background:#fff;font-size:11px}.page{width:auto;margin:0;box-shadow:none}.hero{padding:25px 30px 22px;-webkit-print-color-adjust:exact;print-color-adjust:exact}.hero h1{font-size:25px}.brand img{width:54px;height:54px}.content{padding:25px 30px}.section{margin-bottom:24px}.kpi,.card,.summary,.callout,.criterion,.recommendations li,tr{break-inside:avoid}.bands{height:115px}.print{display:none}.section.page-break{break-before:page}table{font-size:9px}th,td{padding:6px}}
  </style></head><body><main class="page"><header class="hero"><div class="brand"><img src="${location.origin}/assets/logo-ai-agent.png" alt="Claquete e roteiro"><div><div class="eyebrow">Especialização em Tecnologias para Educação Profissional e Tecnológica</div><h1>Relatório Executivo · P2 Roteiro e Vídeo</h1><p>Apresentando meu desafio — avaliação do roteiro e do vídeo</p></div></div><div class="hero-meta"><span><b>Turma:</b> ${escapeHtml(turma?.nome||'Não identificada')}</span><span><b>Emissão:</b> ${data}</span><span><b>Avaliações:</b> ${evaluations.length}</span></div></header><div class="content">
  <section class="section"><h2><span>1</span> Síntese executiva</h2><div class="summary"><p class="lead">A turma apresentou <strong>${diagnostico}</strong>, com média <strong>${media.toFixed(1).replace('.',',')}</strong> e mediana <strong>${mediana.toFixed(1).replace('.',',')}</strong>. As notas variaram de <strong>${minimo.toFixed(1).replace('.',',')}</strong> a <strong>${maximo.toFixed(1).replace('.',',')}</strong>.</p><p>O melhor resultado proporcional ocorreu em <strong>${escapeHtml(forte.label)}</strong> (${forte.pct}%), enquanto <strong>${escapeHtml(fragil.label)}</strong> (${fragil.pct}%) demanda maior atenção. ${foraTempo} vídeo(s) não respeitaram o limite de 2 minutos.</p></div></section>
  <section class="section"><h2><span>2</span> Indicadores principais</h2><div class="kpis"><div class="kpi"><small>Avaliações</small><strong>${evaluations.length}</strong><em>registros na turma</em></div><div class="kpi"><small>Média geral</small><strong>${media.toFixed(1).replace('.',',')}</strong><em>escala de 0 a 10</em></div><div class="kpi"><small>Avaliações completas</small><strong>${conclusao}%</strong><em>${completos} completas · ${pendentes} pendentes</em></div><div class="kpi"><small>Dentro do tempo</small><strong>${pct(evaluations.length-foraTempo)}%</strong><em>${evaluations.length-foraTempo} vídeo(s) ≤ 2 min</em></div></div></section>
  <section class="section"><h2><span>3</span> Desempenho por critério</h2><div class="grouptitle">📝 Roteiro</div>${grupoRows('Roteiro')}<div class="grouptitle">🎬 Vídeo</div>${grupoRows('Vídeo')}</section>
  <section class="section"><h2><span>4</span> Distribuição e contexto</h2><div class="split"><div class="card"><h3>Distribuição das notas</h3><div class="bands">${faixas.map(f=>`<div class="band"><div class="column" style="height:${Math.max(5,pct(f.count))}%;background:${f.color}"></div><b>${f.count}</b>${f.label}</div>`).join('')}</div></div><div class="card"><h3>Leitura complementar</h3><div class="fact"><span>Mediana da turma</span><strong>${mediana.toFixed(1).replace('.',',')}</strong></div><div class="fact"><span>Amplitude das notas</span><strong>${(maximo-minimo).toFixed(1).replace('.',',')} pontos</strong></div><div class="fact"><span>Vídeos fora do tempo</span><strong>${foraTempo}</strong></div><div class="fact"><span>Uso declarado de IA</span><strong>${iaDecl} (${pct(iaDecl)}%)</strong></div></div></div></section>
  <section class="section"><h2><span>5</span> Padrões e alertas</h2><div class="callout"><strong>Leitura pedagógica</strong><p>Os indicadores apoiam a visão de conjunto, mas não substituem a revisão docente do roteiro, do vídeo (duração, cenas e edição) e da coerência entre o que foi planejado e o que foi apresentado.</p></div>${alertasPrincipais.length?`<h3 style="margin-top:20px">Alertas recorrentes registrados</h3><ul class="alerts">${alertasPrincipais.map(([a,n])=>`<li>${escapeHtml(a)} <b>${n} ocorrência${n===1?'':'s'}</b></li>`).join('')}</ul>`:'<p style="color:var(--muted)">Não há alertas recorrentes registrados nesta turma.</p>'}</section>
  <section class="section"><h2><span>6</span> Recomendações para a próxima oferta</h2><ol class="recommendations">${unicas.map(r=>`<li>${escapeHtml(r)}</li>`).join('')}</ol></section>
  <section class="section page-break"><h2><span>7</span> Resultados individuais</h2><table><thead><tr><th>#</th><th>Aluno</th><th>Matrícula</th><th>Nota</th><th>Tempo</th><th>Avaliação</th></tr></thead><tbody>${linhas.map((e,i)=>{const completo=ORDER.every(k=>temNota(e.scores?.[k]?.points));const tp=e.scores?.videoTempo?.points;const tpCls=tp===2?'ok':'warn';const tpTxt=tp===2?'≤ 2 min':tp===1?'+ até 20s':tp===0?'Excedeu':'—';return `<tr><td>${i+1}</td><td>${escapeHtml(e.nome||'Sem nome')}</td><td>${escapeHtml(e.matricula||'—')}</td><td class="score">${Number(e.total||0).toFixed(1).replace('.',',')}</td><td><span class="status ${tpCls}">${tpTxt}</span></td><td><span class="status ${completo?'ok':'warn'}">${completo?'Completa':'Pendente'}</span></td></tr>`}).join('')}</tbody></table></section>
  <section class="section"><h2><span>8</span> Nota metodológica</h2><p class="method">Este relatório consolida as avaliações salvas no aplicativo na data de emissão. Os percentuais por critério representam a média obtida em relação à pontuação máxima do respectivo critério (soma total de 30 pontos; nota = pontos ÷ 30 × 10). A interpretação pedagógica deve considerar o tamanho da turma, a completude das avaliações e a verificação qualitativa do roteiro e do vídeo.</p></section>
  </div></main><button class="print" onclick="window.print()">Imprimir / salvar em PDF</button></body></html>`;
  const w=window.open('','_blank');
  if(!w)return alert('O navegador bloqueou a abertura do relatório. Permita janelas pop-up e tente novamente.');
  w.document.open();w.document.write(html);w.document.close();
}

async function importClassJson(file){
  if(!file)return;const status=$('importStatus');status.textContent='Lendo e importando o arquivo...';
  try{
    const obj=JSON.parse(await file.text());
    const items=Array.isArray(obj)?obj:(Array.isArray(obj.avaliacoes)?obj.avaliacoes:[obj]);
    if(!items.length)throw new Error('O arquivo não contém avaliações.');
    const turma=obj.turma?.nome?obj.turma:classes.find(c=>c.id===$('classSelect').value);
    if(!turma)throw new Error('Este JSON não informa a turma. Crie ou selecione uma turma antes de importá-lo.');
    const resultado=await api('/api/importar-turma',{method:'POST',body:JSON.stringify({turma,avaliacoes:items})});
    await loadClasses(resultado.id);
    status.textContent=`Importação concluída: ${resultado.inseridas} nova(s), ${resultado.atualizadas} atualizada(s). Turma ${resultado.nome}: ${resultado.quantidade} avaliação(ões).`;
    $('classStatus').textContent=`Turma ${resultado.nome} carregada com ${resultado.quantidade} avaliação(ões).`;
  }catch(err){status.textContent=`Não foi possível importar: ${err.message}`;}
  finally{$('importJson').value='';}
}

function bind(){
  $('pdfFile').addEventListener('change',e=>importPdf(e.target.files[0]));
  $('videoFile').addEventListener('change',e=>loadVideoFile(e.target.files[0]));
  FIELD_IDS.forEach(id=>{$(id)?.addEventListener('input',()=>{if(id==='nome'||id==='matricula')checkDuplicate();if(id==='linkVideo')$('videoLinkStatus').textContent='';renderAlerts();});});
  $('iaDeclaracao').addEventListener('change',renderAlerts);$('manualAlerts').addEventListener('input',renderAlerts);
  $('watchVideo').onclick=carregarPlayerVideo;$('openVideo').onclick=openVideo;$('copyVideoLink').onclick=async()=>{const url=validExternalUrl(value('linkVideo'));if(!url)return $('videoLinkStatus').textContent='Informe um link válido antes de copiar.';await navigator.clipboard.writeText(url.href);$('videoLinkStatus').textContent='Link copiado.';};
  $('semanticExtract').onclick=semanticExtract;$('togglePages').onclick=()=>{$('pageGallery').classList.toggle('hidden');$('togglePages').textContent=$('pageGallery').classList.contains('hidden')?'Ver páginas do roteiro':'Ocultar páginas';};
  $('toggleFrames').onclick=()=>{$('frameGallery').classList.toggle('hidden');$('toggleFrames').textContent=$('frameGallery').classList.contains('hidden')?'Ver quadros extraídos':'Ocultar quadros';};
  $('analyzeAudio').onclick=analisarAudio;
  $('pageGallery').onclick=e=>{const b=e.target.closest('[data-page]');if(b)openImage(`Página ${Number(b.dataset.page)+1} do roteiro`,pagePreviews[Number(b.dataset.page)]);};
  $('frameGallery').onclick=e=>{const b=e.target.closest('[data-frame]');if(b){const f=videoFrames[Number(b.dataset.frame)];openImage(`Quadro do vídeo em ${fmtDur(f.t)}`,f.src);}};
  $('closeModal').onclick=closeModal;$('pageModal').onclick=e=>{if(e.target===$('pageModal'))closeModal();};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  $('autoEvaluate').onclick=autoEvaluate;$('refreshFeedback').onclick=()=>generateLocalFeedback(true);$('copyFeedback').onclick=()=>navigator.clipboard.writeText(value('feedback'));$('clearRubric').onclick=()=>{ORDER.forEach(k=>{document.querySelectorAll(`input[name="rub_${k}"]`).forEach(x=>x.checked=false);$(`obs_${k}`).value='';});updateScore();};
  $('classSelect').onchange=async()=>{await loadEvaluations();const c=classes.find(x=>x.id===$('classSelect').value);$('classNameInput').value=c?.nome||'';$('classStatus').textContent='';};
  $('refreshClasses').onclick=async()=>{const atual=$('classSelect').value;$('classStatus').textContent='Atualizando turmas...';await loadClasses(atual);$('classStatus').textContent=classes.length?`${classes.length} turma(s) carregada(s).`:'Nenhuma turma encontrada.';};
  $('newClass').onclick=async()=>{const n=value('classNameInput');if(!n){$('classStatus').textContent='Digite o nome da nova turma no campo acima.';return;}try{const c=await api('/api/turmas',{method:'POST',body:JSON.stringify({nome:n})});await loadClasses(c.id);$('classNameInput').value=c.nome;$('classStatus').textContent='Turma criada com sucesso.';}catch(e){$('classStatus').textContent=`Não foi possível criar a turma: ${e.message}`;}};
  $('renameClass').onclick=async()=>{const c=classes.find(x=>x.id===$('classSelect').value),n=value('classNameInput');if(!c){$('classStatus').textContent='Selecione uma turma.';return;}if(!n){$('classStatus').textContent='Digite o novo nome da turma.';return;}try{await api(`/api/turmas/${encodeURIComponent(c.id)}`,{method:'PATCH',body:JSON.stringify({nome:n})});await loadClasses(c.id);$('classStatus').textContent='Turma renomeada com sucesso.';}catch(e){$('classStatus').textContent=`Não foi possível renomear: ${e.message}`;}};
  $('deleteClass').onclick=async()=>{const c=classes.find(x=>x.id===$('classSelect').value),confirmName=value('classNameInput');if(!c){$('classStatus').textContent='Selecione uma turma.';return;}if(confirmName!==c.nome){$('classStatus').textContent=`Para excluir, digite exatamente: ${c.nome}`;return;}try{await api(`/api/turmas/${encodeURIComponent(c.id)}`,{method:'DELETE',body:JSON.stringify({confirmarNome:confirmName})});newEvaluation(false);$('classNameInput').value='';await loadClasses();$('classStatus').textContent='Turma excluída.';}catch(e){$('classStatus').textContent=`Não foi possível excluir: ${e.message}`;}};
  $('saveEvaluation').onclick=saveEvaluation;$('newEvaluation').onclick=()=>newEvaluation(true);$('exportJson').onclick=exportJson;$('exportCsv').onclick=exportCsv;$('executiveReport').onclick=executiveReport;
  $('githubBackup').onclick=async()=>{try{const r=await api('/api/backup/github',{method:'POST'});$('classStatus').textContent=r.ultimoErro?`Falha: ${r.ultimoErro}`:`Cópia no GitHub atualizada em ${new Date(r.ultimaSincronizacao).toLocaleString('pt-BR')}.`;}catch(e){$('classStatus').textContent=e.message;}};
  $('clearClass').onclick=async()=>{const c=classes.find(x=>x.id===$('classSelect').value);if(c&&confirm(`Apagar TODAS as avaliações de ${c.nome}?`)){await api(`/api/turmas/${encodeURIComponent(c.id)}/avaliacoes`,{method:'DELETE'});newEvaluation(false);await loadClasses(c.id);}};
  $('roster').onclick=async e=>{const open=e.target.dataset.open,del=e.target.dataset.delete;if(open)loadEvaluation(evaluations.find(x=>x.id===open));if(del&&confirm('Excluir esta avaliação?')){await api(`/api/turmas/${encodeURIComponent($('classSelect').value)}/avaliacoes/${encodeURIComponent(del)}`,{method:'DELETE'});await loadClasses($('classSelect').value);}};
  $('chooseImportJson').onclick=()=>$('importJson').click();$('importJson').onchange=e=>importClassJson(e.target.files[0]);
}

document.addEventListener('DOMContentLoaded',async()=>{try{if(window.pdfjsLib)pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}catch{}renderRubric();bind();updateScore();try{const q=new URLSearchParams(location.search),tq=q.get('turma'),aq=q.get('avaliacao');await loadClasses(tq||undefined);if(aq){const e=evaluations.find(x=>x.id===aq);if(e){loadEvaluation(e);$('classStatus').textContent='Avaliação aberta pelo link do Fechamento do Portfólio.';}else $('classStatus').textContent='A avaliação indicada no link não foi encontrada nesta turma.';}}catch{}if('serviceWorker'in navigator)navigator.serviceWorker.register('/service-worker.js').catch(()=>{});});
// Bloco de coerência (complementar), logo abaixo do Feedback gerado.
if(window.CoerenciaUI)CoerenciaUI.montar({depoisDe:$('feedback').closest('section'),tagCard:'section',coletar:()=>formData(),api,
  titulo:'Coerência do roteiro e do vídeo',produto:'do roteiro e do vídeo',
  explicacao:'Uma única análise semântica relaciona o <b>roteiro</b> (cenas, voz e imagens) e o <b>vídeo</b> com o <b>desafio</b> do estudante e o <b>público</b> implicado nele: o roteiro apresenta o desafio com clareza, as linguagens dialogam com esse público e o vídeo ajudaria esse público a compreender o problema e a se envolver com ele? Ela não altera a rubrica, a nota nem o feedback da avaliação.',
  dicaAnalise:'Parecer técnico ao professor sobre a coerência do roteiro e do vídeo com o desafio e o público. Totalmente editável.',
  dicaFeedback:'Mensagem pedagógica ao estudante sobre essa coerência. Totalmente editável.'});
