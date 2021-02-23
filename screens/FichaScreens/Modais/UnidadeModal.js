import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class UnidadeModal extends React.Component {
  
  state = {
    razao_social: '',
    telefone: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: '',
    complemento: '',
    email: '',
    bairro: ''
  }

  onUnidade = async () => {
    const apiCall = await fetch('http://165.22.185.36/api/unidade_saude/' + this.props.idFicha + '/unidade_ficha/')
    const response = await apiCall.json();    
    
    this.setState({
        razao_social: response[0].fields.razao_social,
        telefone: response[0].fields.telefone,
        cidade: response[0].fields.cidade,
        estado: response[0].fields.estado,
        logradouro: response[0].fields.logradouro,
        numero: response[0].fields.numero,
        complemento: response[0].fields.complemento,
        email: response[0].fields.email,
        bairro: response[0].fields.bairro
    });
    
    await AsyncStorage.setItem('@MinhaVezSistema:unidadeModal', JSON.stringify(this.state.razao_social, 
        this.state.telefone, this.state.cidade, this.state.estado, this.state.rua, this.state.numero, 
            this.state.complemento, this.state.email, this.state.bairro));
  }
  
  async componentDidMount() {
    this.onUnidade();
  };
    
  render() {
    return (
        <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
          <View style={styles.container} padder>  
            <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados da Unidade</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                        <Text>{this.state.razao_social}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Telefone:</Text>
                        <Text>{this.state.telefone}</Text>
                    </Left>
                </CardItem>
                <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>E-mail:</Text>
                    <Text>{this.state.email}</Text>
                  </Left>
                </CardItem>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Endereço</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Logradouro:</Text>
                        <Text style={{ marginRight: 30 }}>{this.state.logradouro}</Text>
                    </Left>
                    <Right>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Número:</Text>
                        <Text>{this.state.numero}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Complemento:</Text>
                        <Text>{this.state.complemento}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Bairro:</Text>
                        <Text>{this.state.bairro}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Cidade:</Text>
                        <Text style={{ marginRight: 20 }}>{this.state.cidade}</Text>
                    </Left>
                    <Right>
                        <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Estado:</Text>
                        <Text>{this.state.estado}</Text>
                    </Right>
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
    padding: 20,    
  },

  negrito: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  text: {
    color: '#1E90FF', 
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