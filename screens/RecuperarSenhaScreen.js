import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Container, Left, Right} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default class RecuperarSenhaScreen extends React.Component {

    state = {
        email: '',
        spinner: false,
        color_line: 'white',
    }

    login() {
        this.props.navigation.navigate('Login');
    }

    solicitarSenha = async () => {

        this.setState({spinner: true});
       
        if(this.state.email.trim().length == 0) {
            this.setState({spinner: false});
            this.setState({color_line: 'red'});
            Alert.alert('Atenção!', 'Preencha o campo indicado.');
        
        } else {
            
            const form = new FormData();
            form.append("email", this.state.email);
    
            const apiCall = await fetch('http://165.22.185.36/api/usuario/alterar_senha/', {
                method: 'POST',
                body: form,
            });

            this.setState({spinner: false});
            this.login();
            Alert.alert('Redefinição de Senha!', 'Enviamos por e-mail instruções para definir sua senha.'+ 
            'Se existir uma conta com o e-mail que você digitou, você deve recebê-lo em breve.'+
            'Se você não receber um e-mail, certifique-se de inserir o endereço com o qual se registrou e verifique sua pasta de spam.');
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.boxContainer}>
                    <Image 
                        style={styles.img}
                        source={require('./../static/images/logo.png')}
                    />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Informe o e-mail cadastrado:</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='E-mail'
                        value={this.state.email}
                        inputStyle={{color: 'black'}}
                        underlineColorAndroid={this.state.color_line}
                        label='E-mail'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={email => this.setState({email})}
                    />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 70, justifyContent: "space-around"}}>
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => this.login()}>
                        <Text style={styles.buttonText2}>Cancelar</Text>
                        <AntDesing name='close' size={30} style={{color: 'white'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.solicitarSenha()}>
                        <Text style={styles.buttonText}>Enviar</Text>
                        <AntDesing name='check' size={30} style={{color: 'white'}} />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>

                </View>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    header: {
        marginTop: 100,
    },

    headerText: {
        fontSize: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    boxInput: {
        alignSelf: "stretch",
        height: 40,
        margin: 5,
        marginTop: 40,
        marginRight: 5,
        borderWidth: 2,
        borderColor: "#1E90FF",
        borderRadius: 5,
        padding: 10
    },

    img: {
        width: 300,
        height: 140,
    },

    boxContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        margin: 20,
        marginTop: 10,
        alignItems: 'center',
    },

    button: {
        backgroundColor: 'green',
        height: 50,
        width: 180,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },


    buttonCancel: {
        backgroundColor: 'red',
        height: 50,
        width: 180,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },


    buttonText: {
        fontSize: 20,
        marginLeft:40,
        color: 'white',
        fontWeight: 'bold',
    },

    buttonText2: {
        fontSize: 20,
        marginLeft: 25,
        color: 'white',
        fontWeight: 'bold',
    },
})