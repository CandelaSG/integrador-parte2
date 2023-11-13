import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

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
        console.log(this.props.infoPost.datos);
        return(
            <View style={styles.formContainer}>
                <TouchableOpacity
                    onPress={ ()=> this.props.navigation.navigate('ProfileUsers', this.props.infoPost.datos.owner)}>
                    <Text style={styles.userName}>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                {/* <Text>Email: {this.props.infoPost.datos.owner}</Text> */}
                <Image style={styles.camera} source={{uri:this.props.infoPost.datos.photo }}/>
                {this.props.infoPost.datos.likes.length== 1? 
                  <Text style={styles.texto}>{this.props.infoPost.datos.likes.length} like</Text>
                  :
                  <Text style={styles.texto} >{this.props.infoPost.datos.likes.length} likes</Text>
                }
                
                <Text style={styles.texto}>{this.props.infoPost.datos.owner} {this.props.infoPost.datos.post}</Text>
                

                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity style={styles.button} onPress={()=>this.dislike()}>
                    <Text style={styles.textButton} >Dislike</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                    <Text style={styles.textButton} >Like</Text>
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
      backgroundColor: "salmon",
      paddingHorizontal: 10,
      marginLeft:10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "salmon",
      width: "30%",
    },
    textButton: {
      color: "#fff",
    },
  });



export default Post;
