import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AgendamentoScreen from './AgendamentoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';

export default class ListaAgendamentoScreen extends React.Component {

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
              placeholder="Ex: nome."
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
      var retornoBusca = this.state.itens.filter(agendamento => agendamento.nome.toLowerCase().includes(this.state.busca.toLowerCase()));
      
      if(retornoBusca[0] != null) {
        this.setState({itens: retornoBusca});
      } else {
        Alert.alert('Atenção', 'Nada encontrado para esses dados, mude e refaça a pesquisa!');
      }
    }
  }

  renderRow = ({item}) => {
    if(this.state.active) {
      return(
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalhesAgendamento', {agendamento: item})}>
            <AgendamentoScreen key={item.id} nome={item.fields.nome}/>
          </TouchableOpacity>
        </View>
      );
    }
  };

  agendamentos = async () => {
    this.setState({spinner: true, active_busca: false});
    
    id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario')
    
    const apiCall = await fetch('http://165.22.185.36/api/agendamento/'+id+'/agendamento_usuario/')
    const response = await apiCall.json();
    
    if(response[0] != null){
      this.setState({
        itens: response,
        active: true,
      });
    } else {
      Alert.alert('Atenção', 'Você não possue nenhum agendamento!');
    }

    this.setState({spinner: false});
    await AsyncStorage.setItem('@MinhaVezSistema:agendamentos', JSON.stringify(this.state.itens));
  }
  
  unsubscribe = NetInfo.addEventListener(state => {
    
    if(state.isConnected) {
      this.agendamentos();
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
          <Text style={styles.headerText}>MEUS AGENDAMENTOS</Text>
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
          onRefresh={this.agendamentos}
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
    flexDirection: 'row',
    height: 55,
    justifyContent: "space-around",
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

  headerText: {
    fontSize: 21,
    paddingLeft: 85,
    color: 'white',
    fontWeight: 'bold',
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

