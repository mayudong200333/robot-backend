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
/api/currentcapacity | GET | NA | Get the current capacity from all the shed
/api/newshed | POST | body(shed description json) | create a new shed
/api/appendnewbox/<shed's id> | POST | body(box description json) | append a new box to the specific shed 
/api/takebox/<shed's id> | PATCH | body(box's Id json) | get an existed box from a shed
/api/appendbox/<shed's id> | PATCH | body(box's Id and index json) | put an existed box to the shed
/api/deleteshed/<shed's id> | DELETE | NA | delete an existed shed
/api/deletebox/<shed's id>/<box's id> | DELETE | NA | delete an box on the shed

shed description json format (empty)
```json
{
    "shed":{
        "location":{
            "x": "<shed's  x location> (should be a number)",
            "y": "<shed's  y location>  (should be a number)"
        },
        "boxes":[],
        "capacity": "<shed's capacity>",
        "height": "<shed's height>",
        "rowNumber": "<shed's rowNumber>"
    }
}
```

box description json

```json
{
    "box": {
        "assembled": "ture|false",
        "index": "number",
        "productNumber" :"product's Id in the box (Optional)"
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
    "boxId": "<box's id in the mongoDB>",
    "index": "<number>"
}
```
