import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import TopicViewer from './TopicViewer'
import ViewerHeader from './ViewerHeader'
import MessagePublisherPage from '../publisher/MessagePublisherPage'

const drawerWidth = 240

ViewerLayout.propTypes = {
  updateSelectedTopic: PropTypes.func.isRequired,
  activeConnection: PropTypes.shape({
    listOfTopics: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ).isRequired,
    selectedTopic: PropTypes.string,
    isFetching: PropTypes.bool,
  }).isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function ViewerLayout(props) {
  const classes = useStyles()
  const { activeConnection, updateSelectedTopic } = props
  const { listOfTopics, selectedTopic, isFetching } = activeConnection
  const defaultHeader = `(${listOfTopics.length})`
  return (
    <div className={classes.root}>
      <CssBaseline />
      {isFetching && <CircularProgress disableShrink />}
      {selectedTopic && <ViewerHeader selectedTopic={selectedTopic} />}
      {!selectedTopic && <ViewerHeader selectedTopic={defaultHeader} />}
      <TopicViewer
        listOfTopics={listOfTopics}
        updateSelectedTopic={updateSelectedTopic}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: true,
        })}
      >
        <div className={classes.drawerHeader} />

        {selectedTopic && (
          <>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Message Consumer
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Message Publisher
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <MessagePublisherPage />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        )}
      </main>
    </div>
  )
}
