// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as connectionActions from '../../store/connections/actionCreator'

import Connection from './Connection'
// $FlowFixMe
class ConnectionListPage extends Component<Props> {
  componentDidMount() {
    const { fetchConnections } = this.props
    fetchConnections()
  }

  connectEventHandler = connectionDetails => {
    console.log(connectionDetails)
    const { fetchListOfTopics } = this.props
    fetchListOfTopics(connectionDetails)
  }

  render() {
    const { configurations } = this.props
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {configurations &&
          configurations.map(config => (
            <Connection
              key={config.id}
              connectionDetails={config}
              connectEventHandler={this.connectEventHandler}
            />
          ))}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections } = state
  const { configurations } = connections
  return {
    configurations,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  connectionActions
)(ConnectionListPage)
