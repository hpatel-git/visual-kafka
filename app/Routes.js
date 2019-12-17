import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './constants/routes.json'
import App from './containers/App'
import ConnectionPage from './containers/ConnectionPage'

export default () => (
  <App>
    <Switch>
      <Route path={routes.CONNECTIONS} component={ConnectionPage} />
    </Switch>
  </App>
)
