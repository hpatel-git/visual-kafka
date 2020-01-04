import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import StorageIcon from '@material-ui/icons/Storage'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import ListSubheader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button'

import AddTopic from './AddTopic'

const drawerWidth = 250

TopicViewer.propTypes = {
  updateSelectedTopic: PropTypes.func.isRequired,
  addTopicHandler: PropTypes.func.isRequired,
  listOfTopics: PropTypes.arrayOf(
    PropTypes.shape({
      topicName: PropTypes.string.isRequired,
      totalPartitions: PropTypes.number.isRequired,
    })
  ).isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  addButton: {
    marginLeft: '35px',
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(0),
    height: '100%',
    position: 'absolute',
    left: '-15px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function TopicViewer(props) {
  const classes = useStyles()
  const { listOfTopics, updateSelectedTopic } = props
  const [searchedTopics, setSearchedTopics] = React.useState(listOfTopics)
  const placeHolderText = `Hit Enter to Search`
  const [open, setOpen] = React.useState(false)
  const [isSideBarOpen] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleCloseWithoutSaving = () => {
    setOpen(false)
  }

  const handleSave = values => {
    const { addTopicHandler } = props
    addTopicHandler(values)
    setOpen(false)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isSideBarOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AddTopic
        isOpen={open}
        handleSave={handleSave}
        handleCloseWithoutSaving={handleCloseWithoutSaving}
      />
      <div className={classes.drawerHeader}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            autoFocus
            placeholder={placeHolderText}
            helpertext="Topic Name"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                setSearchedTopics(
                  listOfTopics.filter(item =>
                    item.topicName
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                )
              }
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
      <Divider />
      <List>
        <ListSubheader>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => handleClickOpen()}
            startIcon={<AddIcon />}
          >
            Add Topic
          </Button>
        </ListSubheader>
        {searchedTopics && searchedTopics.length ? (
          searchedTopics.map(item => (
            <ListItem
              button
              key={item.topicName}
              onClick={() => updateSelectedTopic(item)}
            >
              <ListItemIcon>
                <StorageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.topicName} />
            </ListItem>
          ))
        ) : (
          <ListItem button onClick={() => setSearchedTopics(listOfTopics)}>
            <ListItemIcon>
              <ClearIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="No Topic Found" />
          </ListItem>
        )}
      </List>
    </Drawer>
  )
}
