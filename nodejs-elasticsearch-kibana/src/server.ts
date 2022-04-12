import express, { Request, Response } from 'express';
import clientElasticsearch from './client/clientElasticsearch';
import getClient from './client/elasticsearch';
import DbClient from './db/client';

const app = express();

app.get('/', (request: Request, response: Response) => {
  const client = getClient();

  const result = client.index({
    index: 'elastic_teste',
    type: 'type_elastic_teste',
    body: {
      user: 'Gustavo',
      password: '123',
      email: 'gustavo@teste.com.br'
    }
  });

  return response.json(result);
})

// change to POST
app.get('/db/create', DbClient.create)
app.get('/db/findall', DbClient.findAll)

app.get('/elasticsearch/create', clientElasticsearch.create)
app.get('/elasticsearch/findall', clientElasticsearch.findAll)

app.listen(3333, () => console.log("Start server"))
