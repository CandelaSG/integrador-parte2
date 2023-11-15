import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";

import { auth, db } from "../../firebase/config";

import { FontAwesome } from '@expo/vector-icons';   


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: []
    };
  }
  componentDidMount() {
    /* BUSCO LOS USUARIOS */
    db.collection('user')
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot(
      data => {
        let info = []
        data.forEach(i => {
          info.push(
            {
              id: i.id,
              datos: i.data()
            })
        })

        this.setState({
          userInfo: info
    }, ()=> console.log(this.state.userInfo))
      }
    )

    /* BUSCO LOS POSTEOS */
    db.collection('posts')
    .where('owner', '==', auth.currentUser.email)
    .onSnapshot(
      data => {
        let info = []
        data.forEach(i => {
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


  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  deletePost(id) {
    db.collection('posts').doc(id).delete()
      .then(() => {
        console.log("Post eliminado")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    console.log(auth.currentUser.email);
    return (
      
      <View style={styles.formContainer}>
        
  
        {this.state.userInfo.length > 0 ?
        <>
          <View style= {styles.conteinerProfile}>
            
            <Image 
            style={styles.profilePic} 
            source={{uri:this.state.userInfo[0].datos.profilePic}}
            resizeMode='contain'/> 
            
            <View style={styles.containerDatos}>
            <Text style={styles.userName}> {this.state.userInfo[0].datos.userName} </Text>
            <Text> {this.state.userInfo[0].datos.owner} </Text>
            {this.state.userInfo[0].datos.miniBio.length > 0 ? <Text> {this.state.userInfo[0].datos.miniBio} </Text> : false}
            
            {this.state.userPosts.length == 0 ? 
              <Text style={styles.post}> { this.state.userPosts.length } posts</Text>
              :
               <Text style={styles.post}> { this.state.userPosts.length } post</Text>}

              <TouchableOpacity  onPress={() => this.logout()}>
              <Text style={styles.botonLogout}>Logout</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={styles.container}>

            {<FlatList
              data={this.state.userPosts}
              keyExtractor={i => i.id}
              renderItem={({ item }) => {
                return (

                  <View style={styles.containerPost}>
                    <Image style={styles.camera} source={{ uri: item.datos.photo }} />
                    
                    <TouchableOpacity style={styles.deleteButton} onPress={() => this.deletePost(item.id)}>
                      
                      <FontAwesome style={styles.dislike}  name='trash' size={15}/>
                      <Text style={styles.deleteText} >Delete post</Text>
                      
                    </TouchableOpacity>

                  </View>)
              }}
              />}

          </View>


          </>
          : 
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator  size='small' color='purple' />
          </View>
        }
        

          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deleteText:{
    color: 'black',
    fontWeight:'bold',
    marginLeft:5,
  },
  deleteButton:{
    width:'100%',
    height:30,
    flexDirection:'row',
    backgroundColor: '#D9D6D6',
    alignItems:'center',
    justifyContent:'center',
  },
  post:{
    color:'grey',
  },
  botonLogout:{
    color: "#ec5853",
    fontWeight:'bold',
  },
  activityIndicatorContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  container:{
    flex: 1,
    height:'100%'
  },
  userName:{
    fontWeight: 'bold'
  },
  formContainer: {
    height: '100%',
    marginBottom: 10,
    marginTop:20,
  },
  containerDatos:{
    marginBottom: 5,
  },
  conteinerProfile: {
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop:15,
  },
  containerPost: {
    marginTop: 5,
    marginBottom: 5,
    height: '70%'
  },
  camera: {
    width: "100vw",
    height: '50vh',
    marginTop: 10,
  },
  textoPost: {
    marginLeft: 5,
  },
  profilePic:{
    height:70,
    width:70,
    borderRadius:45,
    marginRight:10
},
});

export default Profile;

