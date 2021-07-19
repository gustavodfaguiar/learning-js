### Create tests false positive

Objetivo deste projeto é apenas demonstrar como podemos acabar escrevendo maus testes.

```curl
curl \
  -X GET \
  http://localhost:3000/user/1444
```

```curl token valid
curl \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDQ2Mjh9.EicDDeKpdqsC9ARz7h9fBpFbuzTnz84JQib4QFkf_ZE" \
  -X GET \
  http://localhost:3000/user/1
```

```curl token not valid
curl \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IxxVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDQ2Mjh9.EicDDeKpdqsC9ARz7h9fBpFbuzTnz84JQib4QFkf_ZE" \
  -X GET \
  http://localhost:3000/user/1
```

```curl token secret diff
curl \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDUxODR9.q9nwzaFxg6CQUYNSOWnaCJAZ5YS83665sibeop_ta9g" \
  -X GET \
  http://localhost:3000/user/1
```

```curl token secret expired
curl \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDU5ODMsImV4cCI6MTYyNjcwNTk4M30.VdqDbvqMcwVanKJpazg5J4rDHBiDXNbu2yohel0aNqM" \
  -X GET \
  http://localhost:3000/user/1
```

