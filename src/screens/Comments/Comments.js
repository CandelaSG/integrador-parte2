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

import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';
import { auth, db } from "../../firebase/config";
import { FontAwesome } from '@expo/vector-icons';


class Comments extends Component {
  constructor() {
    super();
    this.state = {
      commentedPic: null,
      userInfo: [],
      comment: ""
    };
  }

  componentDidMount() {
    db.collection('posts').where('photo', '==', this.props.route.params).onSnapshot(
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
          commentedPic: info
        })
          ;
      })

    db.collection('user')
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(
        data => {
          let info = []
          data.forEach(i => {
            info.push({
              id: i.id,
              datos: i.data()
            })
          })

          this.setState({
            userInfo: info
          })
        })
  }

  comment(texto) {
    db.collection("posts").doc(this.state.commentedPic[0].id).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email,
        comment: texto,
        userName: this.state.userInfo[0].datos.userName,
        profilePic: this.state.userInfo[0].datos.profilePic,
        createdAt: Date.now()
      })
    })
      .then(this.setState({ comment: "" }))
  }

  render() {
    console.log(this.props);
    console.log('------');
    console.log(this.state.commentedPic);
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Menu" )}
            style={styles.coontainerFlecha}>
            <FontAwesome style={styles.flecha} name="arrow-left" size='large' />
          </TouchableOpacity>
          <Text style={styles.title}>comments</Text>
        </View>

        {this.state.commentedPic != null ?
          this.state.commentedPic[0].datos.comments.length > 0 ?
            (<FlatList
              data={this.state.commentedPic[0].datos.comments}
              keyExtractor={item => item.createdAt}
              renderItem={({ item }) => {
                return (
                  <View style={styles.description}>
                    {item.owner != auth.currentUser.email ?
                        <TouchableOpacity style={styles.user}
                        onPress={() => this.props.navigation.navigate('Profile', item.owner)}>
                        {item.profilePic != '' ?
                          <Image
                            style={styles.profilePic}
                            source={{ uri: item.profilePic }}
                            resizeMode='contain' />
                          :
                          <Image
                            style={styles.profilePic}
                            source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                            resizeMode='contain' />
                        }
  
                        <Text style={styles.nameDescription}>{item.userName} </Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                      </TouchableOpacity>
                  :
                      <TouchableOpacity style={styles.user}
                      onPress={() => this.props.navigation.navigate('MyProfile', item.owner)}>
                      {item.profilePic != '' ?
                        <Image
                          style={styles.profilePic}
                          source={{ uri: item.profilePic }}
                          resizeMode='contain' />
                        :
                        <Image
                          style={styles.profilePic}
                          source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                          resizeMode='contain' />
                      }

                      <Text style={styles.nameDescription}>{item.userName} </Text>
                      <Text style={styles.comment}>{item.comment}</Text>
                    </TouchableOpacity>
                  }



                  </View>

                )

              }}
            />)
            :
            <Text style={styles.description}> Be the first to comment...</Text>
          :
          false
        }

        <View style={styles.containerComment}>
          <TextInput
            style={styles.inputComment}
            onChangeText={(text) => this.setState({ comment: text })}
            placeholder="Comment..."
            keyboardType="default"
            value={this.state.comment}
          />
          <TouchableOpacity onPress={() => this.comment(this.state.comment)}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  user: {
    flexDirection: 'row',
    height: 50,
    width: '100vw',
    justifyContent: 'left',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  profilePic: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'white',
    marginRight: 10
  },
  titleContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'left',
    marginLeft: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F4F4F3'
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 1,
    marginTop: 1
  },
  nameDescription: {
    fontWeight: 'bold',
  },
  comment: {
    padding: 2
  },
  coontainerFlecha: {
    marginLeft: 20,
    marginRight: 20
  },
  containerComment: {
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    alignContent: "flex-end",
    backgroundColor: '#eae0ed',
    borderRadius:10,
  },
  inputComment: {
    width: '90%',
    justifyContent: 'space-around',
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,

  }
});

export default Comments;


