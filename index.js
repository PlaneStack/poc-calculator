#!/usr/bin/env node

const readline = require('readline');

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function parseNumber(input) {
  const n = Number(input);
  return Number.isFinite(n) ? n : null;
}

function calculate(op, a, b) {
  if (!isNumber(a) || !isNumber(b)) return { error: 'invalid_number' };
  switch (op) {
    case 'add':
      return { value: a + b };
    case 'sub':
      return { value: a - b };
    case 'mul':
      return { value: a * b };
    case 'div':
      if (b === 0) return { error: 'divide_by_zero' };
      return { value: a / b };
    default:
      return { error: 'unknown_operation' };
  }
}

function formatResult(result) {
  if (result.error === 'divide_by_zero') return 'Error: cannot divide by zero.';
  if (result.error === 'invalid_number') return 'Error: please enter valid numbers.';
  if (result.error === 'unknown_operation') return 'Error: unknown operation.';
  return `Result: ${result.value}`;
}

function runSelfTest() {
  const cases = [
    { op: 'add', a: 2, b: 3, expect: 5 },
    { op: 'sub', a: 10, b: 7, expect: 3 },
    { op: 'mul', a: 4, b: 5, expect: 20 },
    { op: 'div', a: 9, b: 3, expect: 3 },
    { op: 'div', a: 9, b: 0, error: 'divide_by_zero' }
  ];

  let failed = 0;
  for (const test of cases) {
    const result = calculate(test.op, test.a, test.b);
    if (test.error) {
      if (result.error !== test.error) failed += 1;
    } else if (result.value !== test.expect) {
      failed += 1;
    }
  }

  if (failed) {
    console.error(`Self-test failed: ${failed} case(s)`);
    process.exit(1);
  }
  console.log('Self-test passed.');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = [
  'Choose an operation:',
  '1) add',
  '2) sub',
  '3) mul',
  '4) div',
  '5) exit'
].join('\n');

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log('PlaneStack POC Calculator');
  while (true) {
    console.log(`\n${menu}`);
    const choice = (await ask('> ')).trim();
    if (choice === '5' || choice.toLowerCase() === 'exit') break;

    const op = ({
      '1': 'add',
      '2': 'sub',
      '3': 'mul',
      '4': 'div',
      add: 'add',
      sub: 'sub',
      mul: 'mul',
      div: 'div'
    })[choice.toLowerCase()];

    if (!op) {
      console.log('Invalid choice.');
      continue;
    }

    const first = parseNumber((await ask('First number: ')).trim());
    const second = parseNumber((await ask('Second number: ')).trim());
    const result = calculate(op, first, second);
    console.log(formatResult(result));
  }

  rl.close();
  console.log('Goodbye.');
}

main();
