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

    
}

export default MM