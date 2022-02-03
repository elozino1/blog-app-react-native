import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogPostsScreen from './screens/BlogPostsScreen'
import CommentsScreen from './screens/CommentsScreen'
import NewPostScreen from './screens/NewPostScreen'


const Stack = createNativeStackNavigator()

export default function App() {
  
  //render view
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen name="BlogPosts" component={BlogPostsScreen} options={{title: "Posts"}} />
        <Stack.Screen name="Comments" component={CommentsScreen} options={{title: "Comments"}} />
        <Stack.Screen name="NewPost" component={NewPostScreen} options={{title: "Create Post"}}/>
      </Stack.Navigator>
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
