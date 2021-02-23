import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FichaScreen from './FichaScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';

export default class ListaFichaScreen extends React.Component {

  state = {
    itens: [],
    active: false,
    spinner: false,
    active_busca: false,
    busca: '',
    isLoading: false,
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
    if (this.state.active_busca) {
      return (
        <View style={styles.headerBusca}>
          <View>
            <TouchableOpacity onPress={() => this.closeBusca()}>
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View append>
            <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Ex: nome."
              autoCapitalize='none'
              keyboardType='text'
              value={this.state.busca}
              onChangeText={busca => this.setState({ busca })}
              maxLength={40}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.filterItems()}>
              <Text style={{ color: '#1E90FF', fontSize: 20, fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  filterItems() {

    if (this.state.busca.trim().length == 0) {
      Alert.alert('Erro', 'Preencha o campo da busca!');
    } else {
      var retornoBusca = this.state.itens.filter(ficha => ficha.numero.includes(this.state.busca) || ficha.status.toLowerCase().includes(this.state.busca.toLowerCase()) || ficha.preferencial.toLowerCase().includes(this.state.busca.toLowerCase()));

      if (retornoBusca[0] != null) {
        this.setState({ itens: retornoBusca });
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  renderRow = ({item}) => {
    if(this.state.active) {
      return (
        <View>
          <TouchableOpacity key={item.pk}
            onPress={() => this.props.navigation.navigate('DetalhesFicha', { ficha: item })}>
            <FichaScreen key={item.pk} numero={item.fields.numero} status={item.fields.status} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  fichas = async () => {
    try {
      this.setState({ spinner: true, active_busca: false });

      id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario')
      const apiCall = await fetch('http://165.22.185.36/api/usuario/' + id + '/minhasFichas')
      const response = await apiCall.json();

      if (response[0] != null) {
        this.setState({
          itens: response,
          active: true,
        });
      } else {
        Alert.alert('Atenção', 'Você não possue nenhuma ficha!');
      }

      this.setState({ spinner: false });

      await AsyncStorage.setItem('@MinhaVezSistema:minhas_fichas', JSON.stringify(response));

    } catch (error) {

    }
  }

  unsubscribe = NetInfo.addEventListener(state => {
    if(state.isConnected) {
      this.fichas();
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
        <Header style={styles.header}>
          <Text style={styles.headerText}>MINHAS FICHAS</Text>
          <Right>
            <TouchableOpacity onPress={() => this.setState({active_busca: true})}>
              <Entypo name='magnifying-glass' size={25} style={styles.logo} />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
        {busca}
        <FlatList 
          data={this.state.itens}
          renderItem={this.renderRow}
          refreshing={this.state.isLoading}
          onRefresh={this.fichas}
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
    justifyContent: "space-around",
    borderColor: 'white',
    borderBottomColor: 'white'
  },

  headerText: {
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 110,
  },

  headerAlert: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
    margin: 5,
    marginTop: 10,
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

  headerTextAlert: {
    fontSize: 25,
    color: '#1E90FF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
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

