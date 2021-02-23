import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default class PerfilUserScreen extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Image 
                style={styles.img}
                source={require('./../../static/images/user.png')}
            />
        ),
        
    }

    state = {
        username: '',
        first_name: '',
        last_name: '',
        imagem: '',
    }

    async componentDidMount() {
        this.setState({
            username: await AsyncStorage.getItem('@MinhaVezSistema:username'),
            first_name: await AsyncStorage.getItem('@MinhaVezSistema:first_name'),
            last_name: await AsyncStorage.getItem('@MinhaVezSistema:last_name'),
            imagem: await AsyncStorage.getItem('@MinhaVezSistema:imagem'),
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <View style={{marginTop: 30}}>
                        <Left>
                            <Entypo style={{color: 'white'}} size={40} name='menu' onPress={() => this.props.navigation.openDrawer()} />
                        </Left>
                    </View>
                    <TouchableOpacity style={styles.viewButton} onPress={() => this.props.navigation.navigate('EditarFotoPerfil')}>
                        <Image
                            style={styles.imgPage}
                            source={{uri: this.state.imagem}}
                        />
                    </TouchableOpacity>
                </Header>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Username:</Text>
                    <Text style={{paddingLeft: 5}}>{this.state.username}</Text>
                </CardItem>
                <CardItem header bordered>
                    <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Nome:</Text>
                    <Text style={{paddingLeft: 5}}>{this.state.first_name}</Text>
                    <Text style={{paddingLeft: 2}}>{this.state.last_name}</Text>
                </CardItem>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <TouchableOpacity style={styles.viewButton} onPress={() => this.props.navigation.navigate('VerDados')}>
                    <View style={styles.headerButton}>
                        <Text style={styles.headerSuccess}>Ver Dados</Text>
                        <Left style={{marginLeft: 30}}>
                            <AntDesing name='eyeo' size={25} style={{color: '#1E90FF'}}/>
                        </Left>
                    </View>
                </TouchableOpacity>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <TouchableOpacity style={styles.viewButton} onPress={() => this.props.navigation.navigate('EditarPerfil')}>
                    <View style={styles.headerButton}>
                        <Text style={styles.headerSuccess}>Editar</Text>
                        <Left style={{marginLeft: 50}}>
                            <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                        </Left>
                    </View>
                </TouchableOpacity>
            </Container>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    img: {
        width: 35,
        height: 35,
    },

    imgPage: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginRight: 30,
        borderRadius: 100,
    },

    header: {
        backgroundColor: '#1E90FF',
        height: 250,
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
        color: 'white',
    },

    headerButton: {
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        height: 55,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        paddingLeft: 50,
    },

    headerSuccess: {
        fontSize: 20,
        color: '#1E90FF',
        marginLeft: 70,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    
    logo: {
        marginHorizontal: 8,
        marginVertical: 8,
        width: 60,
        color: '#1E90FF',
      },

})