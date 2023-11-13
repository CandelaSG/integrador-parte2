import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList ,
  Image
} from "react-native";
import Post from "../../componentes/Post";

import { auth, db } from "../../firebase/config";



class Home extends Component {
  constructor() {
    super();
    this.state = {listaPost: []};
  }

  componentDidMount(){

    db.collection('posts').orderBy('createdAt' , 'desc').onSnapshot(
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
    console.log(this.state.listaPost);
    return (
      <View style={styles.container}>
        
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } navigation={this.props.navigation} /> }
                    />
                }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  image: {
    height: 400,
  },

});

export default Home;
