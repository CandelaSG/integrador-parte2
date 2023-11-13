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
    }, ()=> console.log(this.state.userInfo))
      }
    )

    /* BUSCO LOS POSTEOS */
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

    return (
      <View style={styles.formContainer}>
        {this.state.userInfo.length > 0 ?
          <>
            <Text> {this.state.userInfo[0].datos.userName} </Text>
            <Text> {this.state.userInfo[0].datos.owner} </Text>
            {this.state.userInfo[0].datos.miniBio.length > 0 ? <Text> {this.state.userInfo[0].datos.miniBio} </Text> : false}
            <Text> { this.state.userPosts.length } posts</Text>
          </>
          : false
        }
        <View style={styles.container}>

        {<FlatList
          data={this.state.userPosts}
          keyExtractor={i => i.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerPost}>
                <Image style={styles.camera} source={{ uri: item.datos.photo }} />
                <Text style={styles.textoPost}>{item.datos.post}</Text>
                {item.datos.likes.length == 1 ?
                  <Text style={styles.textoPost}>{item.datos.likes.length} like</Text>
                  :
                  <Text style={styles.textoPost}>{item.datos.likes.length} likes</Text>
                }
                <TouchableOpacity onPress={() => this.deletePost(item.id)}>
                  <Text>Delete post</Text>
                </TouchableOpacity>

              </View>)
          }}
          />}

          </View>

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{flex: 1},
  formContainer: {
    height: '100%',
    marginBottom: 10,
  },
  containerDatos: {
    alignItems: 'center',
    height: '100%',
    marginBottom: 5,
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
    marginBottom: 15
  },
  textoPost: {
    marginLeft: 5,
  },
});

export default Profile;

