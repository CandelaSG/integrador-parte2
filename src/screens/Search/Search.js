import React, { Component } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { auth, db } from "../../firebase/config";

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
    this.unsubscribe = db.collection("user").onSnapshot((snapshot) => {
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

/*   componentWillUnmount() {
    // Limpiar el listener de la base de datos al desmontar el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  } */

  handleUserSelect(selectedUserId) {
    // Redirigir a la pantalla de ProfileUsers con el ID del usuario seleccionado
    this.props.navigation.navigate('ProfileUsers', selectedUserId );
  }

  render() {
    // Filtrar usuarios basados en la entrada del usuario
    const filteredResults = this.state.results.filter((user) =>
      user.datos.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );

    console.log(filteredResults)

    return (
      <View>
        <TextInput
          placeholder="Search by username"
          keyboardType="default"
          value={this.state.search}
          style={styles.input}
          onChangeText={(text) => this.setState({ search: text })}
        />

        <FlatList
          data={filteredResults}
          keyExtractor={(user) => user.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleUserSelect(item.datos.owner)}>
              <Text>{item.datos.userName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});

export default Search;