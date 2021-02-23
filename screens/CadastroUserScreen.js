import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default class CadastroUserScreen extends React.Component {

    state = {
        username: '',
        password: '',
        confirm_senha: '',
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
        color_line_senha: 'white',
        color_line_confir_senha: 'white',
    }

    onCancel() {
        this.props.navigation.navigate('Login');
    }

    cadastro = async () => {
        this.setState({spinner: true});

        if(this.state.cep.trim().length < 8) {
            this.setState({color_line_cep: 'red'});
            this.setState({spinner: false});
            Alert.alert('Erro', 'CEP com valor inesperado. Preencha o campo com 8 números!');
        
        } else if(this.state.cpf.trim().length < 14) {
            this.setState({color_line_cpf: 'red'});
            this.setState({spinner: false});
            Alert.alert('Erro', 'CPF com valor inesperado. Preencha o campo com 11 números!');
        
        } else if(this.state.username.trim().length == 0 || this.state.email.trim().length == 0 ||
            this.state.first_name.trim().length == 0 || this.state.last_name.trim().length == 0 ||
            this.state.telefone.trim().length == 0 || this.state.email.trim().length == 0 ||
            this.state.cpf.trim().length == 0 || this.state.password.trim().length == 0 ||
            this.state.confirm_senha.trim().length == 0 ||
            this.state.sus.trim().length == 0 || this.state.rg.trim().length == 0 ||
            this.state.cep.trim().length == 0 || this.state.logradouro.trim().length == 0 ||
            this.state.numero.trim().length == 0 || this.state.bairro.trim().length == 0 ||
            this.state.cidade.trim().length == 0 || this.state.estado.trim().length == 0) {
            
            this.setState({spinner: false});
            Alert.alert('Erro', 'Preencha os campos em branco que são obrigatórios!');
        } else {

            const form = new FormData();
            form.append("username", this.state.username);
            form.append("telefone", this.state.telefone);
            form.append("password", this.state.password);
            form.append("email", this.state.email);
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

            const apiCall = await fetch('http://165.22.185.36/api/usuario/cadastro_user/', {
                method: 'POST',
                body: form,
            });

            this.setState({spinner: false});
            
            if(apiCall.status == 200) {
                this.props.navigation.navigate('Login');
                Alert.alert('Sucesso!', 'Realize o login para acessar sua conta!');
            } else if(apiCall.status == 406) {
                Alert.alert('Atenção!', 'O e-mail preenchido não é válido!');
            } else if(apiCall.status == 409) {
                Alert.alert('Atenção!', 'Verifique os campos com as linhas vermelha!.');
            } else if(apiCall.status == 400) {
                Alert.alert('Erro', 'Que tipo de ação está tentando fazer ? Contate o suporte!');
            }
        }
    }

    onChangeText = async () => {

        const cep = this.state.cep;

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
                    estado: endereco.uf,
                });
            } else {
                this.setState({
                    text_estado: true,
                });
            }
            
            this.setState({color_line_cep: 'white'})

            /*parte que habilita o btn salvar
            document.getElementById('alert-4').style.display = "none";
            document.getElementById("btn").disabled = false; */

        } else {
            this.setState({color_line_cep: 'red'});
            Alert.alert('Erro', 'CEP inválido!')
        }
    }

    cpf = async () => {
        const cpf = this.state.cpf;

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

    username = async () => {
        const username = this.state.username;

        const username_async = await AsyncStorage.getItem('@MinhaVezSistema:username');
        
        let apiCall = await fetch('http://165.22.185.36/api/user/?search='+username);
        const user = await apiCall.json();

        if(user[0] != null && user[0].username != username_async ) {
            this.setState({color_line_username: 'red'});
            Alert.alert('Erro', 'Username em uso, escolha outro!');
        } else {
            this.setState({color_line_username: 'white'});
        }
    };

    sus = async () => {
        const sus = this.state.sus;
        
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

    confirmeSenha = async () => {

        if(this.state.confirm_senha == this.state.password) {
            this.setState({color_line_confir_senha: 'white'});
        } else {
            this.setState({color_line_confir_senha: 'red'});
            Alert.alert('Erro', 'Senhas estão diferentes');
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.headerTittle}>
                    <Text style={styles.headerText}>CADASTRE-SE</Text>
                    <Right>
                        <Image 
                            style={{width: 60, height: 50}}
                            source={require('./../static/images/isotipo_branco.png')}
                        />
                    </Right>
                </Header>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
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
                    <Text style={{marginLeft: 10}}>*Sexo:</Text>
                    <Picker 
                        selectedValue={this.state.sexo}
                        style={{ height: 50, width: 150, color: '#1E90FF'}}
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
                        onEndEditing={this.cpf}
                        onChangeText={(formatted) => this.setState({cpf: formatted})}
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
                        onEndEditing={this.sus}
                        onChangeText={sus => this.setState({sus})}
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
                    <CardItem header bordered/>
                    <Text style={{marginLeft: 10, marginTop: 15}}>*CEP:</Text>
                    <TextInputMask
                        style={styles.boxInput}
                        placeholder='CEP'
                        keyboardType='numeric'
                        defaultValue={this.state.cep}
                        underlineColorAndroid={this.state.color_line_cep}
                        inputStyle={{color: 'black'}}
                        label='CEP'
                        labelStyle={{color: '#4169E1'}}
                        onEndEditing={this.onChangeText}
                        onChangeText={(formatted) => this.setState({cep: formatted})}
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
                        onChangeText={estado => this.setState({estado})}
                    />
                    <CardItem header bordered/>
                    <Text style={{marginLeft: 10, marginTop: 15}}>*Username:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Username'
                        defaultValue={this.state.username}
                        underlineColorAndroid={this.state.color_line_username}
                        inputStyle={{color: 'black'}}
                        label='Username'
                        labelStyle={{color: '#4169E1'}}
                        Outlined='focused'
                        onEndEditing={this.username}
                        onChangeText={username => this.setState({username})}
                    />
                    <Text style={{marginLeft: 10}}>*Senha:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Senha'
                        value={this.state.password}
                        secureTextEntry={true}
                        inputStyle={{color: 'black'}}
                        autoCapitalize='none'
                        onChangeText={password => this.setState({password})}
                    />
                    <Text style={{marginLeft: 10}}>*Confirme a senha:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Confirme a senha'
                        value={this.state.confirm_senha}
                        underlineColorAndroid={this.state.color_line_confir_senha}
                        secureTextEntry={true}
                        inputStyle={{color: 'black'}}
                        autoCapitalize='none'
                        onEndEditing={this.confirmeSenha}
                        onChangeText={confirm_senha => this.setState({confirm_senha})}
                    />
                    <Text style={{marginLeft: 10}}>*E-mail:</Text>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='E-mail'
                        value={this.state.email}
                        inputStyle={{color: 'black'}}
                        label='E-mail'
                        labelStyle={{color: '#4169E1'}}
                        onChangeText={email => this.setState({email})}
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
                </ScrollView>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: "space-around",}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onCancel()}>
                        <Text style={styles.buttonText2}>Cancelar</Text>
                        <AntDesing name='close' size={30} style={styles.logo2} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.cadastro()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                        <AntDesing name='save' size={30} style={styles.logo} />
                    </TouchableOpacity>
                </View>
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
        borderBottomColor: 'white',
        height: 70,
    },

    headerText: {
        fontSize: 30,
        color: 'white',
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },

    buttonText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
    },

    buttonText2: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },

    logo: {
        color: 'green',
    },
    
    logo2: {
        color: 'red',
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