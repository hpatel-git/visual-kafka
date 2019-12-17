// @flow
import React from 'react'
import { Grid, Paper } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

export default function ConnectionListPage() {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={6} sm={3}>
        <Paper>xs=12</Paper>
      </Grid>
    </Grid>
  )
}
