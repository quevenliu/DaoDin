# API Docs

## User related API

### Sign Up API

API URL: /api/user/signup
Method: POST
type: application/json

Input Format
```json
{
    email: string,
    password: string,
    name: string
}
```

Response Format 
```json
{
    token: JWT
}
```

### Sign in API

API URL: /api/user/signin
Method: POST
type: application/json

Input Format
```json
{
    email: string,
    password: string,
    name: string
}
```

Response Format 
```json
{
    token: JWT
}
```

## Personal Profile Update API

API URL: /api/user/profile
Method: PUT
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```json
{
    name: string,
    email: string,
    password: string,
    picture: file
}
```

Response Format
```json
{
    user_id: int
}
```

### Get User Profile API

API URL: /api/user/profile
Method: GET
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Query: user_id: int

Response Format
```json
{
    user_id: int,
    name: string,
    email: string,
    picture: string
}
```

## Group Related API

### Create Group

API URL: /api/group
Method: POST
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```json
{
    name: string,
    category: string,
    location: string,
    description: string,
}
```

Response Format
```json
{
    group_id: int
}
```

### Get Group

API URL: /api/group/:group_id
Method: GET
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    group_id: int,
    name: string,
    category: string,
    location: string,
    description: string,
    members: [
        {
            user_id: int,
            name: string,
            email: string,
            picture: string
        }
    ]
}
```

### Update Group

API URL: /api/group/:group_id
Method: PUT
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```json
{
    name: string,
    category: string,
    location: string,
    description: string,
}
```

Response Format
```json
{
    group_id: int
}
```

### Delete Group

API URL: /api/group/:group_id
Method: DELETE
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    group_id: int
}
```

### Get Group List

API URL: /api/group/list
Method: GET
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Query: 
- category: string
- location: string
- sort: string

Response Format
```json
[
    {
        group_id: int,
        name: string,
        category: string,
        location: string,
        description: string,
    }
]
```

### Join Group

API URL: /api/group/:group_id/join
Method: POST

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```json
{
    self_intro: string,
    match_msg: string,
    nickname: string
}
```

Response Format
```json
{
    group_id: int
}
```

### Leave Group

API URL: /api/group/:group_id/leave
Method: DELETE

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    group_id: int
}
```

## Chat Related API

### Create Chat

API URL: /api/chat/:group_id
Method: POST
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```json
{
    message: string
}
```

Response Format
```json
{
    chat_id: int
}
```

### Get Chat List

API URL: /api/chat/:group_id
Method: GET
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    chats: [
        {
            message: string,
            user_id: int,
            sended_at: string,
            picture: string
        }
    ]
}
```

## Match Related API

### Get match list

API URL: /api/match/:group_id
Method: GET
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    matches: [
        matched_group_id: int,
        users: [
            {
                picture: string,
                self_intro: string,
                match_msg: string,
                nickname: string
            }
        ]
    ]
}
```

### Leave match

API URL: /api/match/:group_id/:subgroup_id/leave
Method: DELETE
type: application/json

Header
```json
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```json
{
    subgroup_id: int
}
```

