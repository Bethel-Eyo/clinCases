import React, {useState} from 'react';
import styled from 'styled-components';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {background, primary} from '../config/colors';
import Cases from './Cases';
import Incidences from './Incidences';
import {useSelector, useDispatch} from 'react-redux';

const initialLayout = {width: Dimensions.get('window').width};

const CaseIncidence = () => {
  const {cases} = useSelector(state => state.district);
  const {incidences} = useSelector(state => state.district);

  const FirstRoute = () => <Cases cases={cases[0].history} style={[styles.scene]} />;
  const SecondRoute = () => <Incidences incidences={incidences[0].history} style={[styles.scene]} />;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Cases'},
    {key: 'second', title: 'Incidences'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <Container>
      <TabView
        style={{marginTop: 10}}
        renderTabBar={props => (
          <TabBar
            style={{
              margin: '3%',
              borderRadius: 10,
              backgroundColor: primary.text,
            }}
            activeColor={primary.main}
            {...props}
            indicatorStyle={{
              position: 'absolute',
              margin: 2,
              width: '49%',
              height: '90%',
              top: 0,
              left: 0,
              backgroundColor: background.main,
              borderRadius: 10,
              boxWithShadow: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 1,
              },
            }}
            getLabelText={({route}) => route.title}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
};

export default CaseIncidence;

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${background.main};
`;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
