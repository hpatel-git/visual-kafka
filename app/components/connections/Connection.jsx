import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Paper } from '@material-ui/core'

Connection.propTypes = {
  connectionName: PropTypes.string.isRequired,
}
export default function Connection(props) {
  const { connectionName } = props
  return (
    <>
      <Grid item xs={6} sm={3}>
        <Paper>{connectionName}</Paper>
      </Grid>
    </>
  )
}
