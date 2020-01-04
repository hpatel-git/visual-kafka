import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const drawerWidth = 240

MessagePublisher.propTypes = {
  message: PropTypes.string.isRequired,
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
  publishMessageHandler: PropTypes.func.isRequired,
  updateMessageHandler: PropTypes.func.isRequired,
  clearMessageHandler: PropTypes.func.isRequired,
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
}))

export default function MessagePublisher(props) {
  const classes = useStyles()
  const {
    activeConnection,
    publishMessageHandler,
    updateMessageHandler,
    clearMessageHandler,
    message,
  } = props
  const { configuration, selectedTopic } = activeConnection
  const { connectionName, bootstrapServerUrls } = configuration
  const [selectedValue, setSelectedValue] = React.useState('0')

  const handleChange = event => {
    setSelectedValue(event.target.value)
  }
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
            {connectionName} : ({bootstrapServerUrls}) ({' '}
            {selectedTopic.totalPartitions} )
          </Typography>
        </Grid>
        <Grid item xs>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={30}
            value={message}
            className={classes.fullWidth}
            placeholder="Please provide your message here"
            onChange={event => updateMessageHandler(event.target.value)}
          />
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {[...Array(selectedTopic.totalPartitions)].map((x, i) => (
              <FormControlLabel
                value="end"
                key={`${Math.random()}`}
                control={
                  <Radio
                    checked={selectedValue === `${i}`}
                    onChange={handleChange}
                    value={`${i}`}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': `${i}` }}
                  />
                }
                label={`${i}`}
                labelPlacement="end"
              />
            ))}
          </Grid>
        </Grid>
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
                onClick={() => publishMessageHandler(selectedValue)}
              >
                SEND
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                onClick={() => clearMessageHandler()}
                className={classes.leftMargin}
              >
                CLEAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
