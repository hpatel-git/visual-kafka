import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
} from './actionType'

export const initialState = {
  connections: [
    {
      connection_name: 'TTE Production',
      description: 'Production TTE Kafka',
      bootstrap_server_urls: 'kafka-ttc-app.prod.target.com:9092',
    },
  ],
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
      const newState = {
        ...state,
        isFetching: false,
      }
      return newState
    }
    case ADD_CONNECTION: {
      const newState = {
        ...state,
        isFetching: true,
      }
      return newState
    }
    case ADD_CONNECTION_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        connections: [...state.connections, payload],
      }
      return newState
    }
    default:
      return state
  }
}
