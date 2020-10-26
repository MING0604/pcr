import {ADD_WORK} from 'store/ActionType'

import defaultState from './state'


export default (state = defaultState, action) => {
    switch(action.type){
        case ADD_WORK:
            let newState = JSON.parse(JSON.stringify(state))
            newState.workList.push(action.value)
            return newState
            
    }
    return state
}