import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { View } from 'react-native'
import axios from 'axios'

const Register = () => {

    const [formData, setFormData] = useState({})

    const registerUser = async () => {
        
    }

    return (
        <View>
            <Input placeholder='name'/>
            <Input placeholder='last name'/>
            <Input placeholder='email'/>
            <Input placeholder='password' secureTextEntry/>
            <Input placeholder='confirm password' secureTextEntry/>
            <Button title='Register' onPress={registerUser}/>
        </View>
    )
}

export default Register