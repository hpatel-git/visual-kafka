// @flow
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import type { HashHistory } from 'history'
import connections from './connections/reducer'
import viewer from './viewer/reducer'
import publisher from './publisher/reducer'
import consumer from './consumer/reducer'

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    connections,
    viewer,
    publisher,
    consumer,
  })
}
