import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableNativeFeedback, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import {BASE_URL, GET_POSTS} from '../Constants'
import { FAB } from 'react-native-elements'
import { Searchbar, ActivityIndicator, Colors } from 'react-native-paper'

export default function BlogPostsScreen({ navigation, route }) {

  useEffect(() => {
    fetchPosts()
  }, [route.params?.post])

  const [posts, setData] = useState()
  let [postID, setPostID] = useState(101)
  let [searchValue, setSearchValue] = useState('')
  let [isLoading, setIsLoading] = useState(true)
  let flag = false

  // single post item view
  const Item = ({ title, body, id }) => (
      <TouchableNativeFeedback onPress={() => navigation.navigate('Comments', {postId: id, postBody: body})}>
        <View style={styles.cardHolder}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemBody}>{body}</Text>
        </View>
      </TouchableNativeFeedback>
  )

  // single post item 
  const _renderItem = ({ item }) => {
    if(searchValue == '') {
      return <Item title={item.title} body={item.body} id={item.id}/>
    }
    if(item.title.toLowerCase().includes(searchValue.toLowerCase().trim())) {
      return <Item title={item.title} body={item.body} id={item.id}/>
    }
    if(item.body.toLowerCase().includes(searchValue.toLowerCase().trim())) {
      return <Item title={item.title} body={item.body} id={item.id}/>
    }
    return !flag
  }

  const onSearchValueChanged = (searchQuery) => {
    setSearchValue(searchQuery)
  }

  // get posts from the end point
  async function fetchPosts() {
    Axios.get(`${BASE_URL}/${GET_POSTS}`)
      .then(response => {
        if(route.params?.post) {
          let {title, body} = route.params.post
          setData([...posts, {
                title: title,
                body: body,
                id: postID
              }
          ])
          setPostID(++postID)
          setIsLoading(false)
        } else {
          setData(response.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        alert(`An error occurred: ${err}`)
        setIsLoading(false)
      })
  }
  
  //render view
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        isLoading 
        ? <ActivityIndicator size='large' />
        : <View>
            <Searchbar 
              placeholder='search posts'
              onChangeText={onSearchValueChanged}
              value={searchValue}
      />
            <FlatList 
              data={posts}
              renderItem={_renderItem}
              keyExtractor={item => item.id}
            />
            <FAB 
              icon={{name: 'add', color: 'white'}}
              placement='right'
              onPress={() => navigation.navigate('NewPost')}
              color='#369eed'/>
          </View>
      }
    </View>
  );
}

// styles sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },
  searchNotFound: {
    marginTop: 20,
    fontSize: 18
  },
  heading: {
    fontSize: 30,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  cardHolder: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5
  },
  itemTitle: {
    fontWeight: 'bold'
  },
  postInputContainer: {
    flexDirection: 'column',
    width: '100%'
  },
  postTextInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  }
});