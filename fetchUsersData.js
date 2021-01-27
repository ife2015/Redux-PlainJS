//import redux
const redux = require('redux');

//npm middleware - redux-thunk
const reduxThunk = require('redux-thunk').default;

// store
const createStore = redux.createStore;

// apply middleware
const applyMiddleware = redux.applyMiddleware;

// axios 
const axios = require('axios');

// intial state 
const initialState = {
  loading: false,
  users: [],
  error: ''
}

// actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//actionCreators

function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// reducer 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}

// async action creators - handle api requests

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest())
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      const users = res.data.map(user => user.name); // [kevin, michelle, ife]
      dispatch(fetchUserSuccess(users));
    }).catch((err) => {
      //error
      dispatch(fetchUserFailure(err))
    })
  }
}



// store 
const store = createStore(reducer, applyMiddleware(reduxThunk));
store.subscribe(() => console.log("The ressult", store.getState().error));
store.dispatch(fetchUsers())
