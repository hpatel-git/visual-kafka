import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
  UPDATE_SELECTED_TOPIC,
} from './actionType'

const fs = require('fs')
const path = require('path')
const kafka = require('kafka-node')

export function fetchListOfTopics(config) {
  return dispatch => {
    dispatch(fetchListOfTopicsRequest())
    const client = new kafka.KafkaClient({
      kafkaHost: config.bootstrapServerUrls,
    })
    const admin = new kafka.Admin(client)
    admin.listTopics((err, res) => {
      dispatch(
        fetchListOfTopicsSuccess({
          listOfToipcs: Object.keys(res[1].metadata),
          configuration: config,
        })
      )
    })
  }
}

export function updateSelectedTopic(topicName) {
  return {
    type: UPDATE_SELECTED_TOPIC,
    payload: topicName,
  }
}
function fetchListOfTopicsRequest() {
  return {
    type: FETCH_LIST_OF_TOPICS,
  }
}

function fetchListOfTopicsSuccess(payload) {
  return {
    type: FETCH_LIST_OF_TOPICS_SUCCESS,
    payload,
  }
}
export function fetchConnections() {
  return dispatch => {
    dispatch(fetchConnectionRequest())
    const config = fs.readFileSync(path.resolve(__dirname, 'settings.json'))
    console.log(config.toString())
    dispatch(fetchConnectionSuccess(JSON.parse(config.toString())))
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
