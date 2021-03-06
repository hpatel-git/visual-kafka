import {
  PUBLISH_MESSAGE_REQUEST,
  PUBLISH_MESSAGE_SUCCESS,
  SHOW_NOTIFICATION,
  UPDATE_PUBLISH_MESSAGE,
} from './actionType'
import appMessages from '../../constants/appMessages.json'

const kafka = require('kafka-node')

export const publishMessage = (
  config,
  selectedTopic,
  message,
  partitionNum
) => dispatch => {
  const promise = new Promise((resolve, reject) => {
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
        topic: selectedTopic.topicName,
        messages: message,
        key: uniqueId,
        partition: partitionNum,
      },
    ]
    console.log(payload)
    producer.on('ready', () => {
      producer.send(payload, (err, data) => {
        console.log(err, data)
        dispatch(publishMessageSuccess())
        resolve(`${appMessages.PUBLISH_SUCCESS}`)
      })
      producer.on('error', err => {
        dispatch(showNotification(err))
        reject(
          new Error(
            `${appMessages.PUBLISH_FAILURE} to ${selectedTopic.topicName}`
          )
        )
      })
    })
  })
  return promise
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
