import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            lastComments: (this.props.infoPost.datos.comments || []).slice(-4)
        }
    }

    componentDidMount() {
        let likes = this.props.infoPost.datos.likes

        if (likes.length === 0) {
            this.setState({
                like: false
            })
        }
        if (likes.length > 0) {
            likes.forEach(like => {
                if (like === auth.currentUser.email) {
                    this.setState({ like: true })
                }
            })
        }

    }


    likear() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(this.setState({ like: true }))
    }

    dislike() {
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(this.setState({ like: false }))
    }


    render() {
        console.log(this.props.infoPost);
        console.log(this.state.lastComments);
        return (
            <View style={styles.formContainer}>

                {/* PERFIL */}
                {this.props.infoPost.datos.owner != auth.currentUser.email ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Profile', this.props.infoPost.datos.owner)}
                        style={styles.container}
                    >
                        {this.props.infoPost.datos.profilePic != '' ?
                            <Image
                                style={styles.profilePic}
                                source={{ uri: this.props.infoPost.datos.profilePic }}
                                resizeMode='contain' /> :
                            <Image
                                style={styles.profilePic}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                resizeMode='contain' />}
                        <Text style={styles.userName}>{this.props.infoPost.datos.userName}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('MyProfile', this.props.infoPost.datos.owner)}
                        style={styles.container}
                    >
                        {this.props.infoPost.datos.profilePic != "" ?
                            <Image
                                style={styles.profilePic}
                                source={{ uri: this.props.infoPost.datos.profilePic }}
                                resizeMode='contain' /> :
                            <Image
                                style={styles.profilePic}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                resizeMode='contain' />}
                        <Text style={styles.userName}>{this.props.infoPost.datos.userName}</Text>
                    </TouchableOpacity>
                }

                {/* FOTO DEL POSTEO */}
                <Image style={styles.camera} source={{ uri: this.props.infoPost.datos.photo }} />

                {/* LIKEAR */}
                <View style={styles.contenedorLikes}>
                    {this.state.like ?
                        <TouchableOpacity onPress={() => this.dislike()}>

                            <FontAwesome style={styles.dislike} name='heart' size={15} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.like} onPress={() => this.likear()} >

                            <FontAwesome name='heart-o' size={15} />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={styles.comment} onPress={() => this.props.navigation.navigate('Comments', this.props.infoPost.datos.photo)} >

                        <FontAwesome name="comment-o" size={15} color="black" />
                    </TouchableOpacity>
                </View>

                {/* CANTIDAD DE LIKES */}
                {this.props.infoPost.datos.likes.length == 1 ?
                    <Text style={styles.texto}>{this.props.infoPost.datos.likes.length} like</Text>
                    :
                    <Text style={styles.texto} >{this.props.infoPost.datos.likes.length} likes</Text>
                }

                <View style={styles.description}>

                    {/* USER DESCRIPCIÓN*/}
                    {this.props.infoPost.datos.owner != auth.currentUser.email ?
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Profile', this.props.infoPost.datos.owner)}>
                            <Text style={styles.nameDescription}>{this.props.infoPost.datos.userName} </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MyProfile', this.props.infoPost.datos.owner)}>
                            <Text style={styles.nameDescription}>{this.props.infoPost.datos.userName} </Text>
                        </TouchableOpacity>
                    }
                    <Text >{this.props.infoPost.datos.post}</Text>

                </View>


                {/* COMENTARIOS */}
                <FlatList style={styles.commentList}
                    data={this.state.lastComments}
                    keyExtractor={unPost => this.props.infoPost.id}
                    renderItem={({ item }) =>
                        <View style={styles.commentContainer}>
                            <Text style={styles.nameDescription}> {item.userName}</Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>}

                />
                <TouchableOpacity style={styles.commentCount}

                    onPress={() => this.props.navigation.navigate('Comments', this.props.infoPost.datos.photo)}>
                    {this.props.infoPost.datos.comments.length == 1 ?
                        <Text style={styles.textoComment}> View {this.props.infoPost.datos.comments.length} comment</Text>
                        :
                        <Text style={styles.textoComment}> View all {this.props.infoPost.datos.comments.length} comments</Text>
                    }
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 5,
        height: 500,
        marginBottom: 15,
    },
    dislike: {
        color: 'red'
    },
    contenedorLikes: {
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: 10,
        marginBottom: 5,
    },
    container: {
        flexDirection: 'row',
        height: 35,
        width: '100vw',
        justifyContent: 'left',
        marginLeft: 5,
    },
    profilePic: {
        height: 40,
        width: 40,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'white',
        marginRight: 10
    },
    texto: {
        paddingLeft: 10,
    },
    textoComment: {
        color: 'grey',
        paddingLeft: 10,
        marginTop: 5,
    },
    userName: {
        paddingTop: 10,
        paddingLeft: 6,
        fontWeight: 'bold',
    },
    camera: {
        width: "100vw",
        height: '60%',
        marginTop: 10,
        marginBottom: 10
    },

    comment: {
        paddingLeft: 10
    },
    image: {
        height: 400,
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: 10,
        marginBottom: 1,
    },
    nameDescription: {
        fontWeight: 'bold',
    },
    containerComment: {
        flexDirection: "row",
        alignItems: 'center',
        width: '100%',
        height: 100,
        flex: 1,
        backgroundColor: '#eae0ed',
        borderRadius: 10,
        marginTop: 5,
    },
    commentCount: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 5,
        justifyContent: 'left',
    },
    inputComment: {
        width: '90%',
        justifyContent: 'space-around',
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginRight: 5,
        borderRadius: 6,
        marginVertical: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: 10,
        alignItems: 'center'
    }
});



export default Post;
