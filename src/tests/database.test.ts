import {expect, test} from 'vitest';


test('status deve retornar 200', async () => {
  const response = await fetch('http://localhost:3000/api/health/database');
  console.log(response); // response é um objeto criado pelo Next.js
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();
  // console.log(responseBody); // Objeto criado por mim na api
  
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual('18.6');
  expect(responseBody.dependencies.database.max_connections).toEqual(901);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
