import { Pool } from 'pg';


type QueryObject = {
  text: string;
  values?: any[]
}

class Database {
  private pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'development'? false : true,
  });

  async query(queryObject: QueryObject) {
    try {
      const result = await this.pool.query(queryObject);
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } 
  }  
} // Fim da classe

const database = new Database();
export default database;