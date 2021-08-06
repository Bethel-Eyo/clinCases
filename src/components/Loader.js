import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { primary } from '../config/colors'

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator
        animating
        color={primary.main}
        size="large"
      />
    </View>
  )
}

export default Loader
