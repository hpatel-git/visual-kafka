import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import MessageListViewer from './MessageListViewer'

const drawerWidth = 240

MessageConsumer.propTypes = {
  consumeMessageHandler: PropTypes.func.isRequired,
  consumedMessages: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      partition: PropTypes.number.isRequired,
      highWaterOffset: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
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
  const { activeConnection, consumeMessageHandler, consumedMessages } = props
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
        {consumedMessages && (
          <Grid item xs>
            <div className={classes.messageListViewer}>
              <MessageListViewer consumedMessages={consumedMessages} />
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
              >
                STOP
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
