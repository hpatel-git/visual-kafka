import {
  CONSUME_MESSAGE_REQUEST,
  CONSUME_MESSAGE_SUCCESS,
  SHOW_NOTIFICATION,
  UPDATE_CONSUME_MESSAGE,
} from './actionType'

export const initialState = {
  isFetching: false,
  message: '',
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
    case SHOW_NOTIFICATION: {
      const { payload } = action
      const newState = {
        ...state,
        isError: true,
        errorMessage: payload,
      }
      return newState
    }
    case CONSUME_MESSAGE_REQUEST: {
      const newState = {
        ...state,
        isFetching: true,
      }
      return newState
    }
    case CONSUME_MESSAGE_SUCCESS: {
      const newState = {
        ...state,
        isFetching: false,
        message: '',
      }
      return newState
    }
    default:
      return state
  }
}
