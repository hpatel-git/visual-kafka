import {
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
  UPDATE_SELECTED_TOPIC,
  RESET_VIEW_LAYOUT,
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
      const mappedValue = Object.entries(
        res[1].metadata
      ).map(([key, value]) => [
        { topicName: key, totalPartitions: Object.keys(value).length },
      ])
      const flatMap = mappedValue.flat(1)
      dispatch(
        fetchListOfTopicsSuccess({
          listOfTopics: flatMap,
          configuration: config,
        })
      )
    })
  }
}

export function createTopic(topicForm, config) {
  console.log(`>>>>> ${config}`)
  return dispatch => {
    const client = new kafka.KafkaClient({
      kafkaHost: config.bootstrapServerUrls,
    })
    const admin = new kafka.Admin(client)
    admin.createTopics([topicForm], () => {
      dispatch(fetchListOfTopics(config))
    })
  }
}

export function updateSelectedTopic(topicName) {
  return {
    type: UPDATE_SELECTED_TOPIC,
    payload: topicName,
  }
}

export function resetViewLayout() {
  return {
    type: RESET_VIEW_LAYOUT,
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
