import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

const drawerWidth = 250

TopicViewer.propTypes = {
  updateSelectedTopic: PropTypes.func.isRequired,
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
}))

export default function TopicViewer(props) {
  const classes = useStyles()
  const { listOfTopics, updateSelectedTopic } = props
  const [open] = React.useState(true)
  const [searchedTopics, setSearchedTopics] = React.useState(listOfTopics)
  const placeHolderText = `Hit Enter to Search`
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
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
      <Divider />
      <List>
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
