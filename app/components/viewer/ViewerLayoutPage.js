// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import * as viewerActions from '../../store/viewer/actionCreator'
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
    const { configurations, fetchListOfTopics, match, history } = this.props
    const selectedConfig = configurations.filter(
      config => config.id === match.params.id
    )[0]
    if (selectedConfig === undefined) {
      history.push(routes.CONNECTIONS)
    } else {
      fetchListOfTopics(selectedConfig)
    }
  }

  updateSelectedTopic = topicName => {
    const { updateSelectedTopic } = this.props
    updateSelectedTopic(topicName)
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

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  viewerActions
)(withRouter(withStyles(styles)(ViewerLayoutPage)))
