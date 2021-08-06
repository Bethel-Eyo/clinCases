import { createStackNavigator } from 'react-navigation-stack';
import DistrictDetail from '../screens/DistrictDetail';
import District from '../screens/District';
import CaseIncidence from '../screens/CaseIncidence';

const navigationOptions = {
  headerShown: false,
}

const MainNavigator = createStackNavigator({
  District: {
    screen: District,
    navigationOptions,
  },
  DistrictDetail: {
    screen: DistrictDetail,
    // navigationOptions,
  },
  CaseIncidence: {
    screen: CaseIncidence,
    // navigationOptions,
  },
});

export default MainNavigator;