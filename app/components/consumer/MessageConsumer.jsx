import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MessageListViewer from './MessageListViewer'

const drawerWidth = 240

MessageConsumer.propTypes = {
  consumeMessageHandler: PropTypes.func.isRequired,
  searchMessageHandler: PropTypes.func.isRequired,
  resetMessagesHandler: PropTypes.func.isRequired,
  updateNumberOfMessageHandler: PropTypes.func.isRequired,
  filteredMessages: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      partition: PropTypes.number.isRequired,
      highWaterOffset: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  activeConnection: PropTypes.shape({
    listOfTopics: PropTypes.arrayOf(
      PropTypes.shape({
        topicName: PropTypes.string.isRequired,
        totalPartitions: PropTypes.number.isRequired,
      })
    ).isRequired,
    selectedTopic: PropTypes.shape({
      topicName: PropTypes.string.isRequired,
      totalPartitions: PropTypes.number.isRequired,
    }).isRequired,
    configuration: PropTypes.shape({
      connectionName: PropTypes.string.isRequired,
      bootstrapServerUrls: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  numberOfMessages: PropTypes.number.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  leftMargin: {
    marginLeft: '10px',
  },
  totalMessages: {
    marginLeft: '10px',
    marginBottom: '-15px',
  },
  fullWidth: {
    width: '876px',
  },
  messageListViewer: {
    height: '500px',
    width: '100%',
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'auto',
  },
}))

export default function MessageConsumer(props) {
  const classes = useStyles()
  const {
    activeConnection,
    consumeMessageHandler,
    filteredMessages,
    searchMessageHandler,
    resetMessagesHandler,
    numberOfMessages,
    updateNumberOfMessageHandler,
  } = props
  const { configuration } = activeConnection
  const { connectionName, bootstrapServerUrls } = configuration
  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs>
          <Typography variant="caption" display="block" gutterBottom>
            {connectionName} : ({bootstrapServerUrls})
          </Typography>
        </Grid>
        {filteredMessages && (
          <Grid item xs>
            <div className={classes.messageListViewer}>
              <MessageListViewer
                filteredMessages={filteredMessages}
                searchMessageHandler={searchMessageHandler}
              />
            </div>
          </Grid>
        )}
        <Grid item xs>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                className={classes.leftMargin}
                onClick={() => consumeMessageHandler()}
              >
                START
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                className={classes.leftMargin}
                onClick={() => resetMessagesHandler()}
              >
                CLEAR
              </Button>
            </Grid>
            <Grid item xs>
              <TextField
                id="connectionName"
                type="number"
                name="connectionName"
                value={numberOfMessages}
                helperText="Max Messages"
                style={{ margin: 6 }}
                placeholder="Message Count"
                onChange={event =>
                  updateNumberOfMessageHandler(event.target.value)
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
