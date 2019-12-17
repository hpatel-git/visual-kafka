import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
} from './actionType'

export function fetchConnections() {
  return dispatch => {
    dispatch(fetchConnectionRequest())
    dispatch(
      fetchConnectionSuccess({
        connectionName: 'TTS DEV',
      })
    )
  }
}
function fetchConnectionRequest() {
  return {
    type: FETCH_CONNECTIONS,
  }
}

function fetchConnectionSuccess() {
  return {
    type: FETCH_CONNECTIONS_SUCCESS,
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
