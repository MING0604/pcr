const fs = require('fs')
const { join } = require('path')
const data = {
    
    "bossData": [
        "A1双足飞龙",
        "A2格里芬",
        "A3芒刺爬行者",
        "A4烈焰战熊",
        "A5白羊座",
        "A6白羊座",
        "B1双足飞龙",
        "B2格里芬",
        "B3芒刺爬行者",
        "B4烈焰战熊",
        "B5白羊座",
        "B6白羊座"
    ],
    "characterData": [
        {
            "name": "狗拳"
        },
        {
            "name": "狼姐"
        },
        {
            "name": "猫拳"
        },
        {
            "name": "剑圣"
        },
        {
            "name": "克总"
        }
    ],
    "workList": [
        {
            "bossName": "A2格里芬",
            "characterList": [
                "狗拳",
                "狼姐",
                "猫拳",
                "剑圣",
                "克总"
            ],
            "damage": 34,
            "workMessage": "34",
            "workType": "url",
            "wid": 1001
        },
        {
            "bossName": "A2格里芬",
            "characterList": [
                "狗拳",
                "狼姐",
                "猫拳",
                "剑圣",
                "克总"
            ],
            "damage": 35,
            "workMessage": "35",
            "workType": "url",
            "wid": 1002
        },
        {
            "bossName": "A1双足飞龙",
            "characterList": [
                "狗拳",
                "狼姐",
                "猫拳",
                "剑圣",
                "克总"
            ],
            "damage": 36,
            "workMessage": "36",
            "workType": "url",
            "wid": 1003
        },
        {
            "bossName": "A4烈焰战熊",
            "characterList": [
                "狗拳",
                "狼姐",
                "剑圣",
                "猫拳",
                "克总"
            ],
            "damage": 99999,
            "workMessage": "99999",
            "workType": "url",
            "wid": 1004
        }
    ]
}
let res = JSON.stringify(data)
fs.writeFile('./dataBase.json',res,()=>{})