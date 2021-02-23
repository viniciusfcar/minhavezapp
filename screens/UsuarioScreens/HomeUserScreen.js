import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons/';
import Entypo from 'react-native-vector-icons/Entypo/';
import OneSignal from 'react-native-onesignal';


export default class HomeUserScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Entypo style={{color: '#1E90FF'}} size={25} name='home' />
    ),
  }
  
  state = {
    idNotificacao: '',
    token: '',
    usuario: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    rg: '',
    sus: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    sexo: '',
    imagem: '',
    spinner: false,
    total_notificacao: '',
  };

  idsPush = async (push) => {

    const form = new FormData();
    form.append("notificacao", push.userId);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    
    const apiCall = await fetch('http://165.22.185.36/api/usuario/set_notificacao/', {
      method: 'POST',
      body: form,
    });
  }

  notificacao() {
    if(this.state.total_notificacao > 0 && this.state.total_notificacao < 9) {
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaNotificacao')}>
          <Right style={{marginVertical: 45}}>
            <Text style={{position:'absolute'}}/>
            <AntDesing style={{color: 'white',}} size={35} name='bells'/>
            <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}>{this.state.total_notificacao}</Text>
          </Right>
        </TouchableOpacity>
      )
    } else if(this.state.total_notificacao > 9) {
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaNotificacao')}>
        <Right style={{marginVertical: 45}}>
          <Text style={{position:'absolute'}}/>
          <AntDesing style={{color: 'white',}} size={35} name='bells'/>
          <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}>9+</Text>
        </Right>
      </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaNotificacao')}>
          <Right style={{marginVertical: 45}}>
            <Text style={{position:'absolute'}}/>
            <AntDesing style={{color: 'white',}} size={35} name='bells'/>
            <Text style={{backgroundColor: 'white', borderRadius: 100, position:'absolute'}}></Text>
          </Right>
        </TouchableOpacity>
      )
    }
  }

  load = async () => {
    
    const id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario');
    const apiCall = await fetch('http://165.22.185.36/api/usuario/'+id+'/');
    const response = await apiCall.json();

    const id_user = response.user;
    const apiCall2 = await fetch('http://165.22.185.36/api/user/'+id_user+'/');
    const response2 = await apiCall2.json();

    const apiCall3 = await fetch('http://165.22.185.36/api/usuario/'+id+'/total_notificacao_app/');
    const response3 = await apiCall3.json();

    await AsyncStorage.setItem("@MinhaVezSistema:telefone", response.telefone);
    await AsyncStorage.setItem("@MinhaVezSistema:username", response2.username);
    await AsyncStorage.setItem("@MinhaVezSistema:first_name", response2.first_name);
    await AsyncStorage.setItem("@MinhaVezSistema:last_name", response2.last_name);
    await AsyncStorage.setItem("@MinhaVezSistema:email", response2.email);
    await AsyncStorage.setItem("@MinhaVezSistema:cpf", response.cpf);
    await AsyncStorage.setItem("@MinhaVezSistema:sus", response.sus);
    await AsyncStorage.setItem("@MinhaVezSistema:rg", response.rg);
    await AsyncStorage.setItem("@MinhaVezSistema:cep", response.cep);
    await AsyncStorage.setItem("@MinhaVezSistema:logradouro", response.logradouro);
    await AsyncStorage.setItem("@MinhaVezSistema:numero", JSON.stringify(response.numero));
    await AsyncStorage.setItem("@MinhaVezSistema:complemento", response.complemento);
    await AsyncStorage.setItem("@MinhaVezSistema:cidade", response.cidade);
    await AsyncStorage.setItem("@MinhaVezSistema:estado", response.estado);
    await AsyncStorage.setItem("@MinhaVezSistema:sexo", response.sexo);
    await AsyncStorage.setItem("@MinhaVezSistema:bairro", response.bairro);
    await AsyncStorage.setItem("@MinhaVezSistema:imagem", response.imagem);
    
    this.setState({
      token: await AsyncStorage.getItem('@MinhaVezSistema:token'),
      usuario: await AsyncStorage.getItem('@MinhaVezSistema:usuario'),
      total_notificacao: response3,
    });

    OneSignal.init('0414c64c-3f63-486a-8fa2-78ce89f5032e');
    OneSignal.addEventListener('ids', this.idsPush);

  }
  
  async componentDidMount() {
    
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.load();
      }
    );
    
  }
  
  render() {
    let notificacao = this.notificacao()
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Entypo style={{color: 'white'}} size={40} name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Image 
            style={styles.img}
            source={require('./../../static/images/logo_branca.png')}
          />
          {notificacao}
        </Header>
        <View style={{ borderBottomColor: 'white', borderBottomWidth: 10 }} />
        <ScrollView ontentInsetAdjustmentBehavior="automatic">
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaFicha')}>
            <Text style={styles.headerTextDiversos}>Minhas Fichas</Text>
            <Right>
              <AntDesing name='tago' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaAgendamento')}>
            <Text style={styles.headerTextDiversos}>Meus Agendamentos</Text>
            <Right>
              <AntDesing name='book' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaConsulta')}>
            <Text style={styles.headerTextDiversos}>Consultas</Text>
            <Right>
              <SimpleLineIcons name='graph' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaAutorizacao')}>
            <Text style={styles.headerTextDiversos}>Autorizações</Text>
            <Right>
              <AntDesing name='folder1' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaExame')}>
            <Text style={styles.headerTextDiversos}>Exames</Text>
            <Right>
              <Entypo name='lab-flask' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaEspecialista')}>
            <Text style={styles.headerTextDiversos}>Especialistas</Text>
            <Right>
              <Entypo name='users' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDiversos}
            onPress={() => this.props.navigation.navigate('ListaUnidade')}>
            <Text style={styles.headerTextDiversos}>Unidades de Saúde</Text>
            <Right>
              <AntDesing name='home' size={40} style={styles.logo} />
            </Right>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    height: 120,
    flexDirection: 'row',
    justifyContent: "space-around",
    borderColor: 'white',
    borderBottomColor: 'white'
  },

  headerDiversos: {
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

  headerText: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 60,
  },

  headerTextDiversos: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    width: 60,
    color: '#1E90FF',
  },

  img: {
    width: 205,
    height: 105,
    marginRight: 20,
  },
});
