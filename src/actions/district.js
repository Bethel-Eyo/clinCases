import axios from 'axios';
import moment from 'moment';
import {Alert} from 'react-native';
import {API_URL} from '../config/constants';
import {formatAmount} from '../helpers/formatters';
import {
  LOADING,
  SET_CASES,
  SET_DISTRICTS,
  SET_INCIDENCES,
  SET_NINETY_DATA,
  SET_SEVEN_DATA,
  SET_THIRTY_DATA,
} from '../types';

export const getDistricts = () => dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  axios
    .get(API_URL + '/districts')
    .then(res => {
      // console.log(res.data);
      // Alert.alert('Districts gotten successfully');
      var myData = res.data.data;
      var arrayVal = [];
      Object.keys(myData).forEach(key => arrayVal.push(myData[key]));
      dispatch({
        type: SET_DISTRICTS,
        payload: arrayVal,
      });
    })
    .catch(error => {
      const message = error?.response?.data?.message ?? error.message;
      Alert.alert(message);
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const getCasesByDistrict = (districtId, range) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  axios
    .get(API_URL + `/districts/${districtId}/history/cases/${range}`)
    .then(res => {
      console.log(res.data);
      // Alert.alert('Cases gotten successfully');
      dispatch({
        type: SET_CASES,
        payload: Object.values(res.data.data),
      });
      // Set Graphical data based on range selected
      if (range == '7') {
        setSevenData(Object.values(res.data.data)[0].history, dispatch);
      } else if (range == '30'){
        setThirtyData(Object.values(res.data.data)[0].history, dispatch);
      } else if (range == '90'){
        setNinetyData(Object.values(res.data.data)[0].history, dispatch);
      }
    })
    .catch(error => {
      const message = error?.response?.data?.message ?? error.message;
      Alert.alert(message);
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

export const getIncidenceByDistrict = (districtId, range) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  axios
    .get(API_URL + `/districts/${districtId}/history/incidence/${range}`)
    .then(res => {
      console.log(res.data);
      // Alert.alert('Incidence gotten successfully');
      dispatch({
        type: SET_INCIDENCES,
        payload: Object.values(res.data.data),
      });
    })
    .catch(error => {
      const message = error?.response?.data?.message ?? error.message;
      Alert.alert(message);
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      });
    });
};

const setSevenData = (history, dispatch) => {
  let mon = 0;
  let tue = 0;
  let wed = 0;
  let thu = 0;
  let fri = 0;
  let sat = 0;
  let sun = 0;

  history.forEach(element => {
    if (moment(element.date).isoWeekday() == 1) {
      mon = mon + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 2) {
      tue = tue + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 3) {
      wed = wed + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 4) {
      thu = thu + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 5) {
      fri = fri + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 6) {
      sat = sat + parseInt(element.cases);
    } else if (moment(element.date).isoWeekday() == 7) {
      sun = sun + parseInt(element.cases);
    }
  });

  const data = [
    {x: 'Mon', y: mon},
    {x: 'Tue', y: tue},
    {x: 'Wed', y: wed},
    {x: 'Thu', y: thu},
    {x: 'Fri', y: fri},
    {x: 'Sat', y: sat},
    {x: 'Sun', y: sun},
  ];

  dispatch({
    type: SET_SEVEN_DATA,
    payload: data,
  });
};

const setThirtyData = (history, dispatch) => {
  let week1 = 0;
  let week2 = 0;
  let week3 = 0;
  let week4 = 0;

  history.forEach(element => {
    if (moment(element.date).isSame(new Date(), 'week')) {
      week1 = week1 + parseInt(element.cases);
    } else if (
      (moment(element.date).isSame(moment(Date.now()).subtract(7, 'd').format('YYYY-MM-DD')), 'week')
    ) {
      week2 = week2 + parseInt(element.cases);
    } else if (
      (moment(element.date).isSame(moment(Date.now()).subtract(14, 'd').format('YYYY-MM-DD')),
      'week')
    ) {
      week3 = week3 + parseInt(element.cases);
    } else if (
      (moment(element.date).isSame(moment(Date.now()).subtract(21, 'd').format('YYYY-MM-DD')),
      'week')
    ) {
      week4 = week4 + parseInt(element.cases);
    }
  });

  const data = [
    {x: 'Week 1', y: week1},
    {x: 'Week 2', y: week2},
    {x: 'Week 3', y: week3},
    {x: 'Week 4', y: week4},
  ];

  dispatch({
    type: SET_THIRTY_DATA,
    payload: data,
  });
};

const setNinetyData = (history, dispatch) => {
  let month1 = 0;
  let month2 = 0;
  let month3 = 0;

  history.forEach(element => {
    if (moment(element.date).isSame(new Date(), 'month')) {
      month1 = month1 + parseInt(element.cases);
    } else if (
      (moment(element.date).isSame(moment(Date.now()).subtract(1, 'd').format('YYYY-MM-DD')), 'month')
    ) {
      month2 = month2 + parseInt(element.cases);
    } else if (
      (moment(element.date).isSame(moment(Date.now()).subtract(2, 'd').format('YYYY-MM-DD')),
      'month')
    ) {
      month3 = month3 + parseInt(element.cases);
    }
  });

  const data = [
    {x: 'Month 1', y: month1},
    {x: 'Month 2', y: month2},
    {x: 'Month 3', y: month3},
  ];

  dispatch({
    type: SET_NINETY_DATA,
    payload: data,
  });

}
