import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Login'
import Register from './Register'


const Stack = createNativeStackNavigator()

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>
)

export default AuthNavigator