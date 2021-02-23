import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text, View, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ResponsavelScreen from './ResponsavelScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';

export default class ListaResponsavelUnidadeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      itens: [],
      spinner: false,
      active_busca: false,
      busca: '',
      isLoading: false, 
    };
  }

  closeBusca = () => {
    this.setState({
      active_busca: false,
      busca: '',
    });
  };

  check() {
    this.setState({
      active_busca: true,
    });
  };

  openBusca() {
    if(this.state.active_busca) {
      return(
        <View style={styles.headerBusca}>
          <View>
            <TouchableOpacity onPress={() => this.closeBusca()}>
              <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
          </View>
          <View append>
            <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Ex: nome, data, status."
              autoCapitalize='none'
              keyboardType='text'
              value={this.state.busca}
              onChangeText={busca => this.setState({busca})}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.filterItems()}>
              <Text style={{color: '#1E90FF', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  filterItems() {
    
    if(this.state.busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    } else {
      var retornoBusca = this.state.itens.filter(resp => resp.nome.toLowerCase().includes(this.state.busca.toLowerCase()) || resp.sobrenome.toLowerCase().includes(this.state.busca.toLowerCase()));
      
      if(retornoBusca[0] != null) {
        this.setState({itens: retornoBusca});
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  renderRow = ({item}) => {
    if(this.props.navigation.getParam('responsaveis')){
      return(
        <View>
          <ResponsavelScreen imagem={item.imagem} nome={item.nome} sobrenome={item.sobrenome}/>
        </View>
      );
    }
  }

  responsaveis = async () => {
    
    this.setState({spinner: true, active_busca: false});
    
    const lista = this.props.navigation.getParam('responsaveis');
    const newLista = [];
    
    for(var i = 0; i < lista.length; i++) {
      const apiCall = await fetch('http://165.22.185.36/api/responsavel/'+lista[i]+'/');
      const response = await apiCall.json();

      newLista.push(response);
    };

    if(newLista[0] == null) {
      Alert.alert('Atenção', 'A unidade não possue responsáveis!');
    }

    this.setState({
      itens: newLista,
      spinner: false,
    });
  }

  unsubscribe = NetInfo.addEventListener(state => {
    if(state.isConnected) {
      this.responsaveis();
    }
    else {
      Alert.alert('Alerta', 'Você está sem internet!');
    }
  });
  
  async componentDidMount() {
    this.unsubscribe();
  }
  
  render() {
    let busca = this.openBusca();
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>RESPONSÁVEIS</Text>
          <Right>
            <TouchableOpacity onPress={() => this.setState({active_busca: true})}>
              <Entypo name='magnifying-glass' size={25} style={styles.logo} />
            </TouchableOpacity>
          </Right>
        </View>
        <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
        {busca}
        <FlatList 
          data={this.state.itens}
          renderItem={this.renderRow}
          refreshing={this.state.isLoading}
          onRefresh={this.responsaveis}
          keyExtractor={(i, k) => k.toString()}
        />
      </View>
    );

  };

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around"
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 120,
  },

  headerBusca: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
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

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    color: 'white',
  },
})

