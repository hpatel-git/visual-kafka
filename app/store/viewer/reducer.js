import {
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
  UPDATE_SELECTED_TOPIC,
  RESET_VIEW_LAYOUT,
  CREATE_TOPIC_SUCCESS,
} from './actionType'

export const initialState = {
  isFetching: false,
  activeConnection: undefined,
}

export default function viewer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LIST_OF_TOPICS: {
      const newState = {
        ...state,
        isFetching: true,
      }
      return newState
    }
    case UPDATE_SELECTED_TOPIC: {
      const { payload } = action
      const newState = {
        ...state,
        activeConnection: {
          ...state.activeConnection,
          selectedTopic: payload,
        },
      }
      return newState
    }
    case FETCH_LIST_OF_TOPICS_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        activeConnection: {
          listOfTopics: payload.listOfTopics,
          configuration: payload.configuration,
        },
      }
      return newState
    }
    case CREATE_TOPIC_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        isFetching: false,
        activeConnection: {
          ...state.activeConnection,
          listOfTopics: [...state.activeConnection.listOfTopics, payload],
        },
      }
      return newState
    }
    case RESET_VIEW_LAYOUT: {
      const newState = {
        ...state,
        isFetching: false,
        activeConnection: undefined,
      }
      return newState
    }
    default:
      return state
  }
}
