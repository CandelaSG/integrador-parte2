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
import { FontAwesome } from '@expo/vector-icons'; 


class Comments extends Component {
  constructor() {
    super();
    this.state = {
      listaPost: [],
      listaComments: []
    };
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
     db.collection('posts').where('photo','==', this.props.route.params).onSnapshot(
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
                listaComments: info 
            })
            ;
      })
    }
  render() {
    console.log(this.props);
    console.log(this.state.listaComments[0]);
    return (
      <View style={styles.container}>     
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Menu")}
          style={styles.coontainerFlecha}>
         <FontAwesome style={styles.flecha} name="arrow-left" size='large'/>
       </TouchableOpacity>
       {/* {<FlatList 
            data= {this.state.listaComments[0].datos.comments}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {
            return (
                <Text> {item} </Text>
                        
                    )
                      } 
                    }
                  />} */}
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
