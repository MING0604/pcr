
class MM {
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

    // 读取本地文件，同步到redux中,失败
    updateRedux(){
        const reader = new FileReader()
        reader.readAsText('/state.json','utf-8')
        reader.onload = ()=>{
            console.log(reader.result)
        }
    }
}

export default MM