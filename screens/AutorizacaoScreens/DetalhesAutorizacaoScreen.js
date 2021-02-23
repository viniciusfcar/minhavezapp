import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather/';

export default class DetalhesAutorizacaoScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      responsavel: '',
      unidade: '',
      razao_social: '',
      filas: [],
      fichas: [],
      id_usuario: '',
      participa: false,
      id_ficha: '',
      spinner: false,
    };
  }

  onResponsavel = async () => {

      const apiCall = await fetch('http://165.22.185.36/api/responsavel/' + 
        this.props.navigation.getParam('autorizacao').responsavel + '/')
      
      const response = await apiCall.json();
      
      this.setState({
        responsavel: response,
      });
  
      await AsyncStorage.setItem('@MinhaVezSistema:autorizacao_responsavel', JSON.stringify(this.state.responsavel));
  };

  onUnidade = async () => {

    const apiCall = await fetch('http://165.22.185.36/api/unidade_saude/'+
                    this.props.navigation.getParam('autorizacao').id + '/autorizacao_unidade/')
    const response = await apiCall.json();

    this.setState({
      unidade: response[0],
      razao_social: response[0].fields.razao_social,
    });
  };

  getUser = async () => {
    this.setState({
      id_usuario: await AsyncStorage.getItem('@MinhaVezSistema:id_usuario'),
    });
  };
  
  onFilas = async () => {
    this.setState({spinner: true});
    var lista = this.props.navigation.getParam('autorizacao').filas;
    var newLista = [];
    var fichas = [];

    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('http://165.22.185.36/api/fila/'+lista[i]+'/');
      const response = await apiCall.json();
      newLista.push(response);
    }

    this.setState({
      filas: newLista,
    });

    for(var i = 0; i < newLista.length; i++){
      for(var j = 0; j < newLista[i].fichas.length; j++){
        fichas.push(newLista[i].fichas[j]);
      }
    }
    
    for(var i = 0; i < fichas.length; i++){
      const apiCall = await fetch('http://165.22.185.36/api/ficha/'+fichas[i]+'/');
      const response = await apiCall.json();
      if(response.usuario == this.state.id_usuario){
        this.setState({
          participa: true,
          id_ficha: response.id,
        });
      }
    }

    this.setState({spinner: false});
  };

  desmarcar = async () => {
    const form = new FormData();
    form.append("id_ficha", this.state.id_ficha);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));

    const apiCall = await fetch('http://165.22.185.36/api/ficha/desistir_ficha/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status == 200) {
      this.setState({
        participa: false,
      });
      Alert.alert('Sucesso!','Autorização desmarcada.');
    
    } else if(apiCall.status == 401) {
      Alert.alert('Cuidado!', 'Sem permissão para tal ação, verifique e refaça se necessário.')
    
    } else if(apiCall.status == 511) {
      this.props.navigation.navigate('Logout');
      Alert.alert('Atenção!', 'Você não estálogado, refaça o login!');
    
    } else if(apiCall.status == 400) {
      Alert.alert('Atenção!', 'Requisição errada, contate o suporte!');
    }
  }

  marcar = async (pref) => {
    const form = new FormData();
    form.append("id_autorizacao", this.props.navigation.getParam('autorizacao').id);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    form.append("preferencial", pref);

    const apiCall = await fetch('http://165.22.185.36/api/ficha/cadastro_ficha_autorizacao/', {
      method: 'POST',
      body: form,
    });

    const response = await apiCall.json();
    
    if(response[0]){
      this.setState({
        active: false,
        participa: true,
        id_ficha: response[0].pk,
      });

      Alert.alert('Sucesso!', 'Autorização marcada, veja suas fichas!');
    
    } else if(apiCall.status == 511){
      this.props.navigation.navigate('Logout');
      Alert.alert('Erro!', 'Você não estálogado, refaça o login!');
    
    } else if(apiCall.status == 400){
      Alert.alert('Cuidado!', 'Requisição errada, contate o suporte!');
    
    } else if(apiCall.status == 403){
      Alert.alert('Não Permitido!', 'Você já participa dessa autorização, que tipo de ação está tentando ?');
    }else if(apiCall.status == 401){
      Alert.alert('Atenção!', 'Essa fila não contém fichas disponíveis!');
    }
  }

  onCheck(){
    this.setState({
      active: true,
    });
  }

  open(){
    if(this.state.active){
      return(
        <View>
          <TouchableOpacity onPress={() => this.setState({active: false})}>
            <Text style={styles.close}>x</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.marcar(0)} style={[styles.button, styles.buttonCancel]}>
              <Text>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.marcar(1)} style={[styles.button, styles.buttonAdd]}>
              <Text>Preferêncial</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  verifica(){
    if(this.props.navigation.getParam('autorizacao').create_fila){ 
      if(this.state.participa){
        return(
          <TouchableOpacity onPress={() => this.desmarcar()}>
            <View style={styles.header}>
              <Text style={styles.headerDanger}>Desmarcar</Text>
              <Left style={{marginLeft: 50}}>
                <Feather style={{color: 'red'}} size={25} name='x'/>
              </Left>
            </View>
          </TouchableOpacity>
        );
      } else {
        return(
          <TouchableOpacity onPress={() => this.onCheck()}>
            <View style={styles.header}>
              <Text style={styles.headerSuccess}>Marcar</Text>
              <Left style={{marginLeft: 50}}>
                <Feather name='check' size={25} style={{color: 'green'}}/>
              </Left>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      return(
        <View style={styles.header}>
          <Text style={styles.headerDanger}>Sem fila</Text>
          <Left style={{marginLeft: 50}}>
            <Feather style={{color: 'red'}} size={25} name='x'/>
          </Left>
        </View>
      );
    }
  };
  
  async componentDidMount() {
    this.onResponsavel();
    this.getUser();
    this.onUnidade();
    this.onFilas();
  };  
    
  render() {
    let verifica = this.verifica();
    let open = this.open();
    return (
      <Container style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={styles.headerTittle}>
          <Text style={styles.headerText}>DETALHES DA AUTORIZAÇÃO</Text>
        </Header>
        <View padder>
          <Card>
            <CardItem header>
              <Left>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome: </Text>
                  <Text>{this.props.navigation.getParam('autorizacao').nome}</Text>
              </Left>
              <Right>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status: </Text>
                  <Text>{this.props.navigation.getParam('autorizacao').status}</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora: </Text>
                  <Text>{this.props.navigation.getParam('autorizacao').hora}</Text>
              </Left>
              <Right>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data: </Text>
                  <Text>{this.props.navigation.getParam('autorizacao').data}</Text>
              </Right>
            </CardItem>
            <CardItem header>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Responsável</Text>
              </Left>
              <Right>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Unidade de Saúde</Text>
              </Right>
            </CardItem>
            <CardItem>
              <View>
                <Thumbnail style={styles.avatar} source={require('../../static/images/user.png')}/>
              </View>
              <Left>
                <Body>
                  <Text>{this.state.responsavel.nome}</Text>
                  <Text note>{this.state.responsavel.sobrenome}</Text>
                </Body>
              </Left>
              <Right>
                <Body>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalhesUnidade', {unidade: this.state.unidade})}>
                    <Text>{this.state.razao_social}</Text>
                  </TouchableOpacity>
                </Body> 
              </Right>
            </CardItem>
          </Card>
          {verifica}
          {open}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  headerTittle: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around",
    borderColor: 'white',
    borderBottomColor: 'white'
  },

  headerText: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
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
    color: 'green',
    marginLeft: 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  headerDanger: {
    fontSize: 20,
    color: 'red',
    marginLeft: 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  buttonContainer:{
    flexDirection: 'row',
  },

  buttonCancel:{
    backgroundColor: 'white',
    paddingHorizontal: 50,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  buttonAdd:{
    backgroundColor: 'white',
    paddingHorizontal: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  
  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 10,           
  },

  close: {
    fontSize: 25,
    color: 'red',
  },

  text: {
    color: '#1E90FF',  
  },
});