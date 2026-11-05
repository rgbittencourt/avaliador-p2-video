const test = require('node:test');
const assert = require('node:assert');
const {assinatura, duracaoSegundos, pontoValido, limparAvaliacao, avaliarLocalmente, montarPrompt, limparExtracaoSemantica} = require('../server');

test('assinatura usa o primeiro nome do orientador', () => {
  assert.strictEqual(assinatura({}), 'Prof. Rogério');
  assert.strictEqual(assinatura({orientador: 'Prof. Rogério Gonçalves Bittencourt'}), 'Prof. Rogério');
  assert.strictEqual(assinatura({orientador: 'Prof. Luís Henrique Lindner'}), 'Prof. Luís');
  assert.strictEqual(assinatura({orientador: 'Maria Silva'}), 'Prof. Maria');
});

test('duração converte formatos variados em segundos', () => {
  assert.strictEqual(duracaoSegundos('2:00'), 120);
  assert.strictEqual(duracaoSegundos('2min00s'), 120);
  assert.strictEqual(duracaoSegundos('2min21s'), 141);
  assert.strictEqual(duracaoSegundos('1min55s'), 115);
  assert.strictEqual(duracaoSegundos('344'), 344);
  assert.strictEqual(duracaoSegundos(''), null);
});

test('pontoValido ajusta para o nível mais próximo', () => {
  assert.strictEqual(pontoValido('roteiroModelo', 1), 1);
  assert.strictEqual(pontoValido('roteiroModelo', 5), 1);
  assert.strictEqual(pontoValido('videoTempo', 2), 2);
  assert.strictEqual(pontoValido('videoTempo', 9), 2);
});

test('limparAvaliacao calcula soma, nota e assina pelo orientador', () => {
  const pont = {};
  ['roteiroModelo','roteiroLinguagens','roteiroImagens','roteiroEstrutura','videoSegueRoteiro','videoTempo','videoDesafio','videoCriatividade','videoContextoPublico','videoMotivacao','videoSolucoes']
    .forEach((k, i) => pont[k] = {pontos: i === 5 ? 2 : 3});
  pont.roteiroModelo.pontos = 1; // max 1
  const r = limparAvaliacao({pontuacoes: pont, feedback: 'Corpo.'}, {orientador: 'Prof. Luís Henrique Lindner'});
  assert.strictEqual(r.soma, 30);
  assert.strictEqual(r.nota, 10);
  assert.ok(r.feedback.endsWith('Um abraço\n\nProf. Luís'));
});

test('avaliarLocalmente zera critérios de roteiro quando não entregue', () => {
  const r = avaliarLocalmente({videoDuracao: '1min50s', videoObservacao: 'plano fixo'});
  assert.strictEqual(r.pontuacoes.roteiroModelo.pontos, 0);
  assert.strictEqual(r.pontuacoes.roteiroLinguagens.pontos, 0);
  assert.strictEqual(r.pontuacoes.videoSegueRoteiro.pontos, 0);
  assert.strictEqual(r.modo, 'local');
});

test('avaliarLocalmente pontua tempo conforme a duração', () => {
  assert.strictEqual(avaliarLocalmente({linkVideo:'x', videoDuracao: '1min55s'}).pontuacoes.videoTempo.pontos, 2);
  assert.strictEqual(avaliarLocalmente({linkVideo:'x', videoDuracao: '2min10s'}).pontuacoes.videoTempo.pontos, 1);
  assert.strictEqual(avaliarLocalmente({linkVideo:'x', videoDuracao: '2min30s'}).pontuacoes.videoTempo.pontos, 0);
});

test('montarPrompt inclui a rubrica e a assinatura do orientador', () => {
  const p = montarPrompt({orientador: 'Prof. Luís Henrique Lindner', desafio: 'Como podemos...'});
  assert.ok(p.includes('RUBRICA OFICIAL DA P2'));
  assert.ok(p.includes('Prof. Luís'));
  assert.ok(p.includes('(soma/30)×10'));
});

test('limparExtracaoSemantica normaliza a declaração de IA', () => {
  const r = limparExtracaoSemantica({iaDeclaracao: 'talvez', nome: ' Ana '});
  assert.strictEqual(r.iaDeclaracao, '');
  assert.strictEqual(r.nome, 'Ana');
  assert.ok('cena3Voz' in r);
});
