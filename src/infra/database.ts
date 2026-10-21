import { Pool } from 'pg';


class Database {
  private pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,
  });

  async query(queryObject: string) {
    try {
      const result = await this.pool.query(queryObject);
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } 
  }

  getTotalCount() {
    return this.pool.totalCount;
  }
  
} // Fim da classe

const database = new Database();
export default database;