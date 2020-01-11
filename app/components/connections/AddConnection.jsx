import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import NewConnection from './NewConnection'

AddConnection.propTypes = {
  addConnectionHandler: PropTypes.func.isRequired,
}

const useStyles = makeStyles(theme => ({
  card: {
    height: 155,
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))
export default function AddConnection(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { addConnectionHandler } = props

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleCloseWithoutSaving = () => {
    setOpen(false)
  }

  const handleSave = values => {
    addConnectionHandler(values)
    setOpen(false)
  }

  return (
    <>
      <Grid item xs={3}>
        <Card className={classes.card}>
          <CardContent>
            <NewConnection
              isOpen={open}
              handleSave={handleSave}
              handleCloseWithoutSaving={handleCloseWithoutSaving}
            />
            <div>
              <Tooltip title="Add New Connection">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => handleClickOpen()}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
