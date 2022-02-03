import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Keyboard, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react';
import { BASE_URL, GET_POSTS, } from '../Constants';
import axios from 'axios';

export default function NewPostScreen({navigation}) {

    let [titleText, setTitleText] = useState('')
    let [bodyText, setBodyText] = useState('')
    let [titleId, setTitleId] = useState(101)

    const onBodyTextChanged = (newText) => {
        setBodyText(newText)
    }

    const onTitleTextChanged = (newText) => {
        setTitleText(newText)
    }

    // create a new post
    async function createPost() {
        axios({
            method: 'POST',
            url: `${BASE_URL}/${GET_POSTS}`,
            headers: {'Content-Type': 'application/json'},
            data: {
                "title": `${titleText}`,
                "body": `${bodyText}`
            }
        }).then(response => {
            setTitleText(response.data.title)
            setBodyText(response.data.body)
            setTitleId(++titleId)
            Keyboard.dismiss()
            navigation.navigate({
                name: 'BlogPosts', 
                params: {
                    post: {title: titleText, body: bodyText, id: titleId}
                },
                merge: true
            })
        }).catch(err => alert(`Error: ${err}`))
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.title}>Title:</Text>
            <TextInput 
                onChangeText={onTitleTextChanged}
                style={styles.titleInput}/>
            <Text style={styles.post}>Post:</Text>
            <TextInput 
                style={styles.postInput}
                multiline={true}
                numberOfLines={10}
                textAlignVertical='top'
                onChangeText={onBodyTextChanged}/>
            <Button 
                style={styles.postButton}
                title='Post'
                onPress={createPost}/>
            </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 17
    },
    post: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 17
    },
    titleInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        fontSize: 17
    },
    postInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        fontSize: 17
    }
})