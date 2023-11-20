import React, { Component } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";

import { auth, db } from "../../firebase/config";
import { FontAwesome } from '@expo/vector-icons';


class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            commentedPic: null,
            userInfo: [],
            userName: '',
            miniBio: '',
            profilePic: '',
        };
    }

    componentDidMount() {

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
                        userInfo: info,
                        userName: info[0].datos.userName,
                        profilePic: info[0].datos.profilePic,
                        miniBio: info[0].datos.miniBio
                    })
                })
    }

    editUser(){
        db.collection("user").doc(this.state.userInfo[0].id).update({
              userName: this.state.userName,
              profilePic: this.state.profilePic,
              miniBio: this.state.miniBio

            })
            .then((response) => {
                this.props.navigation.navigate("MyProfile");
              })
        }

    render() {
        console.log(this.state.userInfo);
        return (
            <View style={styles.formContainer}>
                {this.state.userInfo.length > 0 ?
                    <>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Home")}
                            style={styles.coontainerFlecha}>
                            <FontAwesome style={styles.flecha} name="arrow-left" size='large' />
                        </TouchableOpacity>
                        {/* USER NAME */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ userName: text })}
                            keyboardType='default'
                            value={this.state.userName}
                        />

                        {/* MINI BIO */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(bio) => this.setState({ miniBio: bio })}
                            placeholder='miniBio'
                            keyboardType='default'
                            value={this.state.miniBio}
                        />

                        {/* PROFILE PICTURE */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(url) => this.setState({ profilePic: url })}
                            placeholder='Add the URL of your profile picture'
                            keyboardType='default'
                            value={this.state.profilePic}
                        />
                    </>
                    : <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size='small' color='purple' />
                    </View>
                }
                <TouchableOpacity style={styles.button} onPress={() => this.editUser()}> 
                    <Text style={styles.textButton} > Modify</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#896a92',
        marginTop: 10,
    },
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#eae0ed',
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 10,
        color: 'grey'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6c4e75',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
    },
    buttonError: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#896a92',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        color: 'white'
    },
    textButton: {
        color: '#fff'
    },
    textError: {
        color: 'red'
    },
    register: {
        marginTop: 10
    },
    buttonPhoto: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#C1C1C1',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginBottom: 10,
    }

})

export default EditProfile;


