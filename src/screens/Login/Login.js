import react, { Component } from "react";
import { auth } from "../../firebase/config";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      textError: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Menu");
      }
    });
  }

  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        //Cuando firebase responde sin error
        console.log("Login ok", response);

        //Cambiar los estados a vacío como están al inicio.

        //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate("Menu");
      })
      .catch((error) => {
        if (error.code == 'auth/internal-error'){
          this.setState({
            textError: "Check your email or password"
          })
        }
        else {
        this.setState({
          textError: error.message
      })}
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="email"
          keyboardType="email-address"
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="password"
          keyboardType="default"
          secureTextEntry={true}
          value={this.state.password}
        />
        
        {this.state.email.length > 1 && this.state.password.length > 1 ? 

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login(this.state.email, this.state.password)}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({textError: 'You must complete the required fields'})}>
        <Text style={styles.textButton} > Login</Text>    
        </TouchableOpacity> }  
        {this.state.textError.length > 0 ? <Text style={styles.textError}> {this.state.textError} </Text> : false }

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Registro")}>
          <Text>You don't have an account? Register.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    flex:1,
    alignItems: 'center',
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  buttonError:{
    backgroundColor:'grey',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius:4, 
    borderWidth:1,
    borderStyle: 'solid',
    borderColor: 'white',
    color: 'white'
},
  textButton: {
    color: "#fff",
  },
  textError:{
    color:'red'
}
});

export default Login;
