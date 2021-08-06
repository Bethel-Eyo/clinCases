import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import ListView from '../components/ListView';
const Incidences = ({ incidences }) => {

  return (
    <Container>
      <FlatList
        testID="myFlatlist"
        data={incidences}
        renderItem={({item, index}) => (
          <ListView index={index} item={item} type="incidences" />
        )}
        keyExtractor={item => `${item.ags}`}
        style={{flex: 1, width: '100%'}}
      />
    </Container>
  );
};

export default Incidences;

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;
