import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';

export default class EditarPerfilScreen extends React.Component {

    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        cpf: '',
        rg: '',
        sus: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        sexo: '',
        telefone: '',
        spinner: false,
        text_logradouro: false,
        text_complemento: false,
        text_bairro: false,
        text_cidade: false,
        text_estado: false,
        color_line_cpf: 'white',
        color_line_sus: 'white',
        color_line_username: 'white',
        color_line_cep: 'white',
    }

    async componentDidMount() {
        this.setState({
            username: await AsyncStorage.getItem('@MinhaVezSistema:username'),
            first_name: await AsyncStorage.getItem('@MinhaVezSistema:first_name'),
            last_name: await AsyncStorage.getItem('@MinhaVezSistema:last_name'),
            email: await AsyncStorage.getItem('@MinhaVezSistema:email'),
            cpf: await AsyncStorage.getItem('@MinhaVezSistema:cpf'),
            rg: await AsyncStorage.getItem('@MinhaVezSistema:rg'),
            sus: await AsyncStorage.getItem('@MinhaVezSistema:sus'),
            cep: await AsyncStorage.getItem('@MinhaVezSistema:cep'),
            logradouro: await AsyncStorage.getItem('@MinhaVezSistema:logradouro'),
            numero: await AsyncStorage.getItem('@MinhaVezSistema:numero'),
            complemento: await AsyncStorage.getItem('@MinhaVezSistema:complemento'),
            bairro: await AsyncStorage.getItem('@MinhaVezSistema:bairro'),
            cidade: await AsyncStorage.getItem('@MinhaVezSistema:cidade'),
            estado: await AsyncStorage.getItem('@MinhaVezSistema:estado'),
            sexo: await AsyncStorage.getItem('@MinhaVezSistema:sexo'),
            telefone: await AsyncStorage.getItem('@MinhaVezSistema:telefone'),
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                />
                <Header style={styles.headerTittle}>
                    <Text style={styles.headerText}>MEUS DADOS</Text>
                </Header>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
                <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Username:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.username}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Nome:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.first_name}</Text>
                        <Text style={{paddingLeft: 2}}>{this.state.last_name}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Sexo:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.sexo}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>CPF:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.cpf}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>RG:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.rg}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>SUS:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.sus}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>E-mail:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.email}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Telefone:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.telefone}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>CEP:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.cep}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Logradouro:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.logradouro}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Número:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.numero}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Complemento:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.complemento}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Bairro:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.bairro}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Cidade:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.cidade}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text style={{fontWeight: 'bold', color: '#1E90FF'}}>Estado:</Text>
                        <Text style={{paddingLeft: 5}}>{this.state.estado}</Text>
                    </CardItem>
                </ScrollView>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    
    containerInput: {
        height: 50,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },

    headerTittle: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
        borderColor: 'white',
        borderBottomColor: 'white'
    },

    headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    },

    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 50,
        width: 150,
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
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },

    logo: {
        width: 30,
        color: 'green',
    },

    spinnerTextStyle: {
        color: '#1E90FF',
    },

    boxInput: {
        alignSelf: "stretch",
        height: 40,
        margin: 5,
        marginRight: 5,
        borderWidth: 2,
        borderColor: "#1E90FF",
        borderRadius: 5,
        padding: 10
    },
});