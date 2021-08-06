import React from 'react';
import {primary, red} from '../config/colors';
import Text from '../components/Text';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

const styles = StyleSheet.create({
  nameTxt: {
    color: primary.dark,
    fontSize: 18,
    fontWeight: '300',
    margin: 5,
  },
  populationTxt: {
    color: primary.main,
    fontWeight: '300',
    marginLeft: 5,
  },
  casesTxt: {
    color: primary.dark,
    fontWeight: '300',
    fontSize: 12,
    marginLeft: 5,
    position: 'absolute',
    top: 8,
    right: 10,
  },
  deathTxt: {
    color: red,
    fontWeight: '300',
    fontSize: 12,
    marginLeft: 5,
    position: 'absolute',
    top: 47,
    right: 10,
  },
  recoveredTxt: {
    color: primary.main,
    fontWeight: '300',
    fontSize: 12,
    marginLeft: 5,
    position: 'absolute',
    top: 27,
    right: 10,
  },
  container: {
    height: 70,
    width: '90%',
    paddingLeft: '5%',
    backgroundColor: primary.light,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    alignSelf: 'center',
  },
});

const ListView = ({item, type, index}) => {
  return (
    <View testID={`list-row-${index}`} style={styles.container}>
      {type == 'cases' && (
        <Text style={styles.nameTxt}>Cases: {item?.cases}</Text>
      )}
      {type == 'incidences' && (
        <Text style={styles.nameTxt}>
          Week Incidence: {item?.weekIncidence}
        </Text>
      )}
      {type == '' && <Text style={styles.nameTxt}>{item?.name}</Text>}
      {type == 'cases' && (
        <Text style={styles.populationTxt}>
          date: {moment(item?.date).format('MMM Do YY')}
        </Text>
      )}
      {type == 'incidences' && (
        <Text style={styles.populationTxt}>
          date: {moment(item?.date).format('MMM Do YY')}
        </Text>
      )}
      {type == '' && (
        <Text style={styles.populationTxt}>population: {item?.population}</Text>
      )}
      {type == '' && <Text style={styles.casesTxt}>Cases: {item?.cases}</Text>}
      {type == '' && (
        <Text style={styles.recoveredTxt}>recovered: {item?.recovered}</Text>
      )}
      {type == '' && (
        <Text style={styles.deathTxt}>deaths: {item?.deaths}</Text>
      )}
    </View>
  );
};

export default ListView;

// const Container = styled.View`
//   height: 70;
//   width: 90%;
//   padding-left: 5%;
//   background: ${primary.light};
//   border-radius: 10px;
//   margin-top: 10px;
//   padding: 5px;
//   align-self: center;
// `;
