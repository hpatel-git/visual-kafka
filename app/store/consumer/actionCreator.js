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
    const consumerOptions = {
      kafkaHost: config.bootstrapServerUrls,
      groupId: 'visual-kafka',
      autoCommit: false,
      id: 'visual-kafka',
      sessionTimeout: 15000,
      commitOffsetsOnFirstJoin: false,
      protocol: ['roundrobin'],
      fromOffset: 'earliest', // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
    }
    const topics = [selectedTopic.topicName]
    const consumerGroup = new kafka.ConsumerGroup(consumerOptions, topics)
    console.log(consumerGroup)
    consumerGroup.on('message', inComingMessage => {
      console.log(inComingMessage)
      dispatch(consumeMessageSuccess(inComingMessage))
      resolve(`${inComingMessage}`)
    })

    consumerGroup.on('error', err => {
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
