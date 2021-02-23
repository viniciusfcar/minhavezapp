import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class AutorizacaoModal extends React.Component {
  
  state = {
    nome: '',
    hora: '',
    data: '',
    status: '',
    idFicha: 0,
    responsavel: '',
    idResponsavel: '',
  }

  onAutorizacao = async () => {
    const apiCall = await fetch('http://165.22.185.36/api/autorizacao/' + this.props.idFicha + '/autorizacao_ficha/')
    const response = await apiCall.json();    
    
    this.setState({
        nome: response[0].fields.nome,
        data: response[0].fields.data,
        hora: response[0].fields.hora,
        status: response[0].fields.status,
        idResponsavel: response[0].fields.responsavel
    });

    const apiCall2 = await fetch('http://165.22.185.36/api/responsavel/' + this.state.idResponsavel + '/')
    const response2 = await apiCall2.json();

    this.setState({
      responsavel: response2
    });
    
    await AsyncStorage.setItem('@MinhaVezSistema:autorizacaoModal', JSON.stringify(this.state.nome, this.state.data, this.state.status, this.state.responsavel));
  }
  
  async componentDidMount() {
    this.onAutorizacao();
  };
    
  render() {
    return (
        <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
          <View style={styles.container} padder>  
            <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados da Autorização</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                        <Text>{this.state.nome}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Hora:</Text>
                        <Text>{this.state.hora}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                        <Text>{this.state.data}</Text>
                    </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                    <Text>{this.state.status}</Text>
                  </Left>
                </CardItem>
                <CardItem>
                    <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Responsável:</Text>
                      <Text>{this.state.responsavel.nome} {this.state.responsavel.sobrenome}</Text>
                    </Left>
                </CardItem>
              <CardItem style={styles.buttonContainer}>
                <Right>
                  <TouchableOpacity onPress={() => this.props.onCancel()} style={[styles.button, styles.buttonCancel]}>
                      <Text style={styles.boxText}>Cancelar</Text>
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,         
    justifyContent: 'center',  
  },

  boxContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#DCDCDC',        
    justifyContent: 'center',  
    margin: 20,
    padding: 10, 
  },

  negrito: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  text: {
    color: '#1E90FF',
    margin: 5,   
  },

  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 10,           
  },

  buttonCancel:{
    backgroundColor: '#ff0000',
    paddingHorizontal: 50,       
    marginLeft: 10,
  },

  boxTex:{
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonContainer:{
    flexDirection: 'row',        
  },
});