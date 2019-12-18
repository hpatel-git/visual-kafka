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
    /* console.log('**********')
    const client = new kafka.KafkaClient({kafkaHost: 'kafka-ttc-app.prod.target.com:9092'});
    console.log(client)
    const admin = new kafka.Admin(client)
    admin.listTopics((err, res) => {
      console.log('**********topics', res);
    }) */
    const { fetchConnections } = this.props
    fetchConnections()
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Connection connectionName="test" />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections } = state
  return {
    connections,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  connectionActions
)(ConnectionListPage)
