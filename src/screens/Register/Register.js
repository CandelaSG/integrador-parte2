import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import MyCamera from '../../componentes/MyCamera'

class Register extends Component {
    constructor(){
        super()
        this.state={
            showCamera:false,
            email:'',
            userName:'',
            password:'',
            miniBio:'',
            profilePic: '',
            textError: false,
            url: ''
        }
    }
    
    register (email, pass, userName , miniBio , profilePic){
        /* ERRORES */
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({textError: "You must enter a valid email address"})
        }else if (this.state.password == '' || this.state.password.length <6){
            return this.setState({textError: "Your password must be at least 6 characters long"})
        }else if (this.state.userName == '') {
            return this.setState({textError:'You must complete the username'})
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .then( response => {
                console.log(response);
                db.collection("user").add({
                    owner: email,
                    createdAt: Date.now(),
                    userName: userName,
                    miniBio: miniBio,
                    profilePic: profilePic
                })
                this.props.navigation.navigate("Login")
            })
            .catch((error) => {
                this.setState({
                  textError: error.message
              })
                console.log(error);
              });

    }
    
    onImageUpload(url){
        this.setState({ url: url , showCamera: false});
      }

    render(){
        console.log(this.state)
        
        return(
            
            <View style={styles.container}>
                {this.state.showCamera
                ?
                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />    
            :
            <>
            <Text style={styles.title}>Register</Text>
                <View style={styles.formContainer}>
                {/* EMAIL */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='* example@email.com'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                
                {/* USER NAME */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='* Username'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                
                {/* PASSWORD */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='* Password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />

                {/* MINI BIO */}
                <TextInput
                    style={styles.input}
                    onChangeText={(bio)=>this.setState({miniBio: bio})}
                    placeholder='Tell us something about yourself'
                    keyboardType='default'
                    value={this.state.miniBio}
                    />

                {/* PROFILE PICTURE */}

                <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({showCamera: true})}>
                    <Text style={styles.textButton} > Add profile picture</Text>    
                </TouchableOpacity>
                
                {this.state.email.length > 0 && this.state.password.length >0 && this.state.userName.length > 0 ? 

                <TouchableOpacity style={styles.button} onPress={()=> 
                this.register(this.state.email, this.state.password, this.state.userName , this.state.miniBio , this.state.profilePic)}>
                    
                    <Text style={styles.textButton} > Register</Text>    
                
                </TouchableOpacity> : 
                
                <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({textError: 'You must complete the required fields'})}>
                    <Text style={styles.textButton} > Register</Text>    
                </TouchableOpacity> }

                {this.state.textError.length > 0 ? <Text style={styles.textError}> {this.state.textError} </Text> : false }
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text> You already have an account? Login</Text>
                </TouchableOpacity>
            </View>
            </>
            }
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold'
      },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    buttonError:{
        flex:1,
        alignItems: 'center',
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
    textButton:{
        color: '#fff'
    },
    textError:{
        color:'red'
    }

})


export default Register;
