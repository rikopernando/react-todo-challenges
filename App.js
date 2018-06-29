import React from 'react'
import { createStackNavigator } from 'react-navigation'
import TodoScreen from './screens/Todo'

const RootStack = createStackNavigator({

    Todo : { screen : TodoScreen }
},{
    initialRouteName : 'Todo'
})

export default RootStack
