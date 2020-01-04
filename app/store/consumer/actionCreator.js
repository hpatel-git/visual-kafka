import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  UPDATE_CONSUME_MESSAGE,
  FILTER_MESSAGE,
  RESET_MESSAGES,
} from './actionType'
import appMessages from '../../constants/appMessages.json'

const kafka = require('kafka-node')
const uuidv4 = require('uuid/v4')

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
    consumerGroup.on('message', inComingMessage => {
      dispatch(consumeMessageSuccess(inComingMessage))
      if (inComingMessage.offset === inComingMessage.highWaterOffset - 1) {
        try {
          consumerGroup.close(true, () => {
            console.log('consumer has been closed..')
          })
        } catch (ex) {
          resolve(`Message Consumed Successfully`)
        }
      }
    })

    consumerGroup.on('error', err => {
      console.log(err)
      reject(new Error(`${appMessages.CONSUME_FAILURE} to ${selectedTopic}`))
    })
  })
  return promise
}

export function filterMessageBySearchTerm(searchTerm) {
  return (dispatch, getState) => {
    const { consumer } = getState()
    const { consumedMessages } = consumer
    const filteredMessages = consumedMessages.filter(
      message =>
        message.key.includes(searchTerm) || message.value.includes(searchTerm)
    )
    dispatch(filterMessage(filteredMessages))
  }
}

export function resetMessages() {
  return {
    type: RESET_MESSAGES,
  }
}

export function filterMessage(filteredMessages) {
  return {
    type: FILTER_MESSAGE,
    payload: filteredMessages,
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
  let inComingMessageWithKey
  console.log(inComingMessage)
  if (!inComingMessage.key) {
    inComingMessageWithKey = Object.assign(inComingMessage, {
      key: `VK_${uuidv4()}`,
    })
  } else {
    inComingMessageWithKey = Object.assign(inComingMessage)
  }

  return {
    type: CONSUME_MESSAGE_SUCCESS,
    payload: inComingMessageWithKey,
  }
}
