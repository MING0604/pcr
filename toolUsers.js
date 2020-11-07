const fs = require('fs')
const { join } = require('path')
const data = [
    {
        "username": "admin",
        "password": "admin",
        "isManager": true,
        "isOwner": true
    },
    {
        "username": "spcming",
        "password": "asdf",
        "isManager": false,
        "isOwner": false
    },
    {
        "username": "spc",
        "password": "asd",
        "isManager": false,
        "isOwner": false
    },
    {
        "username": "lm",
        "password": "233",
        "isManager": false,
        "isOwner": false
    },
    {
        "username": "233",
        "password": "233",
        "isManager": false,
        "isOwner": false
    }
]
let res = JSON.stringify(data)
fs.writeFile('./users.json',res,()=>{})