import AsyncStorage from '@react-native-async-storage/async-storage'

const key = '@authToken'

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem(key, token)
    } catch (error) {
        console.log(error)
    }
}

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.log(error)
    }
}
