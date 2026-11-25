import {expect, test} from 'vitest';


test('POST de /api/v1/migrations deve retornar 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/migrations', {
    method: 'POST',
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);

});
