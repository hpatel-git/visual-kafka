// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as connectionActions from '../../store/connections/actionCreator'

import ViewerLayout from './ViewerLayout'
// $FlowFixMe
class ViewerLayoutPage extends Component<Props> {
  componentDidMount() {
    const { configurations, fetchListOfTopics, match } = this.props
    const selectedConfig = configurations.filter(
      config => config.id === match.params.id
    )[0]
    fetchListOfTopics(selectedConfig)
  }

  updateSelectedTopic = topicName => {
    const { updateSelectedTopic } = this.props
    updateSelectedTopic(topicName)
  }

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
          <ViewerLayout
            activeConnection={activeConnection}
            updateSelectedTopic={this.updateSelectedTopic}
          />
        )}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections } = state
  const { configurations, activeConnection } = connections
  return {
    configurations,
    activeConnection,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  connectionActions
)(withRouter(ViewerLayoutPage))
