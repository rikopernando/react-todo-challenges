import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import TodoScreen from './screens/Todo'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'

const AuthStack = createStackNavigator({
    Login : { screen : LoginScreen },
    Register : { screen : RegisterScreen }
},{
    initialRouteName : 'Login'
})

const AppStack = createStackNavigator({
    Todo : { screen : TodoScreen }
},{
    initialRouteName : 'Todo'
})

const Navigate = createSwitchNavigator(
    {
        Auth : AuthStack,
        App : AppStack
    },{
        initialRouteName : 'Auth'       
    }
)

export default Navigate
