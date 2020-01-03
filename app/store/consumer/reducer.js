import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  UPDATE_CONSUME_MESSAGE,
  FILTER_MESSAGE,
} from './actionType'

export const initialState = {
  isFetching: false,
  consumedMessages: [],
  filteredMessages: [],
}

export default function consumer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CONSUME_MESSAGE: {
      const { payload } = action
      const newState = {
        ...state,
        message: payload,
      }
      return newState
    }
    case CONSUME_MESSAGE_REQUEST: {
      const newState = {
        ...state,
        isFetching: true,
        consumedMessages: [],
        filteredMessages: [],
      }
      return newState
    }
    case CONSUME_MESSAGE_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        consumedMessages: [...state.consumedMessages, payload],
        filteredMessages: [...state.filteredMessages, payload],
      }
      return newState
    }
    case FILTER_MESSAGE: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        filteredMessages: payload,
      }
      return newState
    }
    default:
      return state
  }
}
