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
       <View style={styles.container}>
          <View style={styles.containerDatos}>
              <Image 
                style={styles.profilePic} 
                source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                resizeMode='contain'/> 
            {<FlatList 
              data= {this.state.userInfo}
              keyExtractor={ i  => i.id }
              renderItem={ ({item}) => 
              {
                return (
                <>
                  <Text> { item.datos.userName } </Text>
                  <Text> { item.datos.owner } </Text>
                  {item.datos.miniBio.length > 0 ? <Text> { item.datos.miniBio } </Text> : false}
                  <Text> { this.state.userPosts.length } posts</Text>
                </>
>
                )
              } 
            }
          />}
          </View>
        <View style={styles.containerPost}>
          {<FlatList 
              data= {this.state.userPosts}
              keyExtractor={ i  => i.id }
              numColumns={3}
              renderItem={ ({item}) => 
              {
                return (
                
                  <Image style={styles.camera} source={{uri:item.datos.photo}}/>
                
                )
              } 
            }
          />}
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* container:{
    flex:1
  }, */
  profilePic:{
    height:40,
    width:40,
    borderRadius:25,
    borderColor:'white',
    marginRight:10
},
  containerDatos:{
    alignItems:'center',
    height: '20%',
    marginBottom:5,

  },
  containerPost: {
    flex:1,
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom:5,
    height: '100%', 
    
  },
  camera: {
      width: "33vw",
      height: '20vh',
      marginTop: 10,
      marginBottom:15
  },
  textoPost:{
    marginLeft:5,
  },
});

export default ProfileUsers;