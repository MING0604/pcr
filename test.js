const http = require('http');
const fs = require('fs');
const { ifError } = require('assert');
const { parse } = require('path');
http.createServer(async function (request, response) {
    // 设置请求头
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    // 解析url路径
    let url = request.url;

    // 请求作业列表接口 
    if(url === '/getWorkList'){
        console.log('请求作业列表')
        let data = await getData()
        let { workList } = data
        response.end(JSON.stringify(workList))
    }
    // 根据wid获取作业
    if(url === '/getWorkItem'){
        request.on('data',async (wid)=>{
            wid = JSON.parse(wid)
            console.log('获取作业，wid为：' + wid)
            let { workList } = await getData()
            let res = getWorkOnWid(workList,wid)
            response.end(JSON.stringify(res))
        })
    }
    // 请求角色列表接口 
    if(url === '/getCharacter'){
        console.log("请求角色列表")
        let data = await getData()
        let { characterData } = data
        response.end(JSON.stringify(characterData))
    }
    // 添加角色接口
    if(url === '/addCharacter'){
        console.log('添加角色')
        let data = await getData()
        request.on('data',res=>{
            characterItem = {
                name:res.toString()
            }
            data.characterData.push(characterItem)
            refreshData(data)
            response.end('添加成功')
        })
    }
    // 删除角色接口
    if(url === '/deleteCharacter'){
        console.log('删除角色')
        let data = await getData()
        request.on('data',res=>{
            let index = findCharacterIndex(data.characterData,JSON.parse(res))
            data.characterData.splice(index,1)
            refreshData(data)
        })
        response.end('删除成功')
    }
    // 请求boss列表接口
    if(url === '/getBoss'){
        console.log("请求boss列表")
        let data = await getData()
        let { bossData } = data
        response.end(JSON.stringify(bossData))
    }
    // 添加boss接口
    if(url === '/addBoss'){
        console.log('添加Boss')
        let data = await getData()
        request.on('data',res=>{
            data.bossData.push(res.toString())
            let existRepeat = sortBossList(data.bossData)
            if(!existRepeat) 
            {
                refreshData(data)
                let res={
                    msg:"添加成功"
                }
                response.end(JSON.stringify(res))
            }else{
                let res={
                    msg:"存在重复Boss，添加失败"
                }
                response.end(JSON.stringify(res))
            }
        })
    }
    // 删除boss接口
    if(url === '/deleteBoss'){
        console.log('删除boss')
        let data = await getData()
        request.on('data',item=>{
            let index = data.bossData.indexOf(item.toString())
            data.bossData.splice(index,1)
            refreshData(data)
            response.end('删除成功')
        })
    }
    // 清除boss数据接口
    if(url === '/clearBoss'){
        console.log('清除boss')
        let data = await getData()
        data.bossData = []
        refreshData(data)
        response.end(JSON.stringify(data))
    }

    // 添加作业接口
    if(url === '/addWork'){
        console.log('添加作业')
        let data = await getData()
        request.on('data',item=>{
            item = JSON.parse(item)
            if(data.workList.length){
                item.wid = data.workList[data.workList.length - 1].wid + 1
            }else{
                item.wid = 1001
            }
            data.workList.push(item)
            refreshData(data)
            response.end("添加成功")
        })
    }

    // 删除作业接口
    if(url === '/deleteWork'){
        console.log('删除作业')
        let data = await getData()
        request.on('data',resData=>{
            wid = JSON.parse(resData.wid)
            console.log(wid)
            let status = 100;
            status = deleteWork(data, wid)
            refreshData(data)
            response.end(JSON.stringify({status}))
        })
    }

    // 添加登陆接口
    if(url === '/login'){
        console.log('请求登陆')
        let userMsg = await getUsers()
        request.on('data',async (data)=>{
            let status = 100
            data = JSON.parse(data)
            let res = await isMe(data.username,data.password)
            if(res){
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
            response.end(JSON.stringify({status,username:data.username}))
        })
    }

    // 用户注册接口
    if(url === '/register'){
        console.log('用户注册')
        let  userMsg  = await getUsers()
        request.on('data',data=>{
            data = JSON.parse(data.toString())
            let index = findUserIndex(userMsg,data.username)
            let status
            if(index !== -1){ // 有重名的username
                status = 100
            }else{
                status = 200
                userMsg.push(data)
                refreshUser(userMsg)
            }
            response.end(JSON.stringify({status}))
        })
    }

    // 获取用户列表接口
    if(url === '/getUserListMsg'){
        console.log('获取用户列表')
        let userMsg = await getUsers()
        response.end(JSON.stringify({userMsg}))
    }
    // 撤销管理员
    if(url === '/deleteManager'){
        let userMsg = await getUsers()
        request.on('data',(data)=>{
            data = JSON.parse(data)
            console.log('撤销管理员',data.username)
            let index = findUserIndex(userMsg,data.username)
            userMsg[index].isManager = false
            userMsg[index].isOwner = false
            refreshUser(userMsg)
            response.end("撤销成功")
        })
    }
    // 添加管理员
    if(url === '/addManager'){
        let userMsg = await getUsers()
        request.on('data',(data)=>{
            data = JSON.parse(data)
            console.log('添加管理员',data.username)
            let index = findUserIndex(userMsg,data.username)
            userMsg[index].isManager = true
            refreshUser(userMsg)
            response.end("添加成功")
        })
    }
    // 撤销拥有者
    if(url === '/deleteOwner'){
        let userMsg = await getUsers()
        request.on('data',(data)=>{
            data = JSON.parse(data)
            console.log('撤销拥有者',data.username)
            let index = findUserIndex(userMsg,data.username)
            userMsg[index].isOwner = false
            refreshUser(userMsg)
            response.end("撤销成功")
        })
    }
    // 添加拥有者
    if(url === '/addOwner'){
        let userMsg = await getUsers()
        request.on('data',(data)=>{
            data = JSON.parse(data)
            console.log('添加拥有者',data.username)
            let index = findUserIndex(userMsg,data.username)
            userMsg[index].isManager = true
            userMsg[index].isOwner = true
            refreshUser(userMsg)
            response.end("添加成功")
        })
    }

    response.end('asss')
    

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

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