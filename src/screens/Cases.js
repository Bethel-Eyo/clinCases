import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListView from '../components/ListView';
import Text from '../components/Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
});
const Cases = ({cases}) => {
  return (
    <View style={styles.container}>
      <Text testID="test-text">showing cases</Text>
      <FlatList
        testID="myFlatlist"
        data={cases}
        renderItem={({item, index}) => (
          <ListView index={index} item={item} type="cases" />
        )}
        keyExtractor={item => `${item.ags}`}
        style={{flex: 1, width: '100%'}}
      />
    </View>
  );
};

export default Cases;

