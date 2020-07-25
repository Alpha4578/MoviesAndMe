//import Navigation from './navigation/Navigation';
import React from 'react'
import Main from './Navigation/MainStackNavigator'
import HomeTabs from './Navigation/MainStackNavigator'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default function App() {
  return (
    <Provider store = {Store}>
     <HomeTabs/>
   </Provider>
  )
}


