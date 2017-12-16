# Chatter backend

## API

#### Authentication

Register with email and password:
```
[POST] /api/register
```

Response:
```json
{
  "token":,
  "profile": {}
}
```

Login with email and password:
```
[POST] /api/login
```

Response:
```json
{
  "token":,
  "profile": {}
}
```
