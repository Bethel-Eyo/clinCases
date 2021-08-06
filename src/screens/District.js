import React, {useEffect, useState} from 'react';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {getDistricts} from '../actions/district';
import InputField from '../components/InputField';
import Loader from '../components/Loader';
import {primary, red} from '../config/colors';
import Text from '../components/Text' 
import ListView from '../components/ListView';

const styles = StyleSheet.create({
  subTxt: {
    color: primary.dark,
    width: '90%',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '300',
    marginTop: 10,
  },
  title: {
    color: primary.dark,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 25,
    marginTop: 20,
  }, 
});

const District = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.loading);
  const {districts} = useSelector(state => state.district);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // get districts when the component mounts
    dispatch(getDistricts());
  }, []);

  const renderDistrictItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.ags);
        navigation.navigate('DistrictDetail', { district: item });
      }}
      style={{width: '100%', alignItems: 'center'}}>
      {/* call in reusable custom view from components folder */}
      <ListView item={item} type='' />
    </TouchableOpacity>
  );

  return (
    <Container>
      <HomeHeader>
        <Text style={styles.title}>ClinCases</Text>
        <Text style={styles.subTxt}>
          Keep track for the current trends of the Covid-19 virus across the
          different districts in Germany.
        </Text>
      </HomeHeader>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <InputField
            label="Search District"
            labelWidth={93}
            placeholder="Search by name"
            onChangeText={name => setSearch(name)}
          />
          <FlatList
            data={districts?.filter(district =>
              district.name?.toLowerCase().includes(search.toLowerCase()),
            )}
            renderItem={renderDistrictItem}
            keyExtractor={item => `${item.ags}`}
            style={{flex: 1, width: '100%'}}
          />
        </Container>
      )}
    </Container>
  );
};

export default District;

const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
  width: 100%;
`;

// Views
const HomeHeader = styled.View`
  height: 150;
  width: 90%;
  padding-left: 5%;
  background: ${primary.light};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: 10px;
`;

