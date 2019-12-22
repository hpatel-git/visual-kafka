import {
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
  UPDATE_SELECTED_TOPIC,
} from './actionType'

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
