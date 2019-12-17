// @flow
import * as React from 'react'

export default class App extends React.Component<Props> {
  props: Props

  render() {
    const { children } = this.props
    return <>{children}</>
  }
}
