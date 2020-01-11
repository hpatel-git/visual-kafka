// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { render } from 'react-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as consumerActions from '../../store/consumer/actionCreator'
import MessageConsumer from './MessageConsumer'
import AppNotification from '../notification/AppNotification'
import variantType from '../../constants/variantType.json'
// $FlowFixMe
const styles = theme => ({
  root: {
    position: 'fixed',
    padding: theme.spacing(20, 60),
    // display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: 'center',
  },
})
class MessageConsumerPage extends Component<Props> {
  consumeMessageHandler = () => {
    const { activeConnection, consumeMessage, numberOfMessages } = this.props
    const { configuration, selectedTopic } = activeConnection
    try {
      const promise = consumeMessage(
        configuration,
        selectedTopic,
        numberOfMessages
      )
      promise
        // .then(result => this.showNotification(result, variantType.SUCCESS))
        .catch(err => this.showNotification(err.message, variantType.ERROR))
    } catch (e) {
      console.log('Error while publishing', e.stack)
      this.showNotification('Error while publishing', variantType.ERROR)
    }
  }

  searchMessageHandler = searchTerms => {
    const { filterMessageBySearchTerm } = this.props
    filterMessageBySearchTerm(searchTerms)
  }

  updateNumberOfMessage = numberOfMessages => {
    const { updateNumberOfMessage } = this.props
    updateNumberOfMessage(parseInt(numberOfMessages, 10))
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

  resetMessagesHandler = () => {
    const { resetMessages } = this.props
    resetMessages()
  }

  render() {
    const {
      activeConnection,
      isFetching,
      filteredMessages,
      classes,
      numberOfMessages,
    } = this.props
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {activeConnection && (
          <MessageConsumer
            activeConnection={activeConnection}
            filteredMessages={filteredMessages}
            numberOfMessages={numberOfMessages}
            consumeMessageHandler={this.consumeMessageHandler}
            searchMessageHandler={this.searchMessageHandler}
            resetMessagesHandler={this.resetMessagesHandler}
            updateNumberOfMessageHandler={this.updateNumberOfMessage}
          />
        )}
        {isFetching && (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        )}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { viewer, consumer } = state
  const { activeConnection } = viewer
  const { filteredMessages, isFetching, numberOfMessages } = consumer
  return {
    activeConnection,
    isFetching,
    filteredMessages,
    numberOfMessages,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  consumerActions
)(withRouter(withStyles(styles)(MessageConsumerPage)))
