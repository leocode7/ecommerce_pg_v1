import { expect, test } from 'vitest';

const url: string = 'http://localhost:3000/api/health/database';
test('deve retornar status HTTP 200', async () => {
  const response = await fetch(url);
  //console.log(response); // response é um objeto criado pelo Next.js
  expect(response.status).toBe(200);
});

test('deve retornar updated_at em formato ISO válido', async () => {
  const response = await fetch(url);
  const responseBody = await response.json();
  // console.log(responseBody); // Objeto criado por mim na api
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
});

test('deve retornar a versão 18.6 do PostgreSQL', async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.version).toEqual('18.6');
});

test('deve retornar o número máximo de conexões', async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});

test('deve retornar a quantidade esperada de conexões abertas', async () => {
  const response = await fetch(url);
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});


