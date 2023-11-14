import React, { Component } from "react";
import { auth } from "../../firebase/config";

import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      logueado:false,
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
      this.setState({
        logueado: true
      })
    });
  }

  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
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
       {this.state.logueado == true ?
      <>
       <Text style={styles.title}> Login</Text>
        
       {/* EMAIL */}
       <TextInput
         style={styles.input}
         onChangeText={(text) => this.setState({ email: text })}
         placeholder="example@email.com"
         keyboardType="email-address"
         value={this.state.email}
       />

       {/* PASSWORD */}
       <TextInput
         style={styles.input}
         onChangeText={(text) => this.setState({ password: text })}
         placeholder="Password"
         keyboardType="default"
         secureTextEntry={true}
         value={this.state.password}
       />
       
       {this.state.email.length > 0 && this.state.password.length > 0 ? 

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
         onPress={() => this.props.navigation.navigate("Register")}
         style={styles.register}>
         <Text>Don't have an account? Register.</Text>
       </TouchableOpacity>
       </>
       : 
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator  size='small' color='purple' />
        </View>
       }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontWeight: 'bold',
    color: '#896a92',
  },
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor:'#eae0ed',
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#6c4e75',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,

  },
  buttonError:{
    flex:1,
    alignItems: 'center',
    backgroundColor:'#896a92',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius:4, 
    color: 'white'
},
  textButton: {
    color: "#fff",
  },
  textError:{
    color:'red'
},
register:{
  marginTop: 10
}
});

export default Login;
