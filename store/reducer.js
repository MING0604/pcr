import {TEST} from 'store/ActionType'

const defaultState = {
    test:'测试样例'
}

export default (state = defaultState, action) => {
    switch(action.type){
        case TEST:
            let newState = JSON.parse(JSON.stringify(state))
            newState.test = action.value
            console.log('reducer')
            return newState
    }
    return state
}