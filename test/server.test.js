const test=require('node:test');const assert=require('node:assert/strict');
const {duracaoSegundos,pontoValido,assinatura,avaliarLocalmente}=require('../server');
test('interpreta durações usuais',()=>{assert.equal(duracaoSegundos('2:01'),121);assert.equal(duracaoSegundos('1min 58s'),118);assert.equal(duracaoSegundos('121s'),121)});
test('normaliza pontuação para nível válido',()=>{assert.equal(pontoValido('videoTempo',1.8),2);assert.equal(pontoValido('roteiroModelo',0.4),0)});
test('gera assinatura do orientador',()=>assert.equal(assinatura({orientador:'Prof. Rogério Bittencourt'}),'Prof. Rogério'));
test('ausência de vídeo zera critérios de vídeo',()=>{const r=avaliarLocalmente({cena1Voz:'Introdução',cena1Img:'Imagem',cena5Voz:'Conclusão'});for(const k of ['videoSegueRoteiro','videoDesafio','videoCriatividade','videoContextoPublico','videoMotivacao','videoSolucoes'])assert.equal(r.pontuacoes[k].pontos,0)});
