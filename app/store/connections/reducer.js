import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  ADD_CONNECTION,
  ADD_CONNECTION_SUCCESS,
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
} from './actionType'

export const initialState = {
  configurations: [
    {
      id: '928cbf99-1e38-4d20-888e-cd9a8302b99d',
      connectionName: 'TTE Production',
      description: 'Production TTE Kafka',
      bootstrapServerUrls: 'kafka-ttc-app.prod.target.com:9092',
    },
  ],
  isFetching: false,
  activeConnection: undefined,
}

export default function connections(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LIST_OF_TOPICS: {
      const newState = {
        ...state,
        isFetching: true,
      }
      return newState
    }
    case FETCH_LIST_OF_TOPICS_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        activeConnection: {
          listOfTopics: payload.listOfToipcs,
          configuration: payload.configuration,
        },
      }
      return newState
    }
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
