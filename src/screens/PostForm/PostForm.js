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
import MyCamera from '../../componentes/MyCamera'

class PostForm extends Component {
  constructor() {
    super();
    this.state = { 
      post: "",
      showCamera:true,
      url: '',
      userInfo: ''
    };
  }

  componentDidMount(){
    db.collection('user').where("owner", "==", auth.currentUser.email).onSnapshot(
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
    }, ()=> console.log(this.state))
      }
    )
  }

  postear(){
    db.collection("posts").add({
        owner: auth.currentUser.email,
        post: this.state.post,
        photo: this.state.url,
        likes: [],
        comments:[],
        createdAt: Date.now(),
        userName: this.state.userInfo[0].datos.userName,
        profilePic: this.state.userInfo[0].datos.profilePic,
    })
    .then( 
      this.setState ({ 
        post: "",
        showCamera:true,
        url: ''
      })
      )
    .catch(error => console.log(`El error fue: ${error}`))
  }

  onImageUpload(url){
    this.setState({ url: url , showCamera: false});
  }

  
  render() {
    console.log(this.state.userInfo);
    return (
      <View style={styles.container}>

        {this.state.showCamera ?
          <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
          :
          <React.Fragment>

          <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ post: text })}
          placeholder="Description"
          keyboardType="default"
          value={this.state.post}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.postear()
            this.props.navigation.navigate('Home')
            
          
          }}
        >
          <Text style={styles.textButton} >Post</Text>
        </TouchableOpacity>

        </React.Fragment>
      
        }
      </View>
      

        
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flex:1
    },
    formContainer: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginVertical: 10,
      backgroundColor:'#eae0ed',
    },
    button: {
      backgroundColor: '#6c4e75',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
    },
    textButton: {
      color: "#fff",
    },
  });

export default PostForm;
