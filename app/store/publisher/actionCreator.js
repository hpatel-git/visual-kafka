import {
  PUBLISH_MESSAGE_REQUEST,
  PUBLISH_MESSAGE_SUCCESS,
  SHOW_NOTIFICATION,
  UPDATE_PUBLISH_MESSAGE,
} from './actionType'

const kafka = require('kafka-node')

export function publishMessage(config, selectedTopic, message) {
  return dispatch => {
    dispatch(publishMessageRequest())
    const client = new kafka.KafkaClient({
      kafkaHost: config.bootstrapServerUrls,
    })
    const producer = new kafka.Producer(client)
    const uniqueId =
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    const payload = [
      {
        topic: selectedTopic,
        messages: message,
        key: uniqueId,
      },
    ]
    producer.on('ready', () => {
      producer.send(payload, (err, data) => {
        console.log(data)
        dispatch(publishMessageSuccess())
      })
      producer.on('error', err => {
        dispatch(showNotification(err))
      })
    })
  }
}

function showNotification(err) {
  return {
    type: SHOW_NOTIFICATION,
    payload: err,
  }
}
export function updatePublishMessage(message) {
  return {
    type: UPDATE_PUBLISH_MESSAGE,
    payload: message,
  }
}

function publishMessageRequest() {
  return {
    type: PUBLISH_MESSAGE_REQUEST,
  }
}

function publishMessageSuccess() {
  return {
    type: PUBLISH_MESSAGE_SUCCESS,
  }
}
