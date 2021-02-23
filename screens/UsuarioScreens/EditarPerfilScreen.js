import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import NetInfo from '@react-native-community/netinfo';

export default class EditarPerfilScreen extends React.Component {

    state = {
        first_name: '',
        last_name: '',
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

    editar = async () => {
        this.setState({spinner: true});

        if(this.state.cep.trim().length < 8) {
            this.setState({color_line_cep: 'red'});
            this.setState({spinner: false});
            Alert.alert('Erro', 'CEP com valor inesperado. Preencha o campo com 8 números!');
        
        } else if(this.state.cpf.trim().length < 14) {
            this.setState({color_line_cpf: 'red'});
            this.setState({spinner: false});
            Alert.alert('Erro', 'CPF com valor inesperado. Preencha o campo com 11 números!');
        
        } else if(
            this.state.first_name.trim().length == 0 || this.state.last_name.trim().length == 0 ||
            this.state.telefone.trim().length == 0 || this.state.email.trim().length == 0 ||
            this.state.sexo.trim().length == 0 || this.state.cpf.trim().length == 0 ||
            this.state.sus.trim().length == 0 || this.state.rg.trim().length == 0 ||
            this.state.cep.trim().length == 0 || this.state.logradouro.trim().length == 0 ||
            this.state.numero.trim().length == 0 || this.state.bairro.trim().length == 0 ||
            this.state.cidade.trim().length == 0 || this.state.estado.trim().length == 0) {
            
            this.setState({spinner: false});
            Alert.alert('Erro', 'Preencha os campos em branco que são obrigatórios!');
        } else {

            const form = new FormData();
            form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
            form.append("first_name", this.state.first_name);
            form.append("last_name", this.state.last_name);
            form.append("cpf", this.state.cpf);
            form.append("sus", this.state.sus);
            form.append("rg", this.state.rg);
            form.append("sexo", this.state.sexo);
            form.append("cep", this.state.cep);
            form.append("logradouro", this.state.logradouro);
            form.append("numero", this.state.numero);
            form.append("complemento", this.state.complemento);
            form.append("bairro", this.state.bairro);
            form.append("cidade", this.state.cidade);
            form.append("estado", this.state.estado);

            const apiCall = await fetch('http://165.22.185.36/api/usuario/editar_perfil/', {
                method: 'POST',
                body: form,
            });

            this.setState({spinner: false});
            
            if(apiCall.status == 200) {
                Alert.alert('Sucesso!', 'Perfil editado.');
                this.props.navigation.navigate('Home');
            } else if(apiCall.status == 409) {
                Alert.alert('Atenção!', 'Verifique os campos com as linhas vermelhas.');
            }
        }
    }

    onChangeText = async (cep) => {

        this.setState({cep});

        let apiCall = await fetch('https://viacep.com.br/ws/'+cep+'/json/');
        const endereco = await apiCall.json();

        if(endereco.logradouro != undefined){
            
            if(endereco.logradouro != "") {
                this.setState({
                    logradouro: endereco.logradouro,
                });
            } else {
                this.setState({
                    text_logradouro: true,
                });
            }
            
            if(endereco.complemento != ""){
                this.setState({
                    complemento: endereco.complemento,
                });
            } else {
                this.setState({
                    text_complemento: true,
                });
            }
            
            if(endereco.bairro != ""){
                this.setState({
                    bairro: endereco.bairro,
                });
            } else {
                this.setState({
                    text_bairro: true,
                });
            }

            if(endereco.localidade != ""){
                this.setState({
                    cidade: endereco.localidade,
                });
            } else {
                this.setState({
                    text_cidade: true,
                });
            }

            if(endereco.uf != ""){
                this.setState({
                    uf: endereco.uf,
                });
            } else {
                this.setState({
                    text_uf: true,
                });
            }
            
            this.setState({color_line_cep: 'white'})

            /* parte que habilita o btn salvar
            document.getElementById('alert-4').style.display = "none";
            document.getElementById("btn").disabled = false; */

        } else {
            this.setState({color_line_cep: 'red'});
            Alert.alert('Erro', 'CEP inválido!')
        }
    }

    cpf = async (cpf) => {
        this.setState({cpf});

        const id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario')
        
        let apiCall = await fetch('http://165.22.185.36/api/usuario/?search='+cpf);
        const user = await apiCall.json();

        if(user[0] != null && user[0].id != id) {
            this.setState({color_line_cpf: 'red'});
            Alert.alert('Erro', 'CPF em uso, escolha outro!');
        } else {
            this.setState({color_line_cpf: 'white'});
        }
    };

    sus = async (sus) => {
        this.setState({sus})
        
        const sus_async = await AsyncStorage.getItem('@MinhaVezSistema:sus');

        let apiCall = await fetch('http://165.22.185.36/api/usuario/?search='+sus);
        const user = await apiCall.json();

        if(user[0] != null && user[0].sus != sus_async) {
            this.setState({color_line_sus: 'red'});
            Alert.alert('Erro', 'SUS em uso, escolha outro!');
        } else {
            this.setState({color_line_sus: 'white'});
        }
    };

    unsubscribe = NetInfo.addEventListener(async state => {
        if(state.isConnected) {
            this.setState({
                first_name: await AsyncStorage.getItem('@MinhaVezSistema:first_name'),
                last_name: await AsyncStorage.getItem('@MinhaVezSistema:last_name'),
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
    
            this.onChangeText(this.state.cep);
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
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                />
                <Header style={styles.headerTittle}>
                    <Text style={styles.headerText}>EDITAR PERFIL</Text>
                </Header>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
                <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    <Text style={{marginLeft: 10}}>*Nome:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome'
                        value={this.state.first_name}
                        inputStyle={{color: 'black'}}
                        label='Nome'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={first_name => this.setState({first_name})}
                    />
                    <Text style={{marginLeft: 10}}>*Sobrenome:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Sobrenome'
                        value={this.state.last_name}
                        inputStyle={{color: 'black'}}
                        label='Sobrenome'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={last_name => this.setState({last_name})}
                    />
                    <Text style={{marginLeft: 10}}>*Telefone:</Text>
                    <TextInputMask
                        style={styles.boxInput}
                        placeholder='Telefone'
                        keyboardType='numeric'
                        value={this.state.telefone}
                        inputStyle={{color: 'black'}}
                        label='CPF'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={(formatted) => this.setState({telefone: formatted})}
                        mask={"([00]) [00000]-[0000]"}
                        maxLength={15}
                    />
                    <Text style={{marginLeft: 10}}>*Sexo:</Text>
                    <Picker 
                        selectedValue={this.state.sexo}
                        style={{ height: 70, width: 200, color: '#1E90FF'}}
                        onValueChange={(itemValue, itemIndex) => this.setState({sexo: itemValue})}
                    >
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                        <Picker.Item label="Outro" value="Outro" />
                    </Picker>
                    <Text style={{marginLeft: 10}}>*CPF:</Text>
                    <TextInputMask
                        style={styles.boxInput}
                        placeholder='CPF'
                        keyboardType='numeric'
                        defaultValue={this.state.cpf}
                        underlineColorAndroid={this.state.color_line_cpf}
                        inputStyle={{color: 'black'}}
                        label='CPF'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={(formatted) => this.cpf(formatted)}
                        mask={"[000].[000].[000]-[00]"}
                        maxLength={14}
                    />
                    <Text style={{marginLeft: 10}}>*SUS:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='SUS'
                        keyboardType='numeric'
                        defaultValue={this.state.sus}
                        underlineColorAndroid={this.state.color_line_sus}
                        inputStyle={{color: 'black'}}
                        label='SUS'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={this.sus}
                    />
                    <Text style={{marginLeft: 10}}>*RG:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='RG'
                        keyboardType='numeric'
                        defaultValue={this.state.rg}
                        inputStyle={{color: 'black'}}
                        label='RG'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={rg => this.setState({rg})}
                    />
                    <Text style={{marginLeft: 10}}>*CEP:</Text>
                    <TextInputMask
                        style={styles.boxInput}
                        placeholder='CEP'
                        keyboardType='numeric'
                        defaultValue={this.state.cep}
                        underlineColorAndroid={this.state.color_line_cep}
                        inputStyle={{color: 'black'}}
                        label='CEP'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={this.onChangeText}
                        mask={"[00000]-[000]"}
                        maxLength={9}
                    />
                    <Text style={{marginLeft: 10}}>*Logradouro:</Text>
                    <TextInput
                        style={styles.boxInput}
                        editable={this.state.text_logradouro}
                        placeholder='Logradouro'
                        value={this.state.logradouro}
                        inputStyle={{color: 'black'}}
                        label='Logradouro'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={logradouro => this.setState({logradouro})}
                    />
                    <Text style={{marginLeft: 10}}>*Número:</Text>
                    <TextInput
                        style={styles.boxInput}
                        keyboardType='numeric'
                        placeholder='Número'
                        value={this.state.numero}
                        inputStyle={{color: 'black'}}
                        label='Número'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={numero => this.setState({numero})}
                    />
                    <Text style={{marginLeft: 10}}>Complemento:</Text>
                    <TextInput
                        style={styles.boxInput}
                        editable={this.state.text_complemento}
                        placeholder='Complemento'
                        value={this.state.complemento}
                        inputStyle={{color: 'black'}}
                        label='Complemento'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={complemento => this.setState({complemento})}
                    />
                    <Text style={{marginLeft: 10}}>*Bairro:</Text>
                    <TextInput
                        style={styles.boxInput}
                        editable={this.state.text_bairro}
                        placeholder='Bairro'
                        value={this.state.bairro}
                        inputStyle={{color: 'black'}}
                        label='Bairro'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={bairro => this.setState({bairro})}
                    />
                    <Text style={{marginLeft: 10}}>*Cidade:</Text>
                    <TextInput
                        style={styles.boxInput}
                        editable={this.state.text_cidade}
                        placeholder='Cidade'
                        value={this.state.cidade}
                        inputStyle={{color: 'black'}}
                        label='Cidade'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={cidade => this.setState({cidade})}
                    />
                    <Text style={{marginLeft: 10}}>*Estado:</Text>
                    <TextInput
                        style={styles.boxInput}
                        editable={this.state.text_estado}
                        placeholder='Estado'
                        value={this.state.estado}
                        inputStyle={{color: 'black'}}
                        label='Estado'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={estado => this.setState({estado})}
                    />
                </ScrollView>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.editar()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                        <Left style={{marginLeft: 20}}>
                            <AntDesing name='save' size={25} style={{color: 'green'}}/>
                        </Left>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 20 }} />
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