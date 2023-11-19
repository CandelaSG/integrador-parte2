import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList ,
  Image,
  ActivityIndicator
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
                    <View style={styles.activityIndicatorContainer}>
                      <ActivityIndicator  size='small' color='purple' />
                    </View>
                    :
                    <>
                    <View style={styles.containerLogo}>
                        <Image style={styles.logo} 
                        source={require('../../../assets/LOGO.png')}
                        resizeMode='contain'/>
                        </View>
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } navigation={this.props.navigation} /> }
                    />
                    </>
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
  containerLogo:{
    paddingTop:20,
    paddingBottom:10,
  },
  logo:{
    height:20
  },
  activityIndicatorContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default Home;
