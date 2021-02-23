import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import Entypo from 'react-native-vector-icons/Entypo/';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class EditarEmailScreen extends React.Component {

    state = {
        email: '',
        new_email: '',
    }

    alterar = async () => {
        const form = new FormData();

        form.append('email', this.state.email);
        form.append('new_email', this.state.new_email);
        form.append('token', await AsyncStorage.getItem('@MinhaVezSistema:token'));

        const apiCall = await fetch('http://165.22.185.36/api/usuario/editar_email/', {
            method: 'POST',
            body: form,
        });

        if(apiCall.status = '406') {
            Alert.alert('Atenção!', 'Preencha um novo e-mail válido.');
        
        } else if(apiCall.status = '404') {
            Alert.alert('Atenção!', 'Você está tentando alterar o e-mail de outro usuário ou que não existe.');
        
        } else if(apiCall.status = '200') {
            Alert.alert('Sucesso!', 'E-mail alterado.');
            this.props.navigation.navigate('Home');
        }

    }

    unsubscribe = NetInfo.addEventListener(state => {
    
        if(state.isConnected) {
          this.alterar();
        }
        else {
          Alert.alert('Alerta', 'Você está sem internet!');
        }
      });
      
      async componentDidMount() {
        this.unsubscribe();
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('./../../static/images/logo.png')}
                    />
                </View>
                <TextInput
                    style={styles.boxInput}
                    placeholder='E-mail Atual'
                    value={this.state.email}
                    inputStyle={{color: 'black'}}
                    underlineColorAndroid={this.state.color_line}
                    label='E-mail Atual'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={email => this.setState({email})}
                />
                <TextInput
                    style={styles.boxInput}
                    placeholder='Novo E-mail'
                    value={this.state.email}
                    inputStyle={{color: 'black'}}
                    underlineColorAndroid={this.state.color_line}
                    label='Novo E-mail'
                    labelStyle={{color: '#4169E1'}}
                    onChangeText={email => this.setState({new_email})}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.alterar()}>
                    <Text style={styles.textButton}>Alterar</Text>
                    <AntDesing name='edit' size={25} style={{color: 'white'}}/>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        margin: 20,
        marginTop: 10,
        alignItems: 'center',
    },

    button: {
        width: 150,
        height: 50,
        borderRadius: 3,
        marginTop: 20,
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    logo: {
        width: 300,
        height: 140,
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
})