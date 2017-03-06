import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  // Create the store with middlewares
  const middlewares = [
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    rootReducer
  , initialState
  , compose(...enhancers)
  )

  // Extensions
  store.asyncReducers = {} // Async reducer registry

  return store
}
