import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import AppLoading from 'expo-app-loading';

import {getToken} from './storage/storage';

import AuthNavigator from './screens/AuthNavigator';
import AppNavigator from './screens/AppNavigator';

export default function NestedApp() {

    const [isReady, setIsReady] = useState(false)
    const [authToken, setAuthToken] = useState(null)
    let token = null

    const retrieveToken = async () => {
        try {
            token = await getToken()
            setAuthToken(token)
        } 
        catch (error) {
            console.log(error)
        }

        if(!token)  {
            return
        }
    }

    if(!isReady) {
        return <AppLoading startAsync={retrieveToken} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)}/>
    }

  
    //render view
    return (
        <NavigationContainer>
            { authToken ? 
            <AppNavigator /> 
            : 
            <AuthNavigator />
            }
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    padding: 10
  }
});


