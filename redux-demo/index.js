const redux = require('redux');
const reduxLogger = require('redux-logger')

//Create redux store
const createStore = redux.createStore
const combineReducers = redux.combineReducers
//Create middleware
const applyMiddleware = redux.applyMiddleware
//creating a logger
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return {
        type : BUY_CAKE,
        info : 'First redux action'
    }
}

function buyIceCream(){
    return {
        type : BUY_ICECREAM,
        info : 'second redux action'
    }
}

//(previousState, action) => newState

// const initialState = {
//     numOfCakes : 10,
//     numOfIceCreams : 20
// }

const initialCakeState = {
    numOfCakes : 10
}
const initialIceCreamState = {
    numOfIceCreams : 20
}

// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numOfCakes : state.numOfCakes - 1
//         }
//         case BUY_ICECREAM: return{
//             ...state,
//             numOfIceCreams : state.numOfIceCreams-1
//         }

//         default : return state
//     }
// }

//separate reducers for separate actions to reduce complexity
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes : state.numOfCakes - 1
        }

        default : return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCreams : state.numOfIceCreams-1
        }

        default : return state
    }
}

//combining all the reducers to pass it to the store as a single reducer
const rootReducer = combineReducers({
    cake : cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger));

//allows access to get state via getState()
console.log('Initial State', store.getState());

//registers listers when there is a change in state
const unsubscribe = store.subscribe(() => {})

//allows state to be updated via dispatch(action)
//here we used action creater
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

//unsubscribe to listeners
unsubscribe()
