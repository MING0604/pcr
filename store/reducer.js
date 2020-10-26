import { ADD_WORK, ADD_BOSS_ITEM, ADD_CHARACTER_ITEM } from 'store/ActionType'

import defaultState from './state'


export default (state = defaultState, action) => {
    let newState 
    switch(action.type){
        case ADD_WORK:
            newState = JSON.parse(JSON.stringify(state))
            newState.workList.push(action.value)
            return newState
        case ADD_BOSS_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            console.log(action.value)
            return newState
        case ADD_CHARACTER_ITEM:
            newState = JSON.parse(JSON.stringify(state))
            newState.characterData.push({name:action.value})
            return newState
    }
    return state
}