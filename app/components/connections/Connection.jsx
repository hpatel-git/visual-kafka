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
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'

Connection.propTypes = {
  connectionDetails: PropTypes.shape({
    connectionName: PropTypes.string.isRequired,
    connectionDesc: PropTypes.string.isRequired,
    bootstrapServerUrls: PropTypes.string.isRequired,
  }).isRequired,
  connectEventHandler: PropTypes.func.isRequired,
}

const useStyles = makeStyles(theme => ({
  card: {
    height: 155,
    marginRight: theme.spacing(2),
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
}))
export default function Connection(props) {
  const classes = useStyles()
  const { connectionDetails, connectEventHandler } = props
  return (
    <>
      <Grid item xs={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {connectionDetails.connectionName}
            </Typography>
            <Typography variant="body2" component="p">
              {connectionDetails.connectionDesc}
            </Typography>
            <Typography variant="body2" component="p">
              {connectionDetails.bootstrapServerUrls}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Connect">
              <Fab
                color="primary"
                size="small"
                className={classes.actionButtons}
                aria-label="connect"
                onClick={() => connectEventHandler(connectionDetails)}
              >
                <PlayCircleOutlineIcon />
              </Fab>
            </Tooltip>
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
