import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";

import { auth, db } from "../../firebase/config";



class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: []
    };
  }
componentDidMount(){
    //Traer datos
   db.collection('user').onSnapshot(
      data => {
          let info = []
          data.forEach( i => {
              info.push(
                {
                  id: i.id,
                  datos: i.data()
                })
            })

            this.setState({
                userInfo: info
            })
        }
    )
}


  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    console.log(this.state.userInfo);
    console.log(auth.currentUser.email);
    return (
       <View>
        <Text>Profile</Text>
        <FlatList 
            data= {this.state.userInfo}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {if (item.datos.owner == auth.currentUser.email) {
              return (
              <React.Fragment>
                <Text> { item.datos.userName } </Text>
                <Text> { item.datos.owner } </Text>
                <Text> { item.datos.miniBio } </Text>

              </React.Fragment>
              )
            }} 
           }
        />


        {/*  {item.datos.owner == auth.currentUser.email ? <Text> { item.datos.miniBio } </Text> : <Text>Hola</Text>} */}

           {/*{if (item.datos.owner == auth.currentUser.email) {
            return (<Text> { item.datos.miniBio } </Text>)
          }}  */}

        {/*{auth.currentUser.email == this.state.userInfo.datos.owner ?
        <Text>
          {this.state.userinfo.datos}
        </Text> : false} */}
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
