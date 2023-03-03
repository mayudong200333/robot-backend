# robot-backend
This is a backend server that store the warehouse system in automatic factory

## Dependencies
Nodejs v16.16.0

Other dependencies you can see in 

## Getting Started 

First You should configure an **.env** file in the root directory.

You should add your own Database Endpoint in this file 

```
DB_URL = <Your Database URL>
```

Install the denpendencies and then run the server 

```bash
npm install

node server.js
```

The Default Server's endpoint: 
[http://localhost:3000](http://localhost:3000)

## API Endpoints

Endpoints | Type | Parameters | Description
--- | --- | --- | ---
/api/currentcapacity | GET | NA | Get the current capacity from all the shef
/newgunner | POST | body(shef description json) | create a new shef
/appendnewbox/<shef's id> | POST | body(box description json) | append a new box to the specific shef 
/takebox/<shef's id> | PATCH | body(box's Id json) | get an existed box from a shef 
/appendbox/<shef's id> | PATCH | body(box's Id and index json) | put an existed box to the shef
/deletegunner/<shef's id> | DELETE | NA | delete an existed shef
/deletebox/<shef's id>/<box's id> | DELETE | NA | delete an box on the shef

shef description json format (empty)
```json
{
    "gunner":{
        "location":{
            "x": "<shef's  x location> (should be a number)",
            "y": "<shef's  y location>  (should be a number)"
        },
        "boxes":[],
        "capacity": "<shef's capacity>"
    }
}
```

box description json

```json
{
    "box": {
        "assembled": "ture|false",
        "index": "number"
    }
}
```

box's Id json

```json
{
    "boxId": "<box's id in the mongoDB>"
}
```

box's Id and index json

```json
{
    "boxId": "<box's id in the mongoDB>"
    "index": "<number>"
}
```
