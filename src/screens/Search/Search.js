import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";

import { auth, db } from "../../firebase/config";




class Search extends Component {
  constructor() {
    super();
    this.state = { 
      search:'',
      resultsUserName:[],
      resultsEmail:[],
      results:[],
      hayResultados: false,
      allUsers:[]
    };
  }
    componentDidMount(){
        if (this.state.resultsUserName.length == 0 && this.state.resultsEmail.length == 0) {
            this.setState({
                hayResultados: false
            })
            
        }

        db.collection('user').onSnapshot(
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
                      allUsers: info
                  })
                  ;
            }
          )
        
    }

  search(event){

    this.setState({search: event.target.value})
    /* BUSCO POR EMAIL */
    db.collection('user').where('owner', '==', this.state.search)
    .get()
    .then(
        resultOwner => {
        let resultUsers = [];

        resultOwner.forEach( owner => {
            resultUsers.push(
                {
                    id: owner.id,
                    datos: owner.data()
                }
            )
        })

        this.setState({
            resultsEmail: resultUsers,
            hayResultados:true
        })
    })
    .catch(e=> console.log(e))

    db.collection('user').where('userName', '==', this.state.search)
    .get()
    .then(resultUserName => {
        let resultUsers = [];

        resultUserName.forEach( userName => {
            resultUsers.push(
                {
                    id: userName.id,
                    datos: userName.data()
                }
            )
        })

        this.setState({
            resultsUserName: resultUsers,
            hayResultados:true
        })
    }) 
    .catch(e=> console.log(e))
  }

  search2(event){
    this.setState({search: event.target.value})
    /* BUSCO POR EMAIL */
    db.collection('user').where('owner', '==', this.state.search).get()
    .then(resultOwner => {
        /* BUSCO POR NOMBRE DE USUARIO */
        db.collection('user').where('userName', '==', this.state.search).get()
            .then(resultUserName => {
                const resultUsers = [];
                resultOwner.forEach(user => {
                    resultUsers.push({
                        id: user.id,
                        datos: user.data()
                    });
                });
                resultUserName.forEach(doc => {
                    resultUsers.push({
                        id: doc.id,
                        datos: doc.data()
                    });
                });


                this.setState({
                    results: resultUsers,
                    hayResultados:true
                });
            })
            .catch(e => {
                console.error(e);
            });
    })
    .catch(e => {
        console.error(e);
    });
   
}

    filtro(event){ 
        this.setState({search: event.target.value});
        let filtroResults=[];
        this.state.allUsers.forEach(user => {
            console.log(user);
            if(user.email.includes(this.state.search)){}
            filtroResults.push({
                id: user.id,
                datos: user.data()
            });
        });
        this.setState({
            results:filtroResults
        })

    }

  render() {
    console.log(auth.currentUser);
    console.log(this.state);
    return (
        <View>

            <TextInput
            placeholder='Search by username or email'
            keyboardType='default'
            value={this.state.search}
            style={styles.input}
            onChange={(event) => this.search(event)}
            />
            
            {this.state.hayResultados == true
            ?
            <Text>Couldn't find what you are searching for</Text>
            :
            
            (this.state.resultsUserName.length > 0
                ?
                (<FlatList
                data = {this.state.resultsUserName}
                keyExtractor={user => user.id}
                renderItem = {({item}) => (
                    <View>
                    <Text>{item.datos.userName}</Text>
                    </View>
                )} 
            />):
                (<FlatList
                    data = {this.state.resultsEmail}
                    keyExtractor={user => user.id}
                    renderItem = {({item}) => (
                        <View>
                        <Text>{item.datos.owner}</Text>
                        </View>
                    )} 
                />))
            
            
            }

        </View>
      

        
    );
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

export default Search;
