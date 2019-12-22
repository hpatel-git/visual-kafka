// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as publisherActions from '../../store/publisher/actionCreator'
import MessagePublisher from './MessagePublisher'

// $FlowFixMe
class MessagePublisherPage extends Component<Props> {
  publishMessageHandler = () => {
    const {
      publishMessage,
      activeConnection,
      message,
      updatePublishMessage,
    } = this.props
    const { configuration, selectedTopic } = activeConnection
    try {
      JSON.parse(message)
      publishMessage(configuration, selectedTopic, message)
    } catch (e) {
      updatePublishMessage('')
    }
  }

  clearMessageHandler = () => {
    const { updatePublishMessage } = this.props
    updatePublishMessage('')
  }

  updateMessageHandler = message => {
    const { updatePublishMessage } = this.props
    updatePublishMessage(message)
  }

  render() {
    const { activeConnection, isFetching, message } = this.props
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {activeConnection && (
          <MessagePublisher
            activeConnection={activeConnection}
            message={message}
            clearMessageHandler={this.clearMessageHandler}
            publishMessageHandler={this.publishMessageHandler}
            updateMessageHandler={this.updateMessageHandler}
          />
        )}
        {isFetching && <CircularProgress color="secondary" />}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { viewer, publisher } = state
  const { activeConnection } = viewer
  const { isFetching, message } = publisher
  return {
    activeConnection,
    isFetching,
    message,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  publisherActions
)(withRouter(MessagePublisherPage))
