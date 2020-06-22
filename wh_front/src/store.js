import { createStore } from 'redux';

export default createStore((state, action) => {
    if(state === undefined){
        return {}
    }
    if(action.type === 'token'){
        return Object.assign({}, state, {
            token: action.token
        })
    }
    if(action.type === 'weight'){
        return Object.assign({}, state, {
            weight: action.weight
        })
    }
    if(action.type === 'goal'){
        return Object.assign({}, state, {
            goal: action.goal
        })
    }
    if(action.type === 'intake'){
        return Object.assign({}, state, {
            intake: action.intake
        })
    }
    if(action.type === 'likes'){
        return Object.assign({}, state, {
            likes: action.likes
        })
    }
    if(action.type === 'nickname'){
        return Object.assign({}, state, {
            nickname: action.nickname
        })
    }
    if(action.type === 'point'){
        return Object.assign({}, state, {
            point: action.point
        })
    }
    if(action.type === 'day'){
        return Object.assign({}, state, {
            day: action.day
        })
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
