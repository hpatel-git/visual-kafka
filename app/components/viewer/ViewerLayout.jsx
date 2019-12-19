import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Typography,
  Fab,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

ViewerLayout.propTypes = {
  listOfTopics: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  actionButtons: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})
export default function ViewerLayout(props) {
  const classes = useStyles()
  const { listOfTopics } = props
  return (
    <>
      <Grid item xs={6} sm={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Welcome to Viewer Page
            </Typography>
            {listOfTopics &&
              listOfTopics.map(topicName => <div>${topicName}</div>)}
          </CardContent>
          <CardActions>
            <Tooltip title="Edit Connection">
              <Fab
                color="primary"
                size="small"
                className={classes.actionButtons}
                aria-label="edit"
              >
                <EditIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Delete Connection">
              <Fab color="primary" size="small" aria-label="edit">
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
