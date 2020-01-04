// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import * as viewerActionsCreator from '../../store/viewer/actionCreator'
import * as consumerActionsCreator from '../../store/consumer/actionCreator'
import routes from '../../constants/routes.json'
import ViewerLayout from './ViewerLayout'

const styles = theme => ({
  root: {
    padding: theme.spacing(50, 80),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
// $FlowFixMe
class ViewerLayoutPage extends Component<Props> {
  componentDidMount() {
    const { configurations, viewerActions, match, history } = this.props
    const { fetchListOfTopics } = viewerActions
    const selectedConfig = configurations.filter(
      config => config.id === match.params.id
    )[0]
    if (selectedConfig === undefined) {
      history.push(routes.CONNECTIONS)
    } else {
      fetchListOfTopics(selectedConfig)
    }
  }

  exitViewerHandler = () => {
    const { history, viewerActions } = this.props
    const { resetViewLayout } = viewerActions
    resetViewLayout()
    history.push(routes.CONNECTIONS)
  }

  updateSelectedTopic = topicName => {
    const { viewerActions, consumerActions } = this.props
    const { updateSelectedTopic } = viewerActions
    const { resetMessages } = consumerActions
    updateSelectedTopic(topicName)
    resetMessages()
  }

  render() {
    const { activeConnection, isFetching, classes } = this.props
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {activeConnection && (
          <ViewerLayout
            activeConnection={activeConnection}
            exitViewerHandler={this.exitViewerHandler}
            updateSelectedTopic={this.updateSelectedTopic}
          />
        )}
        {isFetching && (
          <Grid item>
            <div className={classes.root}>
              <CircularProgress />
            </div>
          </Grid>
        )}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections, viewer } = state
  const { configurations } = connections
  const { activeConnection, isFetching } = viewer
  return {
    configurations,
    activeConnection,
    isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    consumerActions: bindActionCreators(consumerActionsCreator, dispatch),
    viewerActions: bindActionCreators(viewerActionsCreator, dispatch),
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ViewerLayoutPage)))
