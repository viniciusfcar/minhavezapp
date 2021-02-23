import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class FilaModal extends React.Component {
  
  state = {
    nome: '',
    preferencial: '',
  }

  onFila = async () => {
    const apiCall = await fetch('http://165.22.185.36/api/fila/' + this.props.idFicha + '/fila_ficha/')
    const response = await apiCall.json(); 

    if(response[0].fields.fila_preferencial)
        this.setState({
            nome: response[0].fields.nome,
            preferencial: 'SIM',
        });
    else {
        this.setState({
            nome: response[0].fields.nome,
            preferencial: 'NÃO',
        });
    }
    
    await AsyncStorage.setItem('@MinhaVezSistema:filaModal', JSON.stringify(this.state.nome, this.state.preferencial));
  }
  
  async componentDidMount() {
    this.onFila();
  };
    
  render() {
    return (
        <Modal visible={this.props.visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
          <View style={styles.container} padder>  
            <Card style={styles.boxContainer}>
                <CardItem header bordered>
                    <Text style={styles.negrito}>Dados da Fila</Text>
                </CardItem>
                <CardItem>
                  <View>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                    <Text>{this.state.nome}</Text>
                  </View>
                </CardItem>
                <CardItem>
                  <View>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Preferencial:</Text>
                    <Text>{this.state.preferencial}</Text>
                  </View>
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