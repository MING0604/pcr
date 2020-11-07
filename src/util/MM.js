import axios from 'axios'
class MM {
    // 异步请求
    request(params){
        return new Promise((resolve,reject)=>{
            axios({
                method: params.type || 'get',
                url: params.url || '',
                responseType: params.dataType || 'json',
                data: params.data || null
            })
            .then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    // 上传图片
    pushImg(file){
        return new Promise((resolve,reject)=>{
            let fromdata = new FormData()
            fromdata.append('img',file)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            axios.post('/pushImg',fromdata,config)
            .then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    // 仅根据伤害排序
    sortOnDamage(workList){
        workList.sort((next,prev)=>{
            if(next.damage>prev.damage){
                return -1
            }else{
                return 1
            }
        })
        return workList
    }

    // 先按照boss排序，再根据伤害排序
    sortOnBossAndDamage(workList){
        // console.log('?')
        workList.sort((next,prev)=>{
            let prevBossStage = prev.bossName[0],
                prevBossIndex = prev.bossName[1],
                prevDamage = prev.damage,
                nextBossStage = next.bossName[0],
                nextBossIndex = next.bossName[1],
                nextDamage = next.damage
           
            if(prevBossStage>nextBossStage){
                return -1
            }else if(prevBossStage<nextBossStage){
                return 1
            }else if(prevBossStage == nextBossStage){
                if(prevBossIndex > nextBossIndex){
                    return -1
                }else if(prevBossIndex < nextBossIndex){
                    return 1
                }else if(prevBossIndex == nextBossIndex){
                    if(prevDamage<nextDamage){
                        return -1
                    }else if(prevDamage > nextDamage){
                        return 1
                    }else if(prevDamage == nextDamage){
                        return 0
                    }
                }
            }
        })
        return workList
    }

    // 解析将图片为base64编码
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    } 

    // 设置cookie time为秒
    setCookie(name,value,time)
    {
        var exp = new Date(); 
        exp.setTime(exp.getTime() + time*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    // 获取cookie
    getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    }
    // 销毁cookie
    deleteCookie (cookieName) {
        document.cookie = `${cookieName}=; expires=${new Date(0).toGMTString()}`
    }

    // 登陆
    async login(username,password){
        let res = await this.request({
            type:'post',
            url:'/login',
            data:{
                username: username,
                password: password
            }
        })
        if(res.status === 400){
            alert('登陆成功！')
            this.setCookie('isOwner',true,1)
            this.setCookie('isManager',true,1)
            this.setCookie('isUser',true,7)
            this.setCookie('username',res.username,7)
            return true
        }else if(res.status === 300){
            alert('登陆成功！')
            this.setCookie('isManager',true,1)
            this.setCookie('isUser',true,7)
            this.setCookie('username',res.username,7)
            return true
        }else if(res.status === 200){
            alert('登陆成功！')
            this.setCookie('isUser',true,7)
            this.setCookie('username',res.username,7)
            return true
        }else{
            alert('用户名或密码错误')
            return false
        }
    }
    // 退出登陆
    logout(){
        this.deleteCookie('isOwner')
        this.deleteCookie('isManager')
        this.deleteCookie('isUser')
        this.deleteCookie('username')
        window.location.reload()
    }
    
    // 是否具有用户权限
    isUser(){
        let isUser = this.getCookie('isUser')
        if(!isUser){
            alert('请登录')
            return false
        }
        return true
    }
    // 是否具有管理员权限
    isManager(){
        let isManager = this.getCookie('isManager')
        if(!isManager){
            alert('权限不足！')
            return false
        }
        return true
    }
    // 是否具有拥有者权限
    isOwner(){
        let isOwner = this.getCookie('isOwner')
        if(!isOwner){
            alert('权限不足！')
            return false
        }
        return true
    }
    // 根据selectObj筛选workList
    selectWorkList(workList, selectObj){
        let newWorkList = JSON.parse(JSON.stringify(workList));
        let { bossSelect, characterSelect } = selectObj
        newWorkList = this.selectWorkListOnBossSelect(newWorkList, bossSelect)
        newWorkList = this.selectWorkListOnCharacterSelect(newWorkList, characterSelect)
        return newWorkList
    }
    // 根据bossSelect筛选workList
    selectWorkListOnBossSelect(workList, bossSelect){
        let newWorkList;
        if(bossSelect === "全部boss"){
            newWorkList = workList
        }else if(bossSelect === "A面boss"){
            newWorkList = workList.filter((item)=>{
                if(item.bossName[0]==='A'){
                    return true
                }else{
                    return false
                }
            })
        }else if(bossSelect === "B面boss"){
            newWorkList = workList.filter((item)=>{
                if(item.bossName[0]==='B'){
                    return true
                }else{
                    return false
                }
            })
        }else if(bossSelect === "C面boss"){
            newWorkList = workList.filter((item)=>{
                if(item.bossName[0]==='C'){
                    return true
                }else{
                    return false
                }
            })
        }else{ // 按照boss名称进行筛选
            newWorkList = workList.filter((item)=>{
                if(item.bossName === bossSelect){
                    return true
                }else{
                    return false
                }
            })
        }
        return newWorkList

    }
    // 根据characterSelect筛选workList
    selectWorkListOnCharacterSelect(workList, characterSelect){
        let newWorkList;
        if(!characterSelect.length){
            newWorkList = workList
        }else{
            newWorkList = workList.filter((item,index)=>{
                return !this.checkRepeat(item.characterList,characterSelect)
            })
        }
        return newWorkList
    }
    // 判断两个数组是否有重复的元素 有重复的元素返回true
    checkRepeat(arr1,arr2){
        let hashMap = {}
        for(let item of arr1){
            hashMap[item] = true
        }
        for(let item of arr2){
            if(hashMap[item]){
                return true
            }
        }
        return false
    }

}

export default MM