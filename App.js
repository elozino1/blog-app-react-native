import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


import { reducer } from './redux/reducer';

import NestedApp from './NestedApp';

export default function App() {

  const store =  createStore(reducer)
  
  //render view
  return (
    <Provider store={store}>
      <NestedApp />
    </Provider>
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
