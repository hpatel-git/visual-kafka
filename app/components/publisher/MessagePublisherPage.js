// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as connectionActions from '../../store/connections/actionCreator'
import MessagePublisher from './MessagePublisher'

// $FlowFixMe
class MessagePublisherPage extends Component<Props> {
  render() {
    const { activeConnection } = this.props
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {activeConnection && (
          <MessagePublisher activeConnection={activeConnection} />
        )}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections } = state
  const { activeConnection } = connections
  return {
    activeConnection,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  connectionActions
)(withRouter(MessagePublisherPage))
