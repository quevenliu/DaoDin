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
    imageUrl: string
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
    picture: file
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
    status: string,
    picture: URL,
    area: int
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
- cursor: int

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
            status: string,
            picture: URL,
            area: int
        }, ...
    ],
    next_cursor: int
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

API URL: /api/chat/socket?group_id=${group_id}

Method: WebSocket

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

Message receive format
```
{
    message: string,
    user_id: int,
    sent_at: string,
    picture: string,
    nickname: string
}
```

This API is used for sending message to the group chat.
Once the websocket is connected, the client should send the message in the format above, and the client will receive the message in the format above.

If there are any errors, the client will receive the error message in the format below.
```
{
    error: string
}
```

### Get Chat List

API URL: /api/chat/:group_id

Method: GET

Query: cursor: int

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
            chat_id: int
            message: string,
            user_id: int,
            sent_at: string,
            picture: string,
            nickname: string
        }, ...
    ],
    next_cursor: int
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
    matched_group_id: int,
    users: [
        {
            picture: string,
            self_intro: string,
            match_msg: string,
            nickname: string
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
