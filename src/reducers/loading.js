import {LOADING, REFRESHING } from "../types";

const initialState = {
  isLoading: false,
  isRefreshing: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case REFRESHING:
      return {
        ...state,
        isRefreshing: payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
