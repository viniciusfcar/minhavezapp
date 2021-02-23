import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AutorizacaoScreen from './AutorizacaoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo/';
import NetInfo from '@react-native-community/netinfo';

export default class ListaAutorizacaoScreen extends React.Component {

  state = {
    itens: [],
    busca: '',
    active_busca: false,
    spinner: false,
    isLoading: false,
  }

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
              placeholder="Ex: nome, data, status ou responsavel"
              autoCapitalize='none'
              keyboardType='text'
              value={this.state.busca}
              onChangeText={busca => this.setState({busca})}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.onBusca()}>
              <Text style={{color: '#1E90FF', fontSize: 20, fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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
  }

  onBusca = async () => {
    
    const apiCall = await fetch('http://165.22.185.36/api/autorizacao/?search='+this.state.busca);

    if(this.state.busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    } else {
      const response = await apiCall.json();
      if(response[0]) {
        this.setState({
          itens: response,
        });
      
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  renderRow = ({item}) => {
    return(
      <View>
        <TouchableOpacity key={item.id}
          onPress={() => this.props.navigation.navigate('DetalhesAutorizacao', {autorizacao: item})}>
          <AutorizacaoScreen nome={item.nome} data={item.data} hora={item.hora} status={item.status}/>
        </TouchableOpacity>
      </View>
    )
  }

  autorizacoes = async () => {
    try {
      this.setState({spinner: true, active_busca: false});

      const apiCall = await fetch('http://165.22.185.36/api/autorizacao/')
      const response = await apiCall.json();

      if(response[0] != null){
        this.setState({
          itens: response,
          active: true,
        });
      } else {
        Alert.alert('Atenção', 'Não encontra-se nenhuma autorização cadastrada!');
      }


      this.setState({spinner: false});

      await AsyncStorage.setItem('@MinhaVezSistema:autorizacoes', JSON.stringify(itens));
    
    } catch(error) {

    }
  }
  
  unsubscribe = NetInfo.addEventListener(state => {
    
    if(state.isConnected) {
      this.autorizacoes();
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
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>AUTORIZAÇÕES</Text>
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
          onRefresh={this.autorizacoes}
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

  icon: {
      width: 35,
      height: 35,
  },

  header: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 120,
  },

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    color: 'white',
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

  spinnerTextStyle: {
    color: '#1E90FF',
  },

})

