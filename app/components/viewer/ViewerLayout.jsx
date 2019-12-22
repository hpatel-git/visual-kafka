import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
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
  return (
    <div className={classes.root}>
      <CssBaseline />
      {isFetching && <CircularProgress disableShrink />}
      {selectedTopic && <ViewerHeader selectedTopic={selectedTopic} />}
      {!selectedTopic && <ViewerHeader selectedTopic="" />}
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
        {selectedTopic && <MessagePublisherPage />}
      </main>
    </div>
  )
}
