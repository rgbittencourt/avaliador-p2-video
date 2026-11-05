// Rubrica oficial da P2 - Portfólio "Apresentando meu desafio" (TEDPRO/IFSC)
// 4 critérios de ROTEIRO + 7 critérios de VÍDEO. Soma máxima: 30 pontos.
// Nota final na escala 0 a 10 = (soma dos pontos obtidos / 30) * 10.
const RUBRICA = {
  // ---------------- ROTEIRO ----------------
  roteiroModelo: {
    grupo: 'Roteiro', label: 'ROTEIRO — utiliza o modelo sugerido', max: 1,
    niveis: [
      {pontos:0, desc:'Não utilizou o modelo sugerido.'},
      {pontos:1, desc:'Utilizou o modelo sugerido.'}
    ]
  },
  roteiroLinguagens: {
    grupo: 'Roteiro', label: 'ROTEIRO — explora, de forma diversificada, as linguagens visual e auditiva', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o roteiro ou ele não apresenta linguagem visual e auditiva.'},
      {pontos:1, desc:'O roteiro explora apenas uma das linguagens (auditiva ou visual).'},
      {pontos:2, desc:'O roteiro não explora as linguagens visual e auditiva de forma diversificada.'},
      {pontos:3, desc:'O roteiro explora, de forma diversificada, cenas com linguagem auditiva e visual.'}
    ]
  },
  roteiroImagens: {
    grupo: 'Roteiro', label: 'ROTEIRO — apresenta imagens, representações, cenas que complementem a informação oral', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o roteiro ou as imagens, representações e cenas não estão descritas no roteiro.'},
      {pontos:1, desc:'Há inconsistências e faltam informações acerca da descrição das imagens, representações e cenas no roteiro.'},
      {pontos:2, desc:'As imagens, representações, cenas que complementam a informação oral estão previstas no roteiro, mas não estão claramente descritas e detalhadas.'},
      {pontos:3, desc:'As imagens, representações, cenas que complementam a informação oral estão claramente previstas no roteiro e estão descritas de forma detalhada.'}
    ]
  },
  roteiroEstrutura: {
    grupo: 'Roteiro', label: 'ROTEIRO — apresenta uma estrutura com: 1- abertura, 2- desenvolvimento e 3- fechamento', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o roteiro ou não é possível identificar uma estrutura mínima de abertura, desenvolvimento e fechamento.'},
      {pontos:1, desc:'O roteiro apresenta estrutura com apenas um dos itens (abertura ou desenvolvimento ou fechamento).'},
      {pontos:2, desc:'O roteiro apresenta estrutura com apenas dois itens (abertura e desenvolvimento, ou abertura e fechamento, ou desenvolvimento e fechamento).'},
      {pontos:3, desc:'O roteiro apresenta de forma clara uma estrutura completa: abertura, desenvolvimento e fechamento.'}
    ]
  },
  // ---------------- VÍDEO ----------------
  videoSegueRoteiro: {
    grupo: 'Vídeo', label: 'VÍDEO — o vídeo segue o roteiro elaborado (Critério 1)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o roteiro ou não fez o vídeo.'},
      {pontos:1, desc:'O vídeo não segue o roteiro elaborado e entregue na atividade.'},
      {pontos:2, desc:'O vídeo segue parcialmente o roteiro elaborado.'},
      {pontos:3, desc:'O vídeo segue plenamente o roteiro elaborado.'}
    ]
  },
  videoTempo: {
    grupo: 'Vídeo', label: 'VÍDEO — respeita o limite de 2 minutos (Critério 2)', max: 2,
    niveis: [
      {pontos:0, desc:'O vídeo não respeita o tempo limite de 2 minutos.'},
      {pontos:1, desc:'O vídeo ultrapassa em poucos segundos (não mais que 20 seg) o tempo limite de 2 minutos.'},
      {pontos:2, desc:'O vídeo elaborado respeita o tempo limite de 2 minutos.'}
    ]
  },
  videoDesafio: {
    grupo: 'Vídeo', label: 'VÍDEO — apresenta um desafio claro e relevante (Critério 3)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o vídeo ou o vídeo não apresenta o desafio.'},
      {pontos:1, desc:'Não há clareza na apresentação do desafio, fato que prejudica a compreensão da relevância e viabilidade de resolução durante o curso. Precisa de maior acompanhamento docente em sua construção.'},
      {pontos:2, desc:'O desafio foi apresentado de forma satisfatória, porém faltam informações que permitam compreender a relevância e viabilidade de resolução durante o curso. Precisa de acompanhamento docente em sua execução.'},
      {pontos:3, desc:'Vídeo apresenta o desafio de modo claro, direto e de fácil entendimento, o que permite compreender a relevância e viabilidade de resolução durante as próximas etapas do Portfólio (TCC).'}
    ]
  },
  videoCriatividade: {
    grupo: 'Vídeo', label: 'VÍDEO — comunica o desafio de forma criativa e inovadora (Critério 4)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o vídeo.'},
      {pontos:1, desc:'O vídeo apresenta abordagem e recursos multimídia de maneira tradicional / convencional para comunicar o desafio.'},
      {pontos:2, desc:'O vídeo apresenta ao menos um aspecto que expressa abordagem não tradicional / convencional. Poderia explorar com maior criatividade outros elementos audiovisuais para torná-lo mais original e autêntico. Poderia ser comunicado com maior espontaneidade, humor ou estratégias diferenciadas.'},
      {pontos:3, desc:'O vídeo apresenta ao menos um aspecto que expressa abordagem não tradicional / convencional. Usa elementos audiovisuais que expressam autenticidade / originalidade no seu formato. Usa diferentes / variadas linguagens e cenas (captação de imagem e edição). É comunicado com espontaneidade, humor ou estratégias diferenciadas. Explora algum recurso digital diferente como animações, mapas, gráficos, música etc.'}
    ]
  },
  videoContextoPublico: {
    grupo: 'Vídeo', label: 'VÍDEO — apresenta o contexto e o público-alvo do desafio relacionados com as tecnologias para a educação profissional (Critério 5)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o vídeo ou o vídeo não apresenta o contexto do desafio e nem quem é o público-alvo envolvido ou, se apresenta, eles não têm relação com o desafio proposto.'},
      {pontos:1, desc:'O vídeo apresenta ao menos um dos elementos: o contexto e/ou público-alvo relacionados ao desafio.'},
      {pontos:2, desc:'O contexto e/ou o público-alvo apresentados no vídeo estão relacionados ao desafio, mas não têm ou têm pouca aproximação com as Tecnologias para a Educação Profissional.'},
      {pontos:3, desc:'O vídeo apresenta o contexto e o público-alvo relacionados ao desafio, descreve de forma clara e objetiva suas características e ambos têm relação direta com as Tecnologias para a Educação Profissional (ed. corporativa, formação continuada, ed. básica, ed. informal, ed. superior, políticas de acesso às tecnologias).'}
    ]
  },
  videoMotivacao: {
    grupo: 'Vídeo', label: 'VÍDEO — apresenta a motivação para escolha do desafio e justifica por que resolvê-lo é importante (Critério 6)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o vídeo ou o vídeo não apresenta a motivação e a importância em estudar este desafio.'},
      {pontos:1, desc:'O vídeo apresenta a motivação para o desafio mas não apresenta as evidências/dados que fundamentam a importância de ser solucionado.'},
      {pontos:2, desc:'O vídeo apresenta de maneira superficial a razão pela qual é importante resolver este desafio, sem detalhá-las. Apresenta demandas com evidências que comprovem sua relevância, todavia, poderiam ser melhor detalhadas.'},
      {pontos:3, desc:'O vídeo apresenta de maneira clara a razão pela qual é importante resolver este desafio. Utilizando demandas com evidências que comprovem sua relevância através de dados estatísticos, vivências pessoais, depoimentos, etc.'}
    ]
  },
  videoSolucoes: {
    grupo: 'Vídeo', label: 'VÍDEO — sugere possíveis ideias / soluções para o desafio focadas nas tecnologias e na educação profissional (Critério 7)', max: 3,
    niveis: [
      {pontos:0, desc:'Não entregou o vídeo ou o vídeo não apresenta ideias / possíveis soluções para o desafio.'},
      {pontos:1, desc:'O vídeo apresenta ao menos uma ideia / possível solução para o desafio, mas esta ideia não tem relação com as tecnologias para a educação profissional.'},
      {pontos:2, desc:'O vídeo apresenta ao menos uma ideia / possível solução para o desafio e esta ideia está focada nas tecnologias para a educação profissional.'},
      {pontos:3, desc:'O vídeo apresenta mais de uma ideia / possível solução para o desafio e estas ideias estão focadas nas tecnologias para a educação profissional.'}
    ]
  }
};
const ORDEM = ['roteiroModelo','roteiroLinguagens','roteiroImagens','roteiroEstrutura','videoSegueRoteiro','videoTempo','videoDesafio','videoCriatividade','videoContextoPublico','videoMotivacao','videoSolucoes'];
const PONTOS_MAXIMOS = ORDEM.reduce((s,k)=>s+RUBRICA[k].max,0); // 30
function notaFinal(pontos){ return Math.round((pontos / PONTOS_MAXIMOS) * 10 * 10) / 10; }
module.exports = {RUBRICA, ORDEM, PONTOS_MAXIMOS, notaFinal};
