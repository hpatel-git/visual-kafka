import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
} from './actionType'

const fs = require('fs')
const path = require('path')

export function fetchConnections() {
  return dispatch => {
    dispatch(fetchConnectionRequest())
    const settingFileLocation = path.resolve(__dirname, 'settings.json')
    if (fs.existsSync(settingFileLocation)) {
      const config = fs.readFileSync(settingFileLocation)
      dispatch(fetchConnectionSuccess(JSON.parse(config.toString())))
    } else {
      dispatch(fetchConnectionSuccess(undefined))
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

export function addConnections() {
  return dispatch => {
    dispatch(addConnectionRequest())
    dispatch(
      addConnectionSuccess({
        connectionName: 'TTS DEV',
      })
    )
  }
}
function addConnectionRequest() {
  return {
    type: ADD_CONNECTION,
  }
}

function addConnectionSuccess(data) {
  return {
    type: ADD_CONNECTION_SUCCESS,
    payload: data,
  }
}
