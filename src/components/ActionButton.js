import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {primary, background} from '../config/colors';
import Text from './Text';

const ActionButton = ({
  height = 40,
  title = '',
  loading = false,
  isActive = false,
  color = isActive ? background.light : primary.main,
  onPress = () => null,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height,
        backgroundColor: isActive ? primary.main : primary.light,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        ...style,
      }}
      disabled={loading}
      onPress={() => {
        if (!loading) onPress();
      }}>
      {loading ? (
        <ActivityIndicator size="small" animating color={color} />
      ) : (
        <Text style={{color}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;
