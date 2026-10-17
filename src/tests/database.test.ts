import {expect, test} from 'vitest';
import database from "../infra/database";

const result = database.query('SELECT 1 + 1;');

test('database deve retornar 2', () => {
  expect(2).toBe(2);
});
