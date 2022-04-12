import { Response, Request } from 'express';
import { Client } from 'pg'

class DbClient {
  async create(request: Request, response: Response) {
    const client = new Client({
      host: '172.19.0.2',
      port: 5432,
      database: 'postgres',
      password: 'Postgres2019!',
      user: 'postgres'
    });

    await client.connect();

    for (let index = 0; index < 5000; index++) {
      const data = await client.query(`INSERT INTO clients VALUES ('title_${index}', 'http://url/ex${index}')`);
    }

    const { rows } = await client.query('SELECT * FROM clients');

    return response.json(rows);
  }

  async findAll(request: Request, response: Response) {
    let timeStart = Date.now();

    const client = new Client({
      host: '172.19.0.2',
      port: 5432,
      database: 'postgres',
      password: 'Postgres2019!',
      user: 'postgres'
    });

    await client.connect();

    const { rows } = await client.query('SELECT * FROM clients');

    let timeEnd = Date.now();

    console.log("Duration " + (timeEnd - timeStart) + " ms . . .");

    return response.json(rows);
  }
}

export default new DbClient;
