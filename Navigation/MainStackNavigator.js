// Navigation/Navigation.js
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Image, TouchableOpacity} from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator()

function Main() {
    return(
             <Stack.Navigator>
                <Stack.Screen 
                name='Search' 
                component={Search}
                options={{ 
                    title: 'Search'
                }}
                />
                <Stack.Screen 
                name="FilmDetail" 
                component={FilmDetail}
                options={  
                  ({ route }) => ({
                  title: 'Details',
                  headerRight: () => (
                    <TouchableOpacity
                      style={styles.share_touchable_headerrightbutton}
                      onPress= {() => route.params.shareFilm()} >
                      <Image
                      style={styles.share_image}
                      source = {require('../Images/ic_share_ios.png')} />
                    </TouchableOpacity>
                  )
                })
              }
                />
                <Stack.Screen 
                name="Favorites" 
               component={Favorites}
                options={{ 
                  title: 'Favoris' 
                }} 
                />
            </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default function HomeTabs() {
    return (
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName
        
                    if (route.name === 'Search') {
                      iconName = focused
                        ? 'ios-search'
                        : 'ios-search'
                    } else if (route.name === 'Favorites') {
                      iconName = focused 
                        ? 'ios-heart' 
                        : 'ios-heart';
                    }
        
                    
                    return <Ionicons name={iconName} size={size} color={color} />
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen name="Search" component={Main} />
                <Tab.Screen name="Favorites" component={Favorites} />
              </Tab.Navigator>
            </NavigationContainer>

    )
}

const styles = StyleSheet.create({
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  }
})