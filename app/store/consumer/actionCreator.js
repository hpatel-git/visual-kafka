import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  UPDATE_CONSUME_MESSAGE,
  FILTER_MESSAGE,
  RESET_MESSAGES,
  CONNECT_SUCCESS,
  UPDATE_NUMBER_OF_MESSAGES,
} from './actionType'
import appMessages from '../../constants/appMessages.json'

const kafka = require('kafka-node')
const uuidv4 = require('uuid/v4')
const os = require('os')

const consumerOptions = {
  autoCommit: false,
  sessionTimeout: 15000,
  fetchMaxBytes: 1024 * 100,
  commitOffsetsOnFirstJoin: false,
  protocol: ['roundrobin'],
  fromOffset: 'earliest', // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
}
export const consumeMessage = (
  config,
  selectedTopic,
  numberOfMessages
) => dispatch => {
  const promise = new Promise((resolve, reject) => {
    consumerOptions.kafkaHost = config.bootstrapServerUrls
    consumerOptions.groupId = `VK-${os.hostname()}-${selectedTopic.topicName}`
    consumerOptions.id = `VK-${os.hostname()}-${selectedTopic.topicName}`
    console.log(consumerOptions)
    dispatch(consumeMessageRequest())
    const topics = [selectedTopic.topicName]
    const consumerGroup = new kafka.ConsumerGroup(consumerOptions, topics)
    let consumed = 0
    consumerGroup.on('message', inComingMessage => {
      consumed += 1
      if (consumed <= numberOfMessages) {
        dispatch(consumeMessageSuccess(inComingMessage))
      } else {
        closeConsumerGroup(consumerGroup, resolve)
      }
      console.log(consumed)
      if (inComingMessage.offset === inComingMessage.highWaterOffset - 1) {
        closeConsumerGroup(consumerGroup, resolve)
      }
    })

    consumerGroup.once('connect', () => {
      console.log(`Connected ${consumed}`)
      dispatch(connectedSuccess())
    })

    consumerGroup.on('error', err => {
      console.log(err)
      reject(new Error(`${appMessages.CONSUME_FAILURE} to ${selectedTopic}`))
    })
  })
  return promise
}

export function updateNumberOfMessage(numberOfMessage) {
  return {
    type: UPDATE_NUMBER_OF_MESSAGES,
    payload: numberOfMessage,
  }
}
function closeConsumerGroup(consumerGroup, resolve) {
  try {
    consumerGroup.close(true, () => {
      console.log('consumer has been closed..')
    })
  } catch (ex) {
    resolve(`Message Consumed Successfully`)
  }
}
export function filterMessageBySearchTerm(searchTerm) {
  return (dispatch, getState) => {
    const { consumer } = getState()
    const { consumedMessages } = consumer
    console.log(`${searchTerm.toLowerCase()}`)
    const filteredMessages = consumedMessages.filter(
      message =>
        message.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    dispatch(filterMessage(filteredMessages))
  }
}

export function connectedSuccess() {
  return {
    type: CONNECT_SUCCESS,
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
