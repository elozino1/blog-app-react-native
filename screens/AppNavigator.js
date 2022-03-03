import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BlogPostsScreen from './BlogPostsScreen'
import CommentsScreen from './CommentsScreen'
import NewPostScreen from './NewPostScreen'


const Stack = createNativeStackNavigator()

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Posts' component={BlogPostsScreen}/>
        <Stack.Screen name='Comments' component={CommentsScreen}/>
        <Stack.Screen name='Create Post' component={NewPostScreen}/>
    </Stack.Navigator>
)

export default AppNavigator