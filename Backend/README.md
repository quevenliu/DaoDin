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

The above example will search for groups that are in seoul **AND** is not joined by the user.

If you want to search multiple keywords in a field, you can separate it by comma as below:

/api/group/search?category=movie&location=seoul,tokyo&sort=recent&isJoined=1

The above example will search for groups that are in seoul **OR** tokyo.

You cannot type a blank string in the query as below:

/api/group/search?category=movie&location=&sort=recent&isJoined=1

This will search for groups whose location is "". You should directly omit the location field if you want to search for groups whose location is not specified.

For isJoined field, if you choose 1, you could see groups of any status. If you choose 0, you could only see groups whose status is "pending".

For now, only sort by recent is supported.

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
## Event API

### Get event
API URL: /api/event/

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
   
    event: [
        {
            event_id: int,
            group_id: int,
            name: string,
            category: string,
            location: string,
            description": string,
            creator_id: int,
            picture: string,
            is_read: int,
            message : string
        }, ...
    ]
}
```

### Read event
API URL: /api/event/:event_id/read

Method: POST

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
    event_id: int
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
