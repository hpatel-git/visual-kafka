import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  UPDATE_CONSUME_MESSAGE,
} from './actionType'
import appMessages from '../../constants/appMessages.json'

const kafka = require('kafka-node')

const consumerOptions = {
  autoCommit: false,
  sessionTimeout: 15000,
  commitOffsetsOnFirstJoin: false,
  protocol: ['roundrobin'],
  fromOffset: 'earliest', // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
}
export const consumeMessage = (config, selectedTopic) => dispatch => {
  const promise = new Promise((resolve, reject) => {
    consumerOptions.kafkaHost = config.bootstrapServerUrls
    consumerOptions.groupId = `visual-kafka-${selectedTopic.topicName}`
    consumerOptions.id = `visual-kafka-${selectedTopic.topicName}`
    dispatch(consumeMessageRequest())
    const topics = [selectedTopic.topicName]
    const consumerGroup = new kafka.ConsumerGroup(consumerOptions, topics)
    console.log(consumerGroup)
    let messageCounter = 0
    consumerGroup.on('message', inComingMessage => {
      messageCounter += 1
      if (messageCounter > 10) {
        closeConnectionGroup(consumerGroup, resolve)
      }
      dispatch(consumeMessageSuccess(inComingMessage))
      if (inComingMessage.offset === inComingMessage.highWaterOffset - 1) {
        console.log(` Closing now .....? ? ? ${messageCounter > 10}`)
        closeConnectionGroup(consumerGroup, resolve)
      }
    })

    consumerGroup.on('error', err => {
      console.log(err)
      reject(new Error(`${appMessages.CONSUME_FAILURE} to ${selectedTopic}`))
    })
  })
  return promise
}

function closeConnectionGroup(consumerGroup, resolve) {
  try {
    consumerGroup.close(true, () => {
      console.log('consumer has been closed..')
    })
  } catch (ex) {
    resolve(`Message Consumed Successfully`)
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

function consumeMessageSuccess(inComingMessage) {
  return {
    type: CONSUME_MESSAGE_SUCCESS,
    payload: inComingMessage,
  }
}
