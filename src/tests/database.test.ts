import database from '../infra/database';
import {expect, test} from 'vitest';

const result = await database.query('SELECT 1 + 1 as sum;');
const resultConvertidoParaNumber = Number(result?.rows[0]['sum']);


test('database deve retornar 2', () => {
  expect(resultConvertidoParaNumber).toBe(2);
});
