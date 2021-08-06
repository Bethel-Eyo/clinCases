import { combineReducers } from 'redux';
import district from './district';
import loading from './loading';

export default combineReducers({
  district,
  loading
});