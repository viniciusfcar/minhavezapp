import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginScreen extends Component {

  state = {
    username: '',
    senha: '',
    token: '',
    usuario: '',
    id_usuario: '',
    modalVisible: false,
    spinner: false,
  };

  login = async () => {
    if(this.state.username.trim().length == 0 || this.state.senha.trim().length == 0){
      
      Alert.alert('Erro!', 'Preencha o email e senha');
    
    }else{
      this.setState({modalVisible: true});

      let username = this.state.username;
      let password = this.state.senha;

      const form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const apiCall = await fetch('http://165.22.185.36/api-token-auth/', {
        method: 'POST',
        body: form,
      });

      const response = await apiCall.json();

      this.setState({
        token: response.token,
      });

      try{
        
        if(this.state.token){
          this.setState({spinner: true});
          const form = new FormData();
          form.append("token", this.state.token);

          const apiCall1 = await fetch('http://165.22.185.36/api/usuario/verificaUser/', {
            method: 'POST',
            body: form,
          });

          var response1 = await apiCall1.json();
          
          this.setState({
            usuario: response1[0],
            id_usuario: response1[0].pk,
          });
          
          if(this.state.usuario) {
            await AsyncStorage.setItem("@MinhaVezSistema:token", JSON.stringify(this.state.token));
            await AsyncStorage.setItem("@MinhaVezSistema:usuario", JSON.stringify(this.state.usuario));
            await AsyncStorage.setItem("@MinhaVezSistema:id_usuario", JSON.stringify(this.state.id_usuario));
            this.setState({modalVisible: false, spinner: false});
            this.props.navigation.navigate('StackUser');
            
          } else {
            var mensagem = 'Sem permissão para usar o APP!';
            this.setState({modalVisible: false, spinner: false});
            Alert.alert('Atenção!', mensagem);
          }
        } else{
          var mensagem = 'Usuário e/ou Senha Inválido(s)!';

          this.setState({modalVisible: false, spinner: false});
          Alert.alert('Erro!', mensagem);
        }        
      }
      catch(erro){
        var mensagem = 'Usuário e/ou Senha Inválido(s)!';
        this.setState({modalVisible: false, spinner: false});
        Alert.alert('Erro!', mensagem);
      }
    }
  };

  cadastro() {
    this.props.navigation.navigate('StackCadastroUser');
  }

  alterarSenha() {
    this.props.navigation.navigate('StackRecuperarSenha');
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.boxContainer}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Aguarde, coletando dados...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Image 
              style={styles.img}
              source={require('./../static/images/logo_branca.png')}
            />
            <TextInput
                style={styles.boxInput}
                autoFocus
                placeholder="Username"
                autoCapitalize='none'
                keyboardType='email-address'
                value={this.state.username}
                onChangeText={username => this.setState({username})}
            />
            
            <TextInput
                style={styles.boxInput}
                placeholder="Senha"
                autoCapitalize='none'
                secureTextEntry={true}
                value={this.state.senha}
                onChangeText={senha => this.setState({senha})}
            />

            <TouchableOpacity 
              onPress={() => this.login()} 
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.cadastro()} 
              style={styles.buttonCadastro}>
              <Text style={{color: 'white', fontSize: 20}}>Cadastre-se</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.alterarSenha()}
              style={{marginTop: 5}}>
              <Text style={{color: 'white'}}>Esqueceu sua senha ? clique aqui</Text>
            </TouchableOpacity>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
  },
  imagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  boxInput: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: 40,
    margin: 5,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    marginTop: 10,
    padding: 20,
    backgroundColor: 'white',
    height: 40,
  },
  buttonCadastro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 60,
    padding: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1E90FF',
    fontSize: 20,
  },
  boxContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  img: {
    width: 310,
    height: 160,
    marginTop:25,
  },
  logoText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  spinnerTextStyle: {
    color: 'white',
    marginTop: 200,
  }
});