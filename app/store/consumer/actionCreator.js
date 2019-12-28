import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  SHOW_NOTIFICATION,
  UPDATE_CONSUME_MESSAGE,
} from './actionType'
import appMessages from '../../constants/appMessages.json'

const kafka = require('kafka-node')

export const consumeMessage = (config, selectedTopic) => dispatch => {
  const promise = new Promise((resolve, reject) => {
    dispatch(consumeMessageRequest())
    const client = new kafka.KafkaClient({
      kafkaHost: config.bootstrapServerUrls,
    })
    const consumer = new kafka.Consumer(client, [{ topic: selectedTopic }], {
      autoCommit: false,
    })
    consumer.on('message', inComingMessage => {
      console.log(inComingMessage)
      dispatch(consumeMessageSuccess())
      resolve(`${appMessages.PUBLISH_SUCCESS} to ${selectedTopic}`)
    })

    consumer.on('error', err => {
      dispatch(showNotification(err))
      reject(new Error(`${appMessages.PUBLISH_FAILURE} to ${selectedTopic}`))
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
export function updateConsumeMessage(message) {
  return {
    type: UPDATE_CONSUME_MESSAGE,
    payload: message,
  }
}

function consumeMessageRequest() {
  return {
    type: CONSUME_MESSAGE_REQUEST,
  }
}

function consumeMessageSuccess() {
  return {
    type: CONSUME_MESSAGE_SUCCESS,
  }
}
