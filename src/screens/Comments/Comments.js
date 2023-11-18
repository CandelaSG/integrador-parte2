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
import { FontAwesome } from '@expo/vector-icons'; 


class Comments extends Component {
  constructor() {
    super();
    this.state = {
      listaComments: null
    };
  }

  componentDidMount(){
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
    console.log('------');
    console.log(this.state.listaComments);
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>     
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Menu")}
          style={styles.coontainerFlecha}>
         <FontAwesome style={styles.flecha} name="arrow-left" size='large'/>
       </TouchableOpacity>
       <Text style={styles.title}>post comments</Text>
       </View>
       {this.state.listaComments != null ?
        this.state.listaComments[0].datos.comments.length > 0 ?
          (<FlatList 
            data= {this.state.listaComments[0].datos.comments}
            keyExtractor={ i  => i.id }
            renderItem={ ({item}) => 
            {
            return (
              <View style={styles.description}>
              <TouchableOpacity
                  onPress={ ()=> this.props.navigation.navigate('Profile', item.owner)}>
                  <Text style={styles.nameDescription}>{item.owner} </Text>
              </TouchableOpacity>
                  <Text style={styles.comment}>{item.comment}</Text>
                 
              </View>
                )
                      }}
                />)
              :
              <Text>No comments</Text> 
              :
              false
      }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  title:{
    fontWeight: "bold",
    fontSize: 20
  },
  titleContainer:{
    flexDirection: 'row',
    height:50,
    width: '100vw',
    justifyContent:'left',
    marginLeft:5,
    marginBottom:10,
    alignItems:'center',
    backgroundColor: '#F4F4F3'
  },
  description:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'left',
    marginLeft:10,
    marginBottom:1,
    marginTop: 1
  },
  nameDescription:{
    fontWeight: 'bold',
  },
  comment:{
    padding: 2
  },
  coontainerFlecha:{
    marginLeft:20,
    marginRight: 20
  }
});

export default Comments;


