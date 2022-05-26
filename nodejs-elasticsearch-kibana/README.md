
### Get IP container
 - docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' name_container

### Download dataset
wget https://download.elastic.co/demos/kibana/gettingstarted/accounts.zip
unzip accounts.zip
curl -H 'Content-Type: application/json' -XPOST 'localhost:9200/bank/account/_bulk?pretty' --data-binary @accounts.json

### Search

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela}
- query = quero fazer uma consulta
- match_all = quero buscar por tudo
- sort = ordena pelo campo desejado
- obs: existe um limite no retorno de hits

retorno do resultado
- took = tempo que levou para executar a consulta em milisegundos
- time_out = se expirou a pesquisa ou não
- shards = como os dados são distribuidos no elasticsearch

GET /bank/_search
{
    "query¨: { "match_all": {} },
    "sort": [
        { "account_number": "asc" }
    ]
}

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela}
- query = quero fazer uma consulta
- match_all = quero buscar por tudo
- sort = ordena pelo campo desejado
- from = da posicão 10
- size = quantidade de resultados

GET /bank/_search
{
    "query¨: { "match_all": {} },
    "sort": [
        { "account_number": "asc" }
    ],
    "from": 10,
    "size": 10
}

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela} WHERE
- Entrega conforme o max_score -> a relevancia que aquele termo tem
- Faz uma busca por termo individuais

GET /bank/_search
{
    "query": { "match": { "address": "mill lane" } },
}

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela} WHERE
- Faz uma busca por uma frase exata

GET /bank/_search
{
    "query": { "match_phrase": { "address": "mill lane" } },
}

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela} WHERE
- São expressoes boleanas que podemos combinar varios critérios de consulta
- must = deve ter esses dados
- must not = não deve coresponder esses dados

GET /bank/_search
{
    "query": {
        "bool": {
            "must": [
                { "match": { "age": "40" } }
            ],
            "must_not": [
                { "match": { "gender": "F" } }
            ]
        }
    }
}

- Responsável por buscar todos os campos -> SELECT * FROM ${tabela} WHERE
- range = intervalo de valores
- filtra os resultados que o elasticsearch trouxe

GET /bank/_search
{
    "query": {
        "bool": {
            "must": { "match_all": {} },
            "filter": {
                "range": {
                    "balance": {
                        "gte": 20000,
                        "lte": 30000
                    }
                }
            }
        }
    }
}


- Seria o GROUP BY do sql
- size = define a quantidade de retorno

GET /bank/_search
{
    "size": 0,
    "aggs": {
        "group_by_state": {
            "terms": {
                "field": "state.keyword"
            }
        }
    }
}

GET /bank/_search
{
    "size": 0,
    "aggs": {
        "group_by_state": {
            "terms": {
                "field": "state.keyword"
                "order": {
                    average_balance": "desc"
                }
            }
        },
        "aggs": {
            "average_balance": {
                "avg": {
                    "field": "balance"
                }
            },
        }
    }
}
