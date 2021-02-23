import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import UnidadeSaudeScreen from '../UnidadeSaudeScreens/UnidadeSaudeScreen';
import Spinner from 'react-native-loading-spinner-overlay';

export default class DetalhesEspecialistaScreen extends React.Component {
  
  state = {
    especializacoes: [],
    profissao: '',
    unidades: [],
    spinner: false,
  }

  onProfissao = async () => {
      const id_profissao = this.props.navigation.getParam('especialista').profissao

      const apiCall = await fetch('http://165.22.185.36/api/profissao/' + id_profissao + '/')
      const response = await apiCall.json();

      this.setState({
        profissao: response,
      });
  
      await AsyncStorage.setItem('@MinhaVezSistema:especialista_profissao', JSON.stringify(this.state.profissao));
  }

  onEspecializacao = async ()  => {
    
    try {
      const lista = this.props.navigation.getParam('especialista').especializacao;
      const new_lista = [];

      for(var i=0; i < lista.length; i++) {

        const apiCall = await fetch('http://165.22.185.36/api/especializacao/' + lista[i] + '/')
        const response = await apiCall.json();

        new_lista.push(response);
      }

      this.setState({
        especializacoes: new_lista,
      });

      console.log(this.state.especializacoes)
  
      await AsyncStorage.setItem('@MinhaVezSistema:especialista_especializacao', JSON.stringify(this.state.especializacoes));
    
    } catch(error) {

    }
  }

  onUnidades = async ()  => {
    this.setState({spinner: true});
    const apiCall = await fetch('http://165.22.185.36/api/especialista/' + this.props.navigation.getParam('especialista').id + '/unidadesEspecialista/')
    const response = await apiCall.json();

    this.setState({
      unidades: response,
    });
    this.setState({spinner: false});
    await AsyncStorage.setItem('@MinhaVezSistema:especialista_unidades', JSON.stringify(this.state.unidades));
  }
  
  async componentDidMount() {
    
    this.onProfissao()
    this.onEspecializacao()
    this.onUnidades()
  }  
    
  render() {
    return (
      <Container style={styles.container}>
        <Spinner
          visible={this.state.spinner}
        />
        <Header style={styles.headerTittle}>
          <Text style={styles.headerText}>DETALHES DO ESPECIALISTA</Text>
        </Header>
        <View padder>
          <Card>
            <CardItem>
              <Image
                style={styles.avatar}
                source={{uri: this.props.navigation.getParam('especialista').imagem}}
              />
              <Left>
                <Body>
                  <Text>{this.props.navigation.getParam('especialista').nome}</Text>
                  <Text note>{this.props.navigation.getParam('especialista').sobrenome}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <View padder>
                  <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Profissão:</Text>
                  <Text>{this.state.profissao.nome}</Text>
                </View>
              </Left>
              <Right>
                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Especialização:</Text>
                <ScrollView ontentInsetAdjustmentBehavior="automatic">
                  {this.state.especializacoes.map(esp => 
                    <View>
                      <Text>{esp.nome}</Text>
                    </View>
                  )}
                </ScrollView>
              </Right>
            </CardItem>
          </Card>
          <View style={styles.header}>
            <Text style={{color: '#4169E1', fontSize: 25}}>Locais de Atendimento:</Text>
          </View>
          <ScrollView ontentInsetAdjustmentBehavior="automatic">
            {this.state.unidades.map(unidade =>
              <TouchableOpacity key={unidade.id}
                onPress={() => this.props.navigation.navigate('DetalhesUnidade', {unidade: unidade})}>
                <UnidadeSaudeScreen razao_social={unidade.fields.razao_social}/>
              </TouchableOpacity>
            )}
        </ScrollView>
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

  avatar: {
    flex: 1,
    width: 20,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center'
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

  text: {
    color: '#1E90FF',
    marginLeft: 10
  },

});