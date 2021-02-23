import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo/';

export default class ListaConfiguracoesScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Configurações',
        drawerIcon: ({ tintColor }) => (
            <AntDesing style={{color: '#1E90FF'}} size={25} name='setting' />
        ),
        
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Entypo style={{color: 'white'}} size={40} name='menu' onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Text style={styles.headerText}>CONFIGURAÇÕES</Text>
                </Header>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <TouchableOpacity style={styles.headerDiversosKey} onPress={() => this.props.navigation.navigate('EditarEmail')}>
                    <Text style={styles.headerTextDiversosKey}>Editar E-mail</Text>
                    <Right style={{marginRight: 50}}>
                        <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                    </Right>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerDiversosKey} onPress={() => this.props.navigation.navigate('EditarUsername')}>
                    <Text style={styles.headerTextDiversosKey}>Editar Username</Text>
                    <Right style={{marginRight: 50}}>
                        <AntDesing name='edit' size={25} style={{color: '#1E90FF'}}/>
                    </Right>
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

    header: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        height: 100,
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 45,
    },

    headerDiversos: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 75,
        flexDirection: 'row',
        margin: 5,
        paddingRight: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    headerTextDiversos: {
        fontSize: 15,
        color: '#1E90FF',
        fontWeight: 'bold',
    },

    headerDiversosKey: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 75,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    headerTextDiversosKey: {
        fontSize: 20,
        color: '#1E90FF',
        fontWeight: 'bold',
    },

    icon: {
        color: '#1E90FF'
    },

    button: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        height: 50,
        width: 75,
        flexDirection: 'row',
        margin: 5,
        paddingLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    buttonText: {
        marginVertical: 8,
        width: 60,
        fontSize: 15,
        color: 'white',
    },

    logo: {
        marginHorizontal: 8,
        marginVertical: 8,
        width: 60,
        color: '#1E90FF',
    },

})