import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right, Header } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ConsultaModal from './Modais/ConsultaModal';
import FilaModal from './Modais/FilaModal';
import UnidadeModal from './Modais/UnidadeModal';
import AutorizacaoModal from './Modais/AutorizacaoModal';
import ExameModal from './Modais/ExameModal';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons/';

export default class DetalhesFichaScreen extends React.Component {
  
  state = {
    ficha: '',
    preferencial: '',
    status_fila: false,
    consulta: false,
    autorizacao: false,
    exame: false,
    idFicha: '',
    consultaModal: false,
    filaModal: false,
    unidadeModal: false,
    autorizacaoModal: false,
    exameModal: false,
    spinner: false,
    posicao_ficha: '',
  }

  onFicha = async () => {
    this.setState({spinner: true});
    const apiCall = await fetch('http://165.22.185.36/api/ficha/' + this.props.navigation.getParam('ficha').pk)
    const response = await apiCall.json();

    if(response.preferencial){
      this.setState({
        ficha: response,
        preferencial: 'SIM',
        idFicha: response.id
      });
    
    } else {
      this.setState({
        ficha: response,
        preferencial: 'NÃO',
        idFicha: response.id,
      });
    }

    const apiCall1 = await fetch('http://165.22.185.36/api/autorizacao/' + this.state.idFicha + '/autorizacao_ficha/')
    const response1 = await apiCall1.json();

    const apiCall2 = await fetch('http://165.22.185.36/api/consulta/' + this.state.idFicha + '/consulta_ficha/')
    const response2 = await apiCall2.json();

    const apiCall3 = await fetch('http://165.22.185.36/api/exame/' + this.state.idFicha + '/exame_ficha/')
    const response3 = await apiCall3.json();

    if(response1[0] != null) {
      this.setState({
        autorizacao: true,
        status_fila: response1[0].fields.status,
      });
    
    } else if(response2[0] != null) {
      this.setState({
        consulta: true,
        status_fila: response2[0].fields.status,
      });
    
    } else {
      this.setState({
        exame: true,
        status_fila: response3[0].fields.status,
      });
    }

    this.posicao();

    this.setState({spinner: false});

    await AsyncStorage.setItem('@MinhaVezSistema:detalhesFicha', JSON.stringify(this.state.ficha));
  }
  
  openModal(num) {
    if(num == '1'){
      this.setState({
        consultaModal: true
      })
    } else if(num == '2'){
      this.setState({
        filaModal: true
      })
    } else if(num == '3'){
      this.setState({
        unidadeModal: true
      })
    } else if(num == '4'){
      this.setState({
        autorizacaoModal: true
      })
    } else if(num == '5'){
      this.setState({
        exameModal: true,
      })
    }
  };

  closeModal = () => {
    this.setState({
      autorizacaoModal: false,
      filaModal: false,
      unidadeModal: false,
      consultaModal: false,
      exameModal: false,
    });
  };

  verificar() {
    if(this.state.consulta) {
      return (
        <TouchableOpacity onPress={() => this.openModal('1')}>
          <CardItem header bordered>
            <Text style={styles.negrito}>Dados da Consulta</Text>
            <Right>
              <SimpleLineIcons name='graph' size={40} style={styles.logo} />
            </Right>
          </CardItem>
        </TouchableOpacity>
      );
    } else if(this.state.autorizacao){
      return (
        <TouchableOpacity onPress={() => this.openModal('4')}>
          <CardItem header bordered>
            <Text style={styles.negrito}>Dados da Autorização</Text>
            <Right>
              <AntDesing name='folder1' size={40} style={styles.logo} />
            </Right>
          </CardItem>
        </TouchableOpacity>
      );
    } else {
      return(
        <TouchableOpacity onPress={() => this.openModal('5')}>
          <CardItem header bordered>
            <Text style={styles.negrito}>Dados do Exame</Text>
            <Right>
              <Entypo name='lab-flask' size={40} style={{color: '#1E90FF'}} />
            </Right>
          </CardItem>
        </TouchableOpacity>
      )
    }
  }

  modalAutorizacao() {
    if(this.state.ficha.id) {
      return(
        <AutorizacaoModal idFicha={this.state.idFicha} visible={this.state.autorizacaoModal} 
          onCancel={this.closeModal}/>
      ) 
    }
  }

  modalExame() {
    if(this.state.ficha.id) {
      return(
        <ExameModal idFicha={this.state.idFicha} visible={this.state.exameModal} 
          onCancel={this.closeModal}/>
      ) 
    }
  }

  modalFila() {
    if(this.state.ficha.id) {
      return(
        <FilaModal idFicha={this.state.idFicha} visible={this.state.filaModal} 
          onCancel={this.closeModal}/>
      ) 
    }
  }

  modalUnidade() {
    if(this.state.ficha.id) {
      return(
        <UnidadeModal idFicha={this.state.idFicha} visible={this.state.unidadeModal} 
          onCancel={this.closeModal}/>
      ) 
    }
  }

  modalConsulta() {
    if(this.state.ficha.id) {
      return(
        <ConsultaModal idFicha={this.state.idFicha} visible={this.state.consultaModal} 
          onCancel={this.closeModal}/>
      ) 
    }
  }

  desmarcar = async () => {
    const form = new FormData();
    form.append("id_ficha", this.state.idFicha);
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));

    const apiCall = await fetch('http://165.22.185.36/api/ficha/desistir_ficha/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status == 200) {
      this.props.navigation.navigate('Home');
      Alert.alert('Sucesso!', 'Ficha desmarcada.');
    
    } else if(apiCall.status == 401) {
      Alert.alert('Atenção!','Sem permissão para tal ação, verifique e refaça se necessário');
    
    } else if(apiCall.status == 511) {
      this.props.navigation.navigate('Logout');
      Alert.alert('Cuidado!', 'Você não estálogado, refaça o login.');
    
    } else if(apiCall.status == 400) {
      Alert.alert('Erro!', 'Requisição errada, contate o suporte.');
    }
  }

  mostra_posicao() {
    if(this.state.status_fila == 'INICIADA') {
      if(this.state.posicao_ficha == 0) {
        return(
          <TouchableOpacity onPress={() => this.posicao()}>
            <View style={styles.header}>
              <Text style={styles.headerPosicao}>É a sua vez, esteja pronto!</Text>
              <Right style={{marginRight: 20}}>
                <Icon style={{color: '#1E90FF'}} name='refresh'/>
              </Right>
            </View>
          </TouchableOpacity>
        )
      } else {
        return(
          <TouchableOpacity onPress={() => this.posicao()}>
            <View style={styles.header}>
              <Text style={styles.headerPosicao}>Faltam {this.state.posicao_ficha} fichas, fique atento!</Text>
              <Right style={{marginRight: 20}}>
                <Icon style={{color: '#1E90FF'}} name='refresh'/>
              </Right>
            </View>
          </TouchableOpacity>
        )
      }
    }
  }

  posicao = async () => {
    
    if(this.state.status_fila == 'INICIADA'){
      const apiCall5 = await fetch('http://165.22.185.36/api/ficha/'+this.state.idFicha+'/consulta_posicao_ficha')
      const response5 = await apiCall5.json();

      this.setState({posicao_ficha: response5});
    }
  };

  async componentDidMount() {
    this.onFicha();
    this.verificar();
  }  
    
  render() {
    let corpo = this.verificar()
    let modalAutorizacao = this.modalAutorizacao()
    let modalFila = this.modalFila()
    let modalUnidade = this.modalUnidade()
    let consultaModal = this.modalConsulta()
    let modalExame = this.modalExame()
    let posicao = this.mostra_posicao()
    return (
      <Container style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={styles.headerTittle}>
          <Text style={styles.headerText}>DETALHES DA FICHA</Text>
        </Header>
        <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 10 }} />
        <View padder>
        {posicao}
          <Card>
            <CardItem header bordered>
              <Text style={styles.negrito}>Dados da Ficha</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Sua ficha é:</Text>
                <Text>{this.state.ficha.numero}</Text>
              </Left>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Preferencial:</Text>
                <Text>{this.state.preferencial}</Text>
              </Left>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                <Text>{this.state.ficha.status}</Text>
              </Left>
            </CardItem>
            <TouchableOpacity onPress={() => this.openModal('2')}>
              <CardItem header bordered>
                <Text style={styles.negrito}>Dados da Fila</Text>
                <Right>
                  <AntDesing name='team' size={40} style={{color: '#1E90FF'}} />
                </Right>
              </CardItem>
            </TouchableOpacity>
            {corpo}
            <TouchableOpacity onPress={() => this.openModal('3')}>
              <CardItem header bordered>
                <Text style={styles.negrito}>Dados da Unidade</Text>
                <Right>
                  <AntDesing name='home' size={40} style={{color: '#1E90FF'}} />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>
          <TouchableOpacity onPress={() => this.desmarcar()}>
            <View style={styles.header}>
              <Text style={styles.headerDanger}>Desmarcar</Text>
              <Left style={{marginLeft: 50}}>
                <Icon style={{color: 'red'}} name='close'/>
              </Left>
            </View>
          </TouchableOpacity>
          {modalAutorizacao}
          {modalFila}
          {modalUnidade}
          {modalExame}
          {consultaModal}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e7e7',
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
    borderBottomColor: 'white',
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
  },

  text: {
    color: '#1E90FF',  
  },

  headerDanger: {
    fontSize: 20,
    color: 'red',
    marginLeft: 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  headerPosicao: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
  },
});