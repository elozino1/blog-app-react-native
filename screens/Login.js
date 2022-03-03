import React, { useState } from 'react'
import { Button, CheckBox, Input } from 'react-native-elements'
import { Alert, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { setToken } from '../redux/actions'
import {storeToken} from '../storage/storage'

const Login = ({ navigation }) => {

    const [checkBoxState, setCheckBoxState] = useState(true)
    const [emailText, setEmailText] = useState()
    const [passwordText, setPasswordText] = useState()

    // const data = useSelector((state) => state.reducer)
    const dispatch = useDispatch()

    const formData = new FormData()
    formData.append("email", `${emailText}`)
    formData.append("password", `${passwordText}`)
    formData.append("rememberMe", checkBoxState)

    const userLogin = () => {
        fetch("https://spring-board-api.herokuapp.com/api/v1/Authentication/Login", {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if(result.isSuccessful) {
                // console.log(result.data.token, 'login')
                Alert.alert('Success', result.message)
                dispatch(setToken(result.data.token))
                storeToken(result.data.token)
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <View>
            <Input placeholder='email' onChangeText={text => setEmailText(text)}/>
            <Input placeholder='password' secureTextEntry onChangeText={text => setPasswordText(text)}/>
            <CheckBox checked={checkBoxState} title='Remember me' onPress={() => setCheckBoxState(!checkBoxState)} />
            <Button title='Login' onPress={userLogin}/>
            <Button title='Register' onPress={() => navigation.navigate('Register')}/>
        </View>
    )
}

export default Login