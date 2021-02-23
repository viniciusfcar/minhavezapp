import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class ConsultaModal extends React.Component {
  
  state = {
    nome: '',
    hora: '',
    data: '',
    status: '',
    idFicha: 0,
    especialista: '',
    idEspecialista: '',
  }

  onConsulta = async () => {
    const apiCall = await fetch('http://165.22.185.36/api/consulta/' + this.props.idFicha + '/consulta_ficha/')
    const response = await apiCall.json();    
    
    this.setState({
        nome: response[0].fields.nome,
        hora: response[0].fields.hora,
        data: response[0].fields.data,
        status: response[0].fields.status,
        idEspecialista: response[0].fields.especialista
    });

    const apiCall2 = await fetch('http://165.22.185.36/api/especialista/' + this.state.idEspecialista + '/')
    const response2 = await apiCall2.json();

    this.setState({
      especialista: response2
    });
    
    await AsyncStorage.setItem('@MinhaVezSistema:consultaModal', JSON.stringify(this.state.nome, this.state.data, this.state.status, this.state.especialista));
  }
  
  async componentDidMount() {
    this.onConsulta();
  };
    
  render() {
    return (
        <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
          <View style={styles.container} padder>  
            <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados da Consulta</Text>
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
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Especialista:</Text>
                      <Text> Dr(a) {this.state.especialista.nome} {this.state.especialista.sobrenome}</Text>
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
    color: '#1E90FF'
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