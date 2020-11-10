import MM from 'util/MM'
const _mm = new MM()

function getRecommendList(totalWorkList){
    totalWorkList = _mm.sortOnBossAndDamage(totalWorkList)
    let recommendWorkList = []
    for(let i = 0; i < totalWorkList.length; i++){
        let curFirst = totalWorkList[i]
        for(let j = i + 1; j < totalWorkList.length; j++){
            let curSecond = totalWorkList[j]
            for(let k = j + 1; k < totalWorkList.length; k++){
                let curThird = totalWorkList[k]
                let canUse = !isConfict(curFirst.characterList, curSecond.characterList, curThird.characterList)
                if(canUse){
                    let recommendWorkItem = {
                        workList:[curFirst, curSecond, curThird],
                        totalDamage: curFirst.damage + curSecond.damage + curThird.damage,
                        targetList: [curFirst.bossName, curSecond.bossName, curThird.bossName]
                    }
                    recommendWorkList.push(recommendWorkItem)
                }
            }
        }
    }
    return recommendWorkList
}

function isConfict(curFirst, curSecond, curThird){
    let repeatCharater = {}
    for(let firstItem of curFirst){
        for(let secondItem of curSecond){
            if(secondItem === firstItem){
                repeatCharater[firstItem] = [1,2]
            }
        }
    }
    for(let firstItem of curFirst){
        for(let secondItem of curThird){
            if(secondItem === firstItem){
                repeatCharater[firstItem]
                ?
                repeatCharater[firstItem].push(1,3)
                :
                repeatCharater[firstItem] = [1,3]
            }
        }
    }
    for(let firstItem of curSecond){
        for(let secondItem of curThird){
            if(secondItem === firstItem){
                repeatCharater[firstItem]
                ?
                repeatCharater[firstItem].push(2,3)
                :
                repeatCharater[firstItem] = [2,3]
            }
        }
    }
    var keys = Object.keys(repeatCharater);
    if(keys > 3){
        return true
    }

    // 借角色的作业索引合集
    let indexArr = []
    for(let i = 0; i < keys.length; i++){
        indexArr.push(...repeatCharater[keys[i]])
    }
    // 判断是否一个角色重复的角色达到三个
    if(hasThreeSame(indexArr)){
        return true
    }
    return false
}

function hasThreeSame(indexArr){
    let map = {}
    for(let value of indexArr){
        if(!map[value]){
            map[value] = 1
        }else{
            map[value]++
            if(map[value] >= 3){
                return true
            }
        }
    }
    return false
}
export default getRecommendList