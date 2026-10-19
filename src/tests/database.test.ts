import {expect, test} from 'vitest';


test('status deve retornar 200', async () => {
  const response = await fetch('http://localhost:3000/api/health/database');
  console.log(response); // Objeto criado pelo Next.js
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();
  console.log(responseBody); // Objeto criado por mim na api
  expect(responseBody.updated_at).toBeDefined();
});
