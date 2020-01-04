// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { render } from 'react-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as publisherActions from '../../store/publisher/actionCreator'
import MessagePublisher from './MessagePublisher'
import AppNotification from '../notification/AppNotification'
import appMessages from '../../constants/appMessages.json'
import variantType from '../../constants/variantType.json'
// $FlowFixMe
class MessagePublisherPage extends Component<Props> {
  publishMessageHandler = partitionNum => {
    const {
      publishMessage,
      activeConnection,
      message,
      updatePublishMessage,
    } = this.props
    const { configuration, selectedTopic } = activeConnection
    try {
      JSON.parse(message)
      const promise = publishMessage(
        configuration,
        selectedTopic,
        message,
        partitionNum
      )
      promise
        .then(result => this.showNotification(result, variantType.SUCCESS))
        .catch(err => this.showNotification(err, variantType.ERROR))
    } catch (e) {
      console.log('Error while publishing', e.stack)
      if (e.name === 'SyntaxError') {
        this.showNotification(appMessages.INVALID_JSON, variantType.ERROR)
      }
      updatePublishMessage('')
    }
  }

  showNotification = (notificationMessage, variant) => {
    const notification = (
      <AppNotification message={notificationMessage} variant={variant} />
    )
    const errorDiv = document.getElementById('errorDiv')
    if (errorDiv !== null) {
      const wrapperDiv = document.createElement('div')
      errorDiv.appendChild(wrapperDiv)
      render(notification, wrapperDiv)
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
