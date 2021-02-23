import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class DetalhesUnidadeScreen extends React.Component {
  
  state = {
    active: false,
    spinner: false,
  };

  verificar() {
    if(this.props.navigation.getParam('unidade').fields) {
      return(
        <ScrollView>
          <Card>
              <CardItem header bordered style={styles.header}>
                  <Text style={{fontWeight: 'bold', color: '#1E90FF', fontSize: 20}}>{this.props.navigation.getParam('unidade').fields.razao_social}</Text>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>CEP:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.cep}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Logradouro:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.logradouro}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Número:</Text>
                      <Text>{this.props.navigation.getParam('unidade').fields.numero}</Text>
                  </Right>
              </CardItem>
              <CardItem>
                <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Complemento:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.complemento}</Text>
                </Left>
              </CardItem>
              <CardItem>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Bairro:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.bairro}</Text>
                  </Left>
              </CardItem>
              <CardItem header bordered>
                  <Left>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Cidade:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.cidade}</Text>
                  </Left>
                  <Right>
                    <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Estado:</Text>
                    <Text>{this.props.navigation.getParam('unidade').fields.estado}</Text>
                  </Right>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Telefone:</Text>
                  <Text>{this.props.navigation.getParam('unidade').fields.telefone}</Text>
                </View>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>E-mail:</Text>
                  <Text>{this.props.navigation.getParam('unidade').fields.email}</Text>
                </View>
              </CardItem>
          </Card>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaConsultaUnidade', {consultas: this.props.navigation.getParam('unidade').fields.consultas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Consultas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaAutorizacaoUnidade', {autorizacoes: this.props.navigation.getParam('unidade').fields.autorizacoes})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Autorizações</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaExameUnidade', {exames: this.props.navigation.getParam('unidade').fields.exames})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Exames</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaEspecialistaUnidade', {especialistas: this.props.navigation.getParam('unidade').fields.especialistas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Especialistas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaResponsavelUnidade', {responsaveis: this.props.navigation.getParam('unidade').fields.responsaveis})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Responsáveis</Text>
            </CardItem>
          </TouchableOpacity>
        </ScrollView>
      )
    } else {
      return(
        <ScrollView>
          <Card>
              <CardItem header bordered style={styles.header}>
                  <Text style={{fontWeight: 'bold', color: '#1E90FF', fontSize: 20}}>{this.props.navigation.getParam('unidade').razao_social}</Text>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>CEP:</Text>
                      <Text>{this.props.navigation.getParam('unidade').cep}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Logradouro:</Text>
                      <Text>{this.props.navigation.getParam('unidade').logradouro}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Número:</Text>
                      <Text>{this.props.navigation.getParam('unidade').numero}</Text>
                  </Right>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Complemento:</Text>
                      <Text>{this.props.navigation.getParam('unidade').complemento}</Text>
                  </Left>
              </CardItem>
              <CardItem>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Bairro:</Text>
                      <Text>{this.props.navigation.getParam('unidade').bairro}</Text>
                  </Left>
              </CardItem>
              <CardItem header bordered>
                  <Left>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Cidade:</Text>
                      <Text>{this.props.navigation.getParam('unidade').cidade}</Text>
                  </Left>
                  <Right>
                      <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Estado:</Text>
                      <Text>{this.props.navigation.getParam('unidade').estado}</Text>
                  </Right>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Telefone:</Text>
                  <Text>{this.props.navigation.getParam('unidade').telefone}</Text>
                </View>
              </CardItem>
              <CardItem header bordered>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>E-mail:</Text>
                  <Text>{this.props.navigation.getParam('unidade').email}</Text>
                </View>
              </CardItem>
          </Card>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaConsultaUnidade', {consultas: this.props.navigation.getParam('unidade').consultas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Consultas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaAutorizacaoUnidade', {autorizacoes: this.props.navigation.getParam('unidade').autorizacoes})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Autorizações</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaExameUnidade', {exames: this.props.navigation.getParam('unidade').exames})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Exames</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaEspecialistaUnidade', {especialistas: this.props.navigation.getParam('unidade').especialistas})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Especialistas</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ListaResponsavelUnidade', {responsaveis: this.props.navigation.getParam('unidade').responsaveis})}>
            <CardItem header bordered style={styles.modal}>
              <Text style={styles.negrito}>Responsáveis</Text>
            </CardItem>
          </TouchableOpacity>
        </ScrollView>
      )
    }
  }
    
  render() {
    let verificar = this.verificar();
    return (
      <Container style={styles.container}>
        <Header style={styles.headerTittle}>
          <Text style={styles.headerText}>DETALHES UNIDADE DE SAÚDE</Text>
        </Header>
        {verificar}
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

  header: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    height: 105,
    flexDirection: 'row',
    justifyContent: "space-around",
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
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  modal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.65,
    elevation: 1.5,
  },

  text: {
    color: '#1E90FF',
  },
});