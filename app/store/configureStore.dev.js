import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createRootReducer from './index'
import * as connectionActions from './connections/actionCreator'
import * as viewerActions from './viewer/actionCreator'
import * as publisherActions from './publisher/actionCreator'

const history = createHashHistory()
const rootReducer = createRootReducer(history)

const configureStore = () => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...publisherActions,
    ...viewerActions,
    ...connectionActions,
    ...routerActions,
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
      })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, enhancer)

  if (module.hot) {
    module.hot.accept(
      './index',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./index').default)
    )
  }
  return store
}

export default { configureStore, history }
