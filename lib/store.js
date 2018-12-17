import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const defaultState = {
  answers: {}
}

export const actionTypes = {
  ANSWER: 'answer'
}

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ANSWER:
      var answers = {...state.answers}
      answers[action.question] = action.answer
      return Object.assign({}, state, {answers: {...answers}})
    default:
      return state
  }
}

// ACTIONS
export const dispatchAnswer = (question, answer) => dispatch => {
  return dispatch({ type: actionTypes.ANSWER, question: question, answer: answer })
}

export function initializeStore (initialState = defaultState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

