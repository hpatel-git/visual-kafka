// @flow
import React, { Component } from 'react'
import ConnectionListPage from '../components/connections/ConnectionListPage'
// var kafka = require('kafka-node')
// $FlowFixMe
export default class ConnectionPage extends Component<Props> {
  render() {
    const { connections } = this.props
    return <ConnectionListPage connections={connections} />
  }
}
