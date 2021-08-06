import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {background, primary, red} from '../config/colors';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Text from '../components/Text';
import ActionButton from '../components/ActionButton';
import {getCasesByDistrict, getIncidenceByDistrict} from '../actions/district';
import Loader from '../components/Loader';
import {formatAmount} from '../helpers/formatters';
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';
import {Circle} from 'react-native-svg';

const colors = ['#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6', '#FF8C94'];

const ScatterPoint = ({x, y, datum, min, max}) => {
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

  return <Circle color={colors[i]} cx={x} cy={y} r={6} fill={colors[i]} />;
};

const styles = StyleSheet.create({
  headerTxt: {
    color: primary.main,
    fontSize: 16,
  },
  title: {
    color: primary.main,
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    color: primary.main,
    fontWeight: '300',
    fontSize: 14,
    marginTop: 5,
  },
  hint: {
    marginTop: 10,
    color: primary.text,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

const DistrictDetail = ({navigation}) => {
  const dispatch = useDispatch();
  let district = navigation.state.params.district;
  const [isSeven, setIsSeven] = useState(true);
  // const [sevenData, setSevenData] = useState([]);
  const [isThirty, setIsThirty] = useState(false);
  const [isNinety, setIsNinety] = useState(false);
  const [rangeTip, setRangeTip] = useState(' 7 days');
  const [caseCount, setCaseCount] = useState(0);
  const [caseChange, setCaseChange] = useState(0);
  const [avgIncidence, setAvgIncidence] = useState(0);
  const [sevenMin, setSevenMin] = useState(0);
  const [sevenMax, setSevenMax] = useState(0);
  const [thirtyMin, setThirtyMin] = useState(0);
  const [thirtyMax, setThirtyMax] = useState(0);
  const [ninetyMin, setNinetyMin] = useState(0);
  const [ninetyMax, setNinetyMax] = useState(0);
  const {cases, incidences, sevenData, thirtyData, ninetyData} = useSelector(
    state => state.district,
  );
  const {isLoading} = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(getCasesByDistrict(district.ags, '7'));
    dispatch(getIncidenceByDistrict(district.ags, '7'));
  }, []);

  useEffect(() => {
    if (incidences != null) {
      calculateAverageIncidence(incidences[0].history);
    }
  }, [incidences]);

  useEffect(() => {
    if (cases != null) {
      calculateCaseCount(cases[0].history);
    }
  }, [cases]);

  useEffect(() => {
    if (sevenData != null) {
      const params = sevenData?.map(({y}) => y);
      setSevenMin(Math.min(...params));
      setSevenMax(Math.max(...params));
    }
  }, [sevenData]);

  useEffect(() => {
    if (thirtyData != null) {
      const params = thirtyData?.map(({y}) => y);
      setThirtyMin(Math.min(...params));
      setThirtyMax(Math.max(...params));
    }
  }, [thirtyData]);

  useEffect(() => {
    if (ninetyData != null) {
      const params = ninetyData?.map(({y}) => y);
      setNinetyMin(Math.min(...params));
      setNinetyMax(Math.max(...params));
    }
  }, [ninetyData]);

  const setRange = range => {
    // switch between active buttons/ranges
    if (range == 'isSeven') {
      setIsSeven(true);
      setIsThirty(false);
      setIsNinety(false);
      setRangeTip(' 7 days');
      dispatch(getCasesByDistrict(district.ags, '7'));
      dispatch(getIncidenceByDistrict(district.ags, '7'));
    } else if (range == 'isThirty') {
      setIsSeven(false);
      setIsThirty(true);
      setIsNinety(false);
      console.log(district.ags);
      setRangeTip(' 30 days');
      dispatch(getCasesByDistrict(district.ags, '30'));
      dispatch(getIncidenceByDistrict(district.ags, '30'));
    } else if (range == 'isNinety') {
      setIsSeven(false);
      setIsThirty(false);
      setIsNinety(true);
      setRangeTip(' 90 days');
      dispatch(getCasesByDistrict(district.ags, '90'));
      dispatch(getIncidenceByDistrict(district.ags, '90'));
    }
  };

  const calculateCaseCount = history => {
    let sum = 0;
    // loop through the cases for n range and add the sum
    history.forEach(element => {
      sum = sum + parseInt(element.cases);
    });
    setCaseCount(sum);
    calculateCaseChange(sum);
  };

  // calculate the percentage increase or decrease of the virus cases
  const calculateCaseChange = sum => {
    let initial = parseInt(district.cases) - sum;
    let change = (sum / initial) * 100;
    setCaseChange(formatAmount(change, '') + '%');
  };

  const calculateAverageIncidence = history => {
    let sum = 0;
    // loop through the incidence for n range and add the sum
    history.forEach(element => {
      sum = sum + parseInt(element.weekIncidence);
    });
    let average = sum / history.length;
    setAvgIncidence(formatAmount(average, ''));
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <CardView>
          {isLoading ? (
            <Loader />
          ) : (
            <FullWidth>
              {/* <Text style={styles.hint}>county</Text> */}
              <Text style={styles.title}>Cases</Text>
              <Text style={styles.hint}>Total cases</Text>
              <Text style={styles.text}>{district.cases}</Text>
              <Text style={styles.hint}>
                Total cases for the last{rangeTip}
              </Text>
              <Text style={styles.text}>{caseCount}</Text>
              <Text style={styles.hint}>Increase/decrease in percentage</Text>
              <Text style={styles.text}>{caseChange}</Text>
              <Text style={styles.title}>Incidence</Text>
              <Text style={styles.hint}>
                Week Incidence for {district.county} county
              </Text>
              <Text style={styles.text}>
                {formatAmount(district.weekIncidence, '')}
              </Text>
              <Text style={styles.hint}>
                Average week Incidence for the last{rangeTip}
              </Text>
              <Text style={styles.text}>{avgIncidence}</Text>
            </FullWidth>
          )}
        </CardView>
        <FullWidthRow>
          <ActionButton
            style={{flex: 1, marginRight: '3%'}}
            title="Last 7days"
            isActive={isSeven}
            onPress={() => {
              setRange('isSeven');
            }}
          />
          <ActionButton
            style={{flex: 1, marginRight: '3%'}}
            title="Last 30days"
            isActive={isThirty}
            onPress={() => {
              setRange('isThirty');
            }}
          />
          <ActionButton
            style={{flex: 1}}
            title="Last 90days"
            isActive={isNinety}
            onPress={() => {
              setRange('isNinety');
            }}
          />
        </FullWidthRow>

        {/* display chart for the cases in the last 7 days */}
        {isSeven && (
          <ChartCard>
            {isLoading ? (
              <Loader />
            ) : (
              <VictoryChart>
                <VictoryLine data={sevenData} />
                <VictoryScatter
                  data={sevenData}
                  dataComponent={<ScatterPoint min={sevenMin} max={sevenMax} />}
                />
              </VictoryChart>
            )}
          </ChartCard>
        )}

        {/* display chart for the cases in the last 30 days */}
        {isThirty && (
          <ChartCard>
            {isLoading ? (
              <Loader />
            ) : (
              <VictoryChart>
                <VictoryLine data={thirtyData} />
                <VictoryScatter
                  data={thirtyData}
                  dataComponent={
                    <ScatterPoint min={thirtyMin} max={thirtyMax} />
                  }
                />
              </VictoryChart>
            )}
          </ChartCard>
        )}

        {/* display chart for the cases in the last 90 days */}
        {isNinety && (
          <ChartCard>
            {isLoading ? (
              <Loader />
            ) : (
              <VictoryChart>
                <VictoryLine data={ninetyData} />
                <VictoryScatter
                  data={ninetyData}
                  dataComponent={
                    <ScatterPoint min={ninetyMin} max={ninetyMax} />
                  }
                />
              </VictoryChart>
            )}
          </ChartCard>
        )}
        <Text style={{ color: primary.text, marginTop: 5 }}>Graphical representation of cases for the {rangeTip}</Text>
        <ActionButton
          style={{width: '90%', marginTop: 10}}
          title={'View case and incidence list for last' + rangeTip}
          isActive={true}
          onPress={() => {
            navigation.navigate('CaseIncidence');
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

DistrictDetail.navigationOptions = ({navigation}) => {
  return {
    headerTitle: (
      <Text style={styles.headerTxt}>
        {navigation.state.params.district.name}
      </Text>
    ),
    headerStyle: {
      backgroundColor: '#f8f8f8',
    },
  };
};

export default DistrictDetail;

// Views
const CardView = styled.View`
  height: 340;
  width: 90%;
  padding-left: 5%;
  padding-top: 2px;
  background: ${background.main};
  border-radius: 30px;
  margin-top: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

const ChartCard = styled.View`
  height: 300;
  width: 95%;
  background: ${background.main};
  border-radius: 30px;
  margin-top: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

const FullWidthRow = styled.View`
  width: 95%;
  flex-direction: row;
  margin-top: 3%;
`;

const FullWidth = styled.View`
  width: 100%;
`;
