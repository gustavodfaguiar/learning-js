
### Get IP container
 - docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' name_container

### Download dataset
wget https://download.elastic.co/demos/kibana/gettingstarted/accounts.zip
unzip accounts.zip
curl -H 'Content-Type: application/json' -XPOST 'localhost:9200/bank/account/_bulk?pretty' --data-binary @accounts.json

### Search

GET /bank/_search
{
    "query¨: { "match_all": {} },
    "sort": [
        { "account_number": "asc" }
    ]
}

GET /bank/_search
{
    "query¨: { "match_all": {} },
    "sort": [
        { "account_number": "asc" }
    ],
    "from": 10,
    "size": 10
}

GET /bank/_search
{
    "query": { "match": { "address": "mill lane" } },
}

GET /bank/_search
{
    "query": { "match_phrase": { "address": "mill lane" } },
}

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
