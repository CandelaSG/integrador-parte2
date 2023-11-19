import React, { Component } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet , Image} from "react-native";

import { db } from "../../firebase/config";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: [],
      selectedUserId: "",
    };
  }


  componentDidMount() {
      db.collection("user").onSnapshot((snapshot) => {
      let info = [];
      snapshot.forEach((doc) => {
        info.push({
          id: doc.id,
          datos: doc.data(),
        });
      });

      this.setState({
        results: info,
      });
    });
  }



  handleUserSelect(selectedUserId) {
    this.props.navigation.navigate('Profile', selectedUserId );
  }

  render() {
    const filteredResults = this.state.results.filter((user) =>
      user.datos.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );

    console.log(filteredResults)

    return (
      <View >
        <TextInput
          placeholder="Search by username ..."
          keyboardType="default"
          value={this.state.search}
          style={styles.input}
          onChangeText={(text) => this.setState({ search: text })}
        />

        <FlatList
          data={filteredResults}
          keyExtractor={(user) => user.id}
          style={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => this.handleUserSelect(item.datos.owner)}
            style={styles.containerProfile}>
              {item.datos.profilePic != '' ?
                    <Image 
                        style={styles.profilePic} 
                        source={{uri:item.datos.profilePic}}
                        resizeMode='contain'/> :
                        <Image 
                        style={styles.profilePic} 
                        source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                        resizeMode='contain'/> }
              <View>
              <Text >{item.datos.userName}</Text>
              <Text style={styles.email}>{item.datos.owner}</Text>
              
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{marginLeft:10,},
  email:{color:'grey'},
  containerProfile:{
    flexDirection: 'row',
    height:50
  },
  input: {
    height: 40,
    backgroundColor:'#eae0ed',
    paddingLeft: 10,
    margin:10,
    borderRadius:15,
  },
  profilePic:{
    height:40,
    width:40,
    borderWidth:2,
    borderRadius:25,
    borderColor:'white',
    marginRight:10
},
});

export default Search;