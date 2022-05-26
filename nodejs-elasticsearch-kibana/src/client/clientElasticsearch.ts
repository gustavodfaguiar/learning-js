import { Response, Request } from 'express';
import { Client } from 'pg'
import getClient from './elasticsearch';

class ClientElasticsearch {
  async create(request: Request, response: Response) {
    const client = new Client({
      host: '172.19.0.2',
      port: 5432,
      database: 'postgres',
      password: 'Postgres2019!',
      user: 'postgres'
    });

    await client.connect();

    const { rows } = await client.query('SELECT * FROM clients');

    for await(let row of rows) {
      await getClient().index({
        index: 'clients',
        type: 'title_clients',
        body: row
      }, (error) => {
        if (error) {
          return response.status(400).json({error: error})
        }
      })
    }

    return response.json({ message: 'Index ok'})
  }

  async findAll(request: Request, response: Response) {
    let timeStart = Date.now();

    const data = await getClient().search({
      index: 'clients',
      size: 6000
    });

    let timeEnd = Date.now();

    console.log("Duration " + (timeEnd - timeStart) + " ms . . .");

    return response.json(data);
  }
}

export default new ClientElasticsearch;
