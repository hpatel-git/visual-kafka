import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const drawerWidth = 240

ViewerHeader.propTypes = {
  selectedTopic: PropTypes.string,
}

ViewerHeader.defaultProps = {
  selectedTopic: '',
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
  logoutButton: {
    color: 'white',
  },
}))

export default function ViewerHeader(props) {
  const classes = useStyles()
  const { selectedTopic } = props
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: true,
      })}
    >
      <Toolbar>
        <Grid justify="space-between" alignItems="center" container>
          <Grid item>
            <Typography variant="h6" noWrap>
              Topic Detail Viewer
              {selectedTopic && <span> / {selectedTopic}</span>}
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/">
              <IconButton
                aria-label="Logout"
                className={classes.logoutButton}
                color="primary"
              >
                <ExitToAppIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
