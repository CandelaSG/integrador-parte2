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
        /* CREAR USUARIO */
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
        this.setState({ profilePic: url , showCamera: false});
      }

    render(){
        console.log(this.state)
        
        return(
            
            <>
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
                    <TextInput
                        style={styles.input}
                        onChangeText={(url)=>this.setState({profilePic: url})}
                        placeholder='Add the URL of your picture'
                        keyboardType='default'
                        value={this.state.profilePic}
                        />
                    {/* <TouchableOpacity style={styles.buttonPhoto} onPress={()=> this.setState({showCamera: true})}>
                        <Text> Add profile picture</Text>    
                    </TouchableOpacity>
                     */}
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
                    <Text style={styles.register}> You already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </>
            }
                
                
            </>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
        color: '#896a92',
        marginTop:10,
      },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        backgroundColor:'#eae0ed',
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 10,
    },
    button:{
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
    textButton:{
        color: '#fff'
    },
    textError:{
        color:'red'
    },
    register:{
        marginTop: 10
      },
      buttonPhoto:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#C1C1C1',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        marginBottom: 10,
      }

})


export default Register;
