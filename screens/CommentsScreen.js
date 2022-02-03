import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { BASE_URL, GET_COMMENTS, GET_POSTS, EMAIL, NAME } from '../Constants';
import axios from 'axios';


export default function Comments({ route }) {

  useEffect(() => {
    fetchComments()
  }, [])

  const { postId, postBody } = route.params
  const id = JSON.stringify(postId)

  let [comments, setComments] = useState()
  const [userCommentText, setUserCommentText] = useState('')
  let [commentID, setCommentID] = useState(500)

  // on text change 
  const onTextChanged = (newText) => {
    setUserCommentText(newText)
  }

  // single comment item
  const _renderItem = ({ item }) => (
    <View style={styles.cardHolder}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemEmail}>{item.email}</Text>
        <Text style={styles.itemBody}>{item.body}</Text>
    </View>
  )

  // fetch comments from API
  async function fetchComments() {
    Axios.get(`${BASE_URL}/${GET_POSTS}/${id}/${GET_COMMENTS}`)
      .then(response => {
        setComments(response.data)
      })
      .catch(err => alert(`Error: ${err}`))
  }

  // add a new comment to a post
  async function postComment() {
    axios({
      method: 'POST',
      url: `${BASE_URL}/${GET_COMMENTS}`,
      headers: {"Content-Type": "application/json"},
      data: {
        "postId": 1,
        "id": 10,
        "name": `${NAME}`,
        "email": `${EMAIL}`,
        "body": `${userCommentText}`
      }
    }).then(response => {setComments([...comments, {
                                        body: response.data.body, 
                                        email: response.data.email, 
                                        name: response.data.name,
                                        id: commentID}])
                          Keyboard.dismiss()
                          setUserCommentText('')
                          setCommentID(++commentID)
                        })
    .catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{postBody}</Text>
      <Text style={styles.commentName}>Comments</Text>
      <FlatList 
        data={comments}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.newCommentContainer}>
        <TextInput 
          placeholder='enter comment' 
          multiline={true}
          numberOfLines={3}
          style={styles.commentInput}
          defaultValue={userCommentText}
          onChangeText={onTextChanged}/>
        <Button title='Comment' onPress={postComment} style={styles.commentButton}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    padding: 10
  },
  newCommentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  commentInput: {
    width: '78%',
    marginEnd: 10
  },
  cardHolder: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5
  },
  commentName: {
    fontWeight: 'bold',
    marginVertical: 10
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemEmail: {
    paddingBottom: 5
  },
  commentButton: {
    height: 10
  }
})