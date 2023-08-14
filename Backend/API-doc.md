# API Docs

## User related API

### Sign Up API

API URL: /api/user/signup

Method: POST

response type: application/json

Input Format
```
{
    email: string,
    password: string,
    name: string
}
```

Response Format 
```
{
    token: JWT
}
```

### Sign in API

API URL: /api/user/signin

Method: POST

response response type: application/json

Input Format
```
{
    email: string,
    password: string,
}
```

Response Format 
```
{
    token: JWT
}
```

### Personal Profile Update API

API URL: /api/user/profile

Method: PUT

response response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    name: string,
    self_intro: string
}
```

Response Format
```
{
    user_id: int
}
```

### Update User Profile Picture API

API URL: /api/user/profile/picture

Method: PUT

response response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Send as form-data

Input Format
```
{
    picture: file
}
```

Response Format
```
{
    user_id: int
}
```

### Get User Profile API

API URL: /api/user/profile

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Query: user_id: int

Response Format
```
{
    user_id: int,
    name: string,
    email: string,
    picture: string,
    self_intro: string
}
```

## Group Related API

### Create Group

API URL: /api/group

Method: POST

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    name: string,
    category: string,
    location: string,
    description: string,
}
```

Response Format
```
{
    group_id: int
}
```

### Get Group

API URL: /api/group/:group_id

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    group_id: int,
    name: string,
    category: string,
    location: string,
    description: string,
    status: string
}
```

### Update Group

API URL: /api/group/:group_id

Method: PUT

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    name: string,
    category: string,
    location: string,
    description: string,
}
```

Response Format
```
{
    group_id: int
}
```

### Group Search

API URL: /api/group/search

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Query: 
- category: string
- location: string
- sort: string
- isJoined: boolean (send 0 or 1)

Example:

/api/group/search?category=movie&location=seoul&sort=recent&isJoined=0

Response Format
```
{
    groups: [
        {
            group_id: int,
            name: string,
            category: string,
            location: string,
            description: string,
            status: string
        }, ...
    ]
}
```

### Join Group

API URL: /api/group/:group_id/join

Method: POST

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    self_intro: string,
    match_msg: string,
    nickname: string
}
```

Response Format
```
{
    group_id: int
}
```

### Leave Group

API URL: /api/group/:group_id/leave

Method: DELETE

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    group_id: int
}
```

## Chat Related API

### Send Message

API URL: /api/chat/:group_id

Method: POST

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Input Format
```
{
    message: string
}
```

Response Format
```
{
    chat_id: int
}
```

### Get Chat List

API URL: /api/chat/:group_id

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    chats: [
        {
            message: string,
            user_id: int,
            sended_at: string,
            picture: string
        }, ...
    ]
}
```

## Match Related API

### Get match list

API URL: /api/match/:group_id

Method: GET

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    matches: [
        {
            matched_group_id: int,
            users: [
                {
                    picture: string,
                    self_intro: string,
                    match_msg: string,
                    nickname: string
                }
            ]
        }, ...
    ]
}
```

### Leave match

API URL: /api/match/:group_id/leave

Method: DELETE

response type: application/json

Header
```
{
    Authorization: "Bearer ${JWT}"
}
```

Response Format
```
{
    subgroup_id: int
}
```

## AI Model API

Input format
```
{
    data: [
        {
            user_id: int,
            self_intro: string,
            match_msg: string
        },...
    ]
}
```

Response format
```
{
    data: [
        [
            user_id: int
        ],
        [
            user_id: int
        ], ...
    ]
}```