import 'react-native-gesture-handler';
// In App.js in a new project

import React, { useState } from "react";
import { View, Text,TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux';
import { Provider } from "react-redux";
import{connect} from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

//TopBar

//Item

const ItemX = ({title}) => {
return(
  <View>
 <View style={{flexDirection:"row",
 justifyContent:"flex-start",
  backgroundColor:"white"
  }}>
    <Icon name="check" size={30} color="red"></Icon>
  <Text>Name</Text>
<Text>{title}</Text>
 </View>
 
 
 <View style={{width:"100%",height:1,backgroundColor:"gray"}}></View>
 </View>
);
};

//initial state
const initStateTodo = {
  todos:[{title:"This is initial title",id:1}]
  };
  
  //create redux
  const todoListReducer = (state = [],action) => {
    switch(action.type){
      case 'ADD': return [...state, {title:action.payload.title,id:action.payload.id}]
      //case 'DETAIL': 
        default: return state
    }
  };
  

//Component
function HomeScreen(props) {
  const rederItemRow = ({item}) => {
    return (<ItemX title={item.title}></ItemX>);
  };

  return (
    <View style={{flex: 1,
     alignItems: 'center', 
      justifyContent:"flex-start",
      backgroundColor:"gray" }}>
         <View>
    <View style={{
    flexDirection:"row",
    justifyContent:"flex-end",
    backgroundColor:"yellow",
     width:"100%",
     alignItems:"flex-end",
     height:100}}>
      <Button title="Add" onPress={()=> props.navigation.navigate("Detail")}></Button>
    </View>

      <FlatList 
      data={props.todoListData}
      renderItem={rederItemRow}
      keyExtractor = {item=> item.id}
      ></FlatList>
    </View>
    </View>
  );
}

//home container
const homeScreenMapStateToProps = (state) => {
  return {
    todoListData: state
  };
};

const homeScreenMapDispatchToProps = (dispatch) => {
  return {
    addButtonAction: () => dispatch({type:'ADD',payload:{id:12,title:"Addded item after Add clicked"}})
  };
};


const HomeScreenContainer = connect(homeScreenMapStateToProps)(HomeScreen);


//Detail screen
function DetailScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Button title="Go Back" onPress={()=>props.navigation.goBack()}></Button>
      <Button title="Add Task" onPress={props.addButtonAction}></Button>
    </View>
  );
}

const DetailScreenContainer = connect(null,homeScreenMapDispatchToProps)(DetailScreen);




//App
const Stack = createStackNavigator();
const todoStore = createStore(todoListReducer);
const  App = () => {
  return (
    <Provider store={todoStore}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreenContainer} />
        <Stack.Screen name="Detail" component={DetailScreenContainer} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;