import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
} from './actionType'

const fs = require('fs')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

const settingFileLocation = path.join(userDataPath, 'settings.json')

export function fetchConnections() {
  return dispatch => {
    dispatch(fetchConnectionRequest())
    if (fs.existsSync(settingFileLocation)) {
      const config = fs.readFileSync(settingFileLocation)
      dispatch(fetchConnectionSuccess(JSON.parse(config.toString())))
    } else {
      dispatch(fetchConnectionSuccess([]))
    }
  }
}

function fetchConnectionRequest() {
  return {
    type: FETCH_CONNECTIONS,
  }
}

function fetchConnectionSuccess(configurations) {
  return {
    type: FETCH_CONNECTIONS_SUCCESS,
    payload: configurations,
  }
}

export function addConnections(newConnection) {
  return (dispatch, getState) => {
    const { connections } = getState()
    const { configurations } = connections
    let updatedList = []
    if (configurations) {
      updatedList = [...configurations, newConnection]
    } else {
      updatedList = [newConnection]
    }
    const jsonString = JSON.stringify(updatedList, null, '  ')
    dispatch(addConnectionRequest())
    try {
      fs.writeFileSync(settingFileLocation, jsonString, {
        encoding: 'utf8',
        flag: 'w',
      })
    } catch (err) {
      alert(err)
    }
    dispatch(addConnectionSuccess(newConnection))
  }
}
function addConnectionRequest() {
  return {
    type: ADD_CONNECTION,
  }
}

function addConnectionSuccess(newConnection) {
  return {
    type: ADD_CONNECTION_SUCCESS,
    payload: newConnection,
  }
}
