import {
  SET_CASES,
  SET_DISTRICTS,
  SET_INCIDENCES,
  SET_NINETY_DATA,
  SET_SEVEN_DATA,
  SET_THIRTY_DATA,
} from '../types';

const initialState = {
  districts: null,
  incidences: null,
  cases: null,
  sevenData: null,
  thirtyData: null,
  ninetyData: null,
};

const districtReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_DISTRICTS:
      return {
        ...state,
        districts: payload,
      };
    case SET_INCIDENCES:
      return {
        ...state,
        incidences: payload,
      };
    case SET_CASES:
      return {
        ...state,
        cases: payload,
      };
    case SET_SEVEN_DATA:
      return {
        ...state,
        sevenData: payload,
      };
    case SET_THIRTY_DATA:
      return {
        ...state,
        thirtyData: payload,
      };
    case SET_NINETY_DATA:
      return {
        ...state,
        ninetyData: payload,
      };
    default:
      return state;
  }
};

export default districtReducer;
