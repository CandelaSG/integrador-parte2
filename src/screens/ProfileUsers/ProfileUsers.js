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
            ;
      }
    )
}

  render() {
    console.log(this.state);
    console.log(this.props.route.params);
    return (
       <View>
        {<FlatList 
            data= {this.state.userInfo}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {
              return (
              <View style={styles.containerDatos}>
                <Text> { item.datos.userName } </Text>
                <Text> { item.datos.owner } </Text>
                {item.datos.miniBio.length > 0 ? <Text> { item.datos.miniBio } </Text> : false}
                <Text> { this.state.userPosts.length } posts</Text>
              </View>
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
              <View style={styles.containerPost}>
                <Image style={styles.camera} source={{uri:item.datos.photo}}/>
                <Text style={styles.textoPost}>{item.datos.post}</Text>
                {item.datos.likes.length == 1? 
                  <Text style={styles.textoPost}>{item.datos.likes.length} like</Text>
                  :
                  <Text style={styles.textoPost}>{item.datos.likes.length} likes</Text>
                }
                
              </View>
              )
            } 
           }
        />}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerDatos:{
    alignItems:'center',
    height: '100%',
    marginBottom:5,
  },
  containerPost: {
    marginTop: 5,
    marginBottom:5,
    height: '70%'
    
  },
  camera: {
      width: "100vw",
      height: '50vh',
      marginTop: 10,
      marginBottom:15
  },
  textoPost:{
    marginLeft:5,
  },
});

export default ProfileUsers;
