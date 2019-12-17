// @flow
import React from 'react'
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import Connection from './Connection'

export default function ConnectionListPage() {
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
