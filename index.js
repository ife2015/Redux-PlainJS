// import redux
const redux = require('redux');

//import middleware
const reduxLogger = require('redux-logger');

// store creation
const createStore = redux.createStore;

// redux method combineReducer
const combineReducer = redux.combineReducers;

// import applyMiddleWaree Method.
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

// action variable
const BUY_CAKE = `BUY_CAKE`
const BUY_ICECREAM = `BUY_ICECREAM`

//Intial state
const initialStateCake = {
  numOfCakes: 10
}

const initialStateIceCream = {
  numOfIceCreams: 20
}

//action 
// actionCreators - function return action

function buyCake() {
  return {
    type: BUY_CAKE
  }
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM
  }
}

// reducer
// reducer - (prevState, action) => new State
const cakeReducer = (state = initialStateCake, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numOfCakes: state.numOfCakes - 1
      }
    default: return state
  }
}

const iceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        numOfIceCreams: state.numOfIceCreams - 1
      }
    default: return state
  }
}

// Combine Reducers
const rootReducers = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

//Store takes in the reducer function 
const store = createStore(rootReducers, applyMiddleWare(logger));
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => { })

// sends actions to the reducer
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());


// changes stop being made to the state
unsubscribe();

// console.log(store.getState());


// Check the state currently in the application
//  - getState()
// Allows send/dispatch actions to the store
//  - dispatch()
// Subscribe (act as a reciept) telling us of the changes in the state
//  - subscribe()
// Allows us to unregister to any changes to being made to state
//