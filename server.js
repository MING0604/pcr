var express = require("express");
var bodyParser = require('body-parser')

// 等改完之后在优化目录结构
// require('./tool.js')

const fs = require('fs')
var app = require("express")(),
    server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

server.listen(8081);

app.use(express.static("./dist"));
// 进入主页
app.get("/", function(req, res) {
    console.log('请求主页')
    res.sendfile(__dirname + '/index.html')
})

// 请求登录接口
app.post("/login",async function (req,res){
    console.log('请求登录')
    let userMsg = await getUsers()
    let status = 100
    data = req.body
    let isMyself = await isMe(data.username,data.password)
    if(isMyself){
        status = 400
        response.end(JSON.stringify({status,username:data.username}))
        return 
    }
    for(let index in userMsg){
        if(userMsg[index].username === data.username &&
            userMsg[index].password === data.password){
            if(userMsg[index].isOwner){
                status = 400
            }else if(userMsg[index].isManager){
                status = 300
            }else{
                status = 200
            }
        }
    }
    // response.end(JSON.stringify({status,username:data.username}))
    res.send({status,username:data.username})
})

// 请求作业列表接口
app.get('/getWorkList', async(req, res)=>{
    console.log('请求作业列表')
    let data = await getData()
    let { workList } = data
    res.send((workList))
})

// 根据wid获取作业
app.post('/getWorkItem', async(req,res)=>{
    let wid = req.body.wid
    // console.log('获取作业，wid为：' + wid)
    console.log('获取其作业', req.body.wid)
    let { workList } = await getData()
    let resData = getWorkOnWid(workList,wid)
    res.send(resData)
})
// 请求角色列表接口 
app.get('/getCharacter',async (req,res)=>{
    console.log("请求角色列表")
    let data = await getData()
    let { characterData } = data
    res.send(characterData)
})
// 添加角色接口
app.post('/addCharacter', async(req,res)=>{
    console.log('添加角色')
    let data = await getData()
    characterItem = {
        name:req.body.characterName
    }
    data.characterData.push(characterItem)
    refreshData(data) 
    res.send('添加成功')
})
// 删除角色接口
app.post('/deleteCharacter', async (req,res)=>{
    console.log('删除角色')
    let data = await getData()
    let index = findCharacterIndex(data.characterData,req.body)
    data.characterData.splice(index,1)
    refreshData(data)
    res.send('删除成功')
})
// 请求boss列表接口
app.get('/getBoss', async (req,res)=>{
    console.log("请求boss列表")
    let data = await getData()
    let { bossData } = data
    // console.log(bossData)
    res.send(bossData)
})
// 添加boss接口
app.post('/addBoss', async(req,res)=>{
    console.log('添加Boss')
    let data = await getData()
    data.bossData.push(req.body.bossName)
    let existRepeat = sortBossList(data.bossData)
    if(!existRepeat) 
    {
        refreshData(data)
        let resData={
            msg:"添加成功"
        }
        res.send(resData)
    }else{
        let resData={
            msg:"存在重复Boss，添加失败"
        }
        res.send(resData)
    }
})
// 删除boss接口
app.post('/deleteBoss', async(req,res)=>{
    console.log('删除boss')
    let data = await getData()
    let index = data.bossData.indexOf(req.body.bossName)
    data.bossData.splice(index,1)
    refreshData(data)
    res.send('删除成功')
})
// 清除boss数据接口
app.get('/clearBoss',async (req,res)=>{
    console.log('清除boss')
    let data = await getData()
    data.bossData = []
    refreshData(data)
    res.send('清除成功')
})
// 添加作业接口
app.post('/addWork',async (req,res)=>{
    console.log('添加作业')
    let data = await getData()
    let item = req.body
    if(data.workList.length){
        item.wid = data.workList[data.workList.length - 1].wid + 1
    }else{
        item.wid = 1001
    }
    data.workList.push(item)
    refreshData(data)
    res.send("添加成功")
})
// 删除作业接口
app.post('/deleteWork',async (req,res)=>{
    console.log('删除作业')
    let data = await getData()
    wid = req.body.wid
    console.log(wid)
    let status = 100;
    status = deleteWork(data, wid)
    refreshData(data)
    res.send({status})
})
// 登陆接口
app.post('/login',async (req,res)=>{
    console.log('请求登陆')
    let userMsg = await getUsers()
    let status = 100
    data = req.body
    let resData = await isMe(data.username,data.password)
    if(resData){
        status = 400
        response.end(JSON.stringify({status,username:data.username}))
        return 
    }
    for(let index in userMsg){
        if(userMsg[index].username === data.username &&
            userMsg[index].password === data.password){
            if(userMsg[index].isOwner){
                status = 400
            }else if(userMsg[index].isManager){
                status = 300
            }else{
                status = 200
            }
        }
    }
    res.send({status,username:data.username})
})
// 用户注册接口
app.post('/register',async (req,res)=>{
    console.log('用户注册')
    let  userMsg  = await getUsers()
    data = req.body
    let index = findUserIndex(userMsg,data.username)
    let status
    if(index !== -1){ // 有重名的username
        status = 100
    }else{
        status = 200
        userMsg.push(data)
        refreshUser(userMsg)
    }
    res.send({status})
})

// 获取用户列表接口
app.get('/getUserListMsg',async (req,res)=>{
    console.log('获取用户列表')
    let userMsg = await getUsers()
    res.send({userMsg})
})
// 撤销管理员
app.post('/deleteManager',async (req,res)=>{
    let userMsg = await getUsers()
    data = req.body
    console.log('撤销管理员',data.username)
    let index = findUserIndex(userMsg,data.username)
    userMsg[index].isManager = false
    userMsg[index].isOwner = false
    refreshUser(userMsg)
    res.send("撤销成功")
})
// 添加管理员
app.post('/addManager',async (req,res)=>{
    let userMsg = await getUsers()
    data = req.body
    console.log('添加管理员',data.username)
    let index = findUserIndex(userMsg,data.username)
    userMsg[index].isManager = true
    refreshUser(userMsg)
    res.send("添加成功")
})
// 撤销拥有者
app.post('/deleteOwner',async (req,res)=>{
    let userMsg = await getUsers()
    data = req.data
    console.log('撤销拥有者',data.username)
    let index = findUserIndex(userMsg,data.username)
    userMsg[index].isOwner = false
    refreshUser(userMsg)
    res.send("撤销成功")
})
// 添加拥有者
app.post('/addOwner',async (req,res)=>{
    let userMsg = await getUsers()
    data = req.body
    console.log('添加拥有者',data.username)
    let index = findUserIndex(userMsg,data.username)
    userMsg[index].isManager = true
    userMsg[index].isOwner = true
    refreshUser(userMsg)
    res.send("添加成功")
})
// 获取数据库(伪)中的全部信息
function getData(){
    return new Promise((res,rej)=>{
        fs.readFile('./dataBase.json',(err,data)=>{
            if(err){
                rej(err)
            }else{
                res(JSON.parse(data.toString()))
            }
        })
    })
}

// 更新数据库(伪),会覆盖谨慎使用
function refreshData(data){
    fs.writeFile('./dataBase.json',JSON.stringify(data),(err)=>{})
}

// 对BossData进行排序
function sortBossList(bossData){
    let existRepeat = false
    bossData.sort((next,prev)=>{
        let nextStage = next[0],
            prevStage = prev[0],
            nextIndex = next[1],
            prevIndex = prev[1]
        if(prevStage>nextStage){
            return -1
        }else if(prevStage<nextStage){
            return 1
        }else if(prevStage == nextStage){
            if(prevIndex > nextIndex){
                return -1
            }else if(prevIndex < nextIndex){
                return 1
            }else if(prevIndex == nextIndex){
                existRepeat = true
                return 0
            }
        }
    })
    return existRepeat
}

// 寻找角色对应的下标
function findCharacterIndex(list,item){
    for(let index in list){
        if(list[index].name === item.name){
            return index
        }
    }
    return -1
}

// 根据wid删除作业，并修改status
function deleteWork(data, wid){
    let index = -1
    for(let i in data.workList){
        if(data.workList[i].wid === wid){
            index = i
            break
        }
    }
    if(index === -1){
        return 100
    }else{
        data.workList.splice(index,1)
        return 200
    }
}

// 获取用户信息列表
function getUsers(){
    return new Promise((res,rej)=>{
        fs.readFile('./users.json',(err,data)=>{
            if(err){
                rej(err)
            }else{
                res(JSON.parse(data.toString()))
            }
        })
    })
}

// 根据username查找用户的下标
function findUserIndex(userMsg,username){
    for(let index in userMsg){
        if(userMsg[index].username === username){
            return index
        }
    }
    return -1
}

// 覆盖用户名
function refreshUser(userMsg){
    fs.writeFile('./users.json',JSON.stringify(userMsg),(err)=>{})
}

// 验证我的用户名和密码
function isMe(username, password){
    return new Promise((res,rej)=>{
        fs.readFile('./myMsg.json',(err,data)=>{
            if(err){
                rej(err)
            }else{
                data = JSON.parse(data)
                if(data.username === username && data.password === password){
                    res(true)
                }else{
                    res(false)
                }
            }
        })
    })
}

// 根据wid查找作业
function getWorkOnWid(workList,wid){
    for(let item of workList){
        if(item.wid === wid){
            return item
        }
    }
    return false
}