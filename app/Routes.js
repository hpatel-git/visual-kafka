import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './constants/routes.json'
import App from './containers/App'
import ConnectionPage from './containers/ConnectionPage'
import ViewerPage from './containers/ViewerPage'

export default () => (
  <App>
    <Switch>
      <Route path={routes.CONNECTIONS} exact component={ConnectionPage} />
      <Route path={routes.VIEWER} exact component={ViewerPage} />
    </Switch>
  </App>
)
