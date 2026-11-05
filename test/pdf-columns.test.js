const test = require('node:test');
const assert = require('node:assert');
const {columnStarts,collect} = require('../public/pdf-columns');

const pages=[[{items:[
  {x:139,text:'Voz'},{x:322.5,text:'Imagens'},{x:407.7,text:'Outros/OBS'}
]},{items:[
  {x:72.3,text:'CENA 1'},{x:139,text:'Fala do aluno'},{x:322.5,text:'Imagem do laboratório'},{x:407.7,text:'Tempo aproximado: 25 segundos'}
]},{items:[
  {x:72.3,text:'CENA 2'},{x:139,text:'Próxima fala'}
]}]];

test('detecta as quatro colunas pelo cabeçalho da tabela',()=>{
  const b=columnStarts(pages);
  assert.ok(b.voz<139&&b.imagens<322.5&&b.outros<407.7);
});

test('mantém Voz separada e captura Imagens e Outros/OBS',()=>{
  const r=collect(pages,/CENA\s*1/i,/CENA\s*2/i);
  assert.deepStrictEqual(r.voice,['Fala do aluno']);
  assert.deepStrictEqual(r.images,['Imagem do laboratório']);
  assert.deepStrictEqual(r.notes,['Tempo aproximado: 25 segundos']);
});
