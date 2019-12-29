import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
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
    const consumer = new kafka.Consumer(
      client,
      [
        { topic: selectedTopic.topicName, partition: 0 },
        { topic: selectedTopic.topicName, partition: 1 },
        { topic: selectedTopic.topicName, partition: 2 },
      ],
      {
        autoCommit: false,
        fromOffset: 'earliest',
      }
    )
    consumer.on('message', inComingMessage => {
      console.log(inComingMessage)
      dispatch(consumeMessageSuccess(inComingMessage))
      resolve(`${inComingMessage}`)
    })
    consumer.on('error', err => {
      console.log(err)
      reject(new Error(`${appMessages.CONSUME_FAILURE} to ${selectedTopic}`))
    })
  })
  return promise
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

function consumeMessageSuccess(inComingMessage) {
  return {
    type: CONSUME_MESSAGE_SUCCESS,
    payload: inComingMessage,
  }
}
