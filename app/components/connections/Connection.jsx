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
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

Connection.propTypes = {
  connectionDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    connectionName: PropTypes.string.isRequired,
    connectionDesc: PropTypes.string.isRequired,
    bootstrapServerUrls: PropTypes.string.isRequired,
  }).isRequired,
  connectEventHandler: PropTypes.func.isRequired,
  deleteConnectionHandler: PropTypes.func.isRequired,
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
  titleColor: {
    color: 'black',
    textColor: '#fff',
    fontColor: 'black',
  },
}))
export default function Connection(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAggree = connectionId => {
    setOpen(false)
    const { deleteConnectionHandler } = props
    deleteConnectionHandler(connectionId)
  }
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
              <Fab
                color="primary"
                size="small"
                aria-label="edit"
                onClick={handleClickOpen}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span className={classes.titleColor}>Confirmation</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete connection ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleAggree(connectionDetails.id)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
