import {
  FETCH_LIST_OF_TOPICS,
  FETCH_LIST_OF_TOPICS_SUCCESS,
  UPDATE_SELECTED_TOPIC,
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
          listOfTopics: payload.listOfToipcs,
          configuration: payload.configuration,
        },
      }
      return newState
    }
    default:
      return state
  }
}
