import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import TopicViewer from './TopicViewer'
import ViewerHeader from './ViewerHeader'

const drawerWidth = 240

ViewerLayout.propTypes = {
  updateSelectedTopic: PropTypes.func.isRequired,
  activeConnection: PropTypes.shape({
    listOfTopics: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ).isRequired,
    selectedTopic: PropTypes.string,
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
  const { listOfTopics, selectedTopic } = activeConnection

  return (
    <div className={classes.root}>
      <CssBaseline />
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
        <Typography paragraph>Topic Content Goes here ? </Typography>
      </main>
    </div>
  )
}
