import { ADD_WORK, ADD_BOSS_ITEM, ADD_CHARACTER_ITEM, DELETE_BOSS_ITEM, DELETE_CHARACTER_ITEM, CLEAR_BOSS_LIST } from 'store/ActionType'

import defaultState from './state'

// 删除数组中的一个数据
function deleteItem(arr,item){
    let index = findIndex(arr,item)
    if(index == -1){
        alert('删除失败，删除的对象不存在')
        return false
    }
    arr.splice(index,1)
    alert('删除成功！')
    return true
}

// 根据数据查找下标(包括对象数据)
function findIndex(arr,item){
    let strItem = JSON.stringify(item)
    for(let index in arr){
        let strArr = JSON.stringify(arr[index])
        if(strArr == strItem){
            return index
        }
    }
    return -1
}

// 对state中的bossData进行排序
function sortBossData(bossData){
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
                alert('存在重复的boss,请删除其中一个！')
                return 0
            }
        }
    })
}

export default (state = defaultState, action) => {
    let newState 
    switch(action.type){
        case ADD_WORK:
            newState = JSON.parse(JSON.stringify(state))
            let newWork = action.value,
                listLength = newState.workList.length
            if(listLength==0){
                newWork.wid = 1001
            }else{
                newWork.wid = newState.workList[listLength-1].wid + 1
            }
            newState.workList.push(newWork)
            return newState
        case ADD_BOSS_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            if(findIndex(newState.bossData,action.value)!=-1){
                alert('存在重名的boss！添加失败');
                return newState
            }
            newState.bossData.push(action.value)
            sortBossData(newState.bossData)
            return newState
        case ADD_CHARACTER_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            if(findIndex(newState.characterData,{name:action.value})!=-1){
                alert('存在重名的角色！添加失败');
                return newState
            }
            newState.characterData.push({name:action.value})
            return newState
        case DELETE_BOSS_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            deleteItem(newState.bossData,action.value)
            return newState
        case DELETE_CHARACTER_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            deleteItem(newState.characterData,action.value)
            return newState
        case CLEAR_BOSS_LIST:
            newState = JSON.parse(JSON.stringify(state))
            newState.bossData = []
            return newState
    }
    return state
}