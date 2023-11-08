import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from "react-native";

import { auth, db } from "../../firebase/config";



class ProfileUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts:[]
    };
  }
componentDidMount(){
    //Traer datos
    db.collection('user').where('owner','==', this.props.route.params).onSnapshot(
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

     db.collection('posts').where('owner','==', this.props.route.params).onSnapshot(
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
                userPosts: info
            })
      }
    )
}

  render() {
    return (
       <View>
        {<FlatList 
            data= {this.state.userInfo}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {
              return (
              <React.Fragment>
                <Text> { item.datos.userName } </Text>
                <Text> { item.datos.owner } </Text>
                <Text> { item.datos.miniBio } </Text>

              </React.Fragment>
              )
            } 
           }
        />}
        {<FlatList 
            data= {this.state.userPosts}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {
              return (
              <React.Fragment>
                {/* <Image style={styles.camera} source={{uri:this.props.infoPost.datos.photo }}/> */}
                <Text>Text: {item.datos.post}</Text>
                <Text>Likes: {item.datos.likes.length}</Text>
              </React.Fragment>
              )
            } 
           }
        />}


      </View>
    );
  }
}

export default ProfileUsers;
