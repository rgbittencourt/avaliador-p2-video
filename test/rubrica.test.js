const test = require('node:test');
const assert = require('node:assert');
const {RUBRICA, ORDEM, PONTOS_MAXIMOS, notaFinal} = require('../rubrica');

test('rubrica tem 11 critérios', () => {
  assert.strictEqual(ORDEM.length, 11);
});

test('soma máxima é 30 pontos', () => {
  assert.strictEqual(PONTOS_MAXIMOS, 30);
});

test('cada critério tem rótulo, máximo e níveis válidos', () => {
  for (const k of ORDEM) {
    const c = RUBRICA[k];
    assert.ok(c.label, `${k} sem label`);
    assert.ok(c.max >= 1, `${k} sem max`);
    assert.ok(Array.isArray(c.niveis) && c.niveis.length >= 2, `${k} sem níveis`);
    const maxNivel = Math.max(...c.niveis.map(n => n.pontos));
    assert.strictEqual(maxNivel, c.max, `${k}: maior nível (${maxNivel}) difere do max (${c.max})`);
    assert.ok(c.niveis.some(n => n.pontos === 0), `${k} sem nível 0`);
  }
});

test('conversão para 0 a 10 está correta', () => {
  assert.strictEqual(notaFinal(30), 10);
  assert.strictEqual(notaFinal(0), 0);
  assert.strictEqual(notaFinal(22), 7.3);
  assert.strictEqual(notaFinal(19), 6.3);
  assert.strictEqual(notaFinal(24), 8);
  assert.strictEqual(notaFinal(29), 9.7);
});
