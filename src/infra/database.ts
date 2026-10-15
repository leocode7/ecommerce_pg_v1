import { Client } from 'pg';


class Database {
  async query(queryObject: string) {
    const client = await new Client({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
    }).connect();

    try {
      const result = await client.query(queryObject);
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      await client.end();
    }
  }

}

const database = new Database();
export default database;