import {expect, test} from 'vitest';

const response = await fetch('http://localhost:3000/api/health/database');
console.log(response);

test('status deve retornar 200', () => {
  expect(response.status).toBe(200);
});
