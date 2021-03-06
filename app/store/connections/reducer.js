import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION_SUCCESS,
  DELETE_CONNECTION_SUCCESS,
} from './actionType'

export const initialState = {
  configurations: [],
  isFetching: false,
}

export default function connections(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CONNECTIONS: {
      const newState = {
        ...state,
        isFetching: true,
      }
      return newState
    }
    case FETCH_CONNECTIONS_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        configurations: payload,
      }
      return newState
    }
    case ADD_CONNECTION_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        configurations: [...state.configurations, payload],
      }
      return newState
    }
    case DELETE_CONNECTION_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        configurations: payload,
      }
      return newState
    }
    default:
      return state
  }
}
