import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";

import { Entypo } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";
import Home from "../screens/Home/Home";
import PostForm from "../screens/PostForm/PostForm";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        <Tab.Navigator screenOptions = {{tabBarShowLabel:false}}>
            <Tab.Screen 
              name="Home" 
              component={Home} 
              options={{
                tabBarIcon: () => <Entypo name="home" size={24} color="black" />}} />

            <Tab.Screen name="PostForm" component={PostForm} options={{
                tabBarIcon: () => <Octicons name="diff-added" size={24} color="black" />}} />

            <Tab.Screen name="Profile" component={Profile}  options={
              {tabBarIcon: () => <Ionicons name="person" size={24} color="black" />
            }
              }/>
        </Tab.Navigator>
    );
  }
}

export default Menu;
