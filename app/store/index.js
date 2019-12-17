// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import type { HashHistory } from 'history'
import connections from './connections/reducer'

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    connections,
  })
}
