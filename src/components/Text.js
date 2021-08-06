import React from 'react'
import { Text as NativeText } from 'react-native'

import { textColor as color } from '../config/colors'

const Text = ({ style = {}, children, ...props }) => {
  return (
    <NativeText
      style={{
        // fontFamily: 'AribauGroteskRegular',
        color,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export default Text
