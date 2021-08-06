import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Main from './Main'
import NavigationService from './NavigationService'

const Navigation = () => {
  const SwitchNavigator = createSwitchNavigator({
    Main,
  })

  const AppContainer = createAppContainer(SwitchNavigator)

  return (
    <AppContainer
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef)
      }}
    />
  )
}

export default Navigation
