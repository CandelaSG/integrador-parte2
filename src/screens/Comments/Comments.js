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



class Comments extends Component {
  constructor() {
    super();
    this.state = {listaPost: []};
  }

  componentDidMount(){
    //Traer datos
    db.collection('posts').onSnapshot(
        posteos => {
            let postsAMostrar = [];

            posteos.forEach( unPost => {
                postsAMostrar.push(
                    {
                        id: unPost.id,
                        datos: unPost.data()
                    }
                )
            })

            this.setState({
                listaPost: postsAMostrar
            })
        }
    )
}


  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
});

export default Comments;
