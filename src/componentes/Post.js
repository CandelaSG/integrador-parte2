import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';   

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
        }

        
    }

    componentDidMount(){
        let likes = this.props.infoPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach( like => {if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }})
        }


        /* db.collection('user').where('owner','==', this.props.route.params).onSnapshot(
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
          ) */
    }


   likear(){
    db.collection("posts").doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(this.setState({like: true}))
   }

   dislike(){
    db.collection("posts").doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(this.setState({like: false}))
   }
   

    render(){
        console.log(this.props.infoPost);
        return(
            <View style={styles.formContainer}>
             
                {/* PERFIL */}
                <TouchableOpacity
                    onPress={ ()=> this.props.navigation.navigate('ProfileUsers', this.props.infoPost.datos.owner)}
                    style={styles.container}
                    >
                    <Image 
                        style={styles.profilePic} 
                        source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                        resizeMode='contain'/> 

                    <Text style={styles.userName}>{this.props.infoPost.datos.userName}</Text>
                </TouchableOpacity>
                
                {/* FOTO DEL POSTEO */}
                <Image style={styles.camera} source={{uri:this.props.infoPost.datos.photo }}/>
                {this.props.infoPost.datos.likes.length== 1? 
                  <Text style={styles.texto}>{this.props.infoPost.datos.likes.length} like</Text>
                  :
                  <Text style={styles.texto} >{this.props.infoPost.datos.likes.length} likes</Text>
                }
                
                <Text style={styles.usuario}>{this.props.infoPost.datos.userName} {this.props.infoPost.datos.post}</Text>
                

                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity style={styles.button} onPress={()=>this.dislike()}>
                    
                    <Text style={styles.textButton} >DISLIKE</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.likear()} >
                    <FontAwesome name={'heart'} />
                </TouchableOpacity>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      marginTop: 5,
      height: 400
      
    },
    container:{
        flex:1,
        flexDirection: 'row',
        height:50,
        width: '100vw',
        justifyContent:'left',
        marginLeft:5,
    },
    profilePic:{
        height:40,
        width:40,
        borderWidth:2,
        borderRadius:25,
        borderColor:'white',
        marginRight:10
    },
    texto:{
        paddingLeft:10,
    },
    userName:{
        paddingTop:10,
        paddingLeft:10,
    },
    camera: {
        width: "100vw",
        height: '70%',
        marginTop: 10,
        marginBottom:10
    },
    input: {
      height: 20,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
    },
    button: {
        flex:1,
      backgroundColor: "#E6DAE9",
      paddingHorizontal: 2,
      marginLeft:10,
      paddingVertical: 2,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: "solid",
      width: 30,
      justifyContent:'center'
    },
    textButton: {
      color: "#fff",
    },
    image: {
        height: 400,
      },
      usuario:{
        fontWeight:'bold'
      }
  });



export default Post;
