import React, {useEffect, Component}  from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Text, View, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NotificacaoScreen from './NotificacaoScreen';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';

export default class ListaNotificacaoScreen extends React.Component {

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

  letNotificacao = async (id) => {
    this.setState({spinner: true});
    const form = new FormData();
    form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    form.append("idNotificacao", id);

    const apiCall = await fetch('http://165.22.185.36/api/notificacao/ler_notificacao/', {
      method: 'POST',
      body: form,
    });

    if(apiCall.status = 200) {
      this.notificacoes();
      this.setState({spinner: false});
    
    } else if(apiCall.status = 404) {
      this.setState({spinner: false});
      Alert.alert('Atenção', 'Notificação não encontrada ou você está deslogado. Corrija e tente novamente!');
    
    } else if(apiCall.status = 400) {
      this.setState({spinner: false});
      Alert.alert('Erro', 'Solicitação inválida, saia do aplicativo e entre novamente!');
    }
  }

  notificacoes = async () => {
    
    this.setState({spinner: true});

    id = await AsyncStorage.getItem('@MinhaVezSistema:id_usuario');

    const apiCall = await fetch('http://165.22.185.36/api/usuario/'+id+'/lista_notificacoes');
    const response = await apiCall.json();

    if(response[0] == null) {
      Alert.alert('Atenção', 'Nenhuma notificação, aguarde as novidades chegarem!');
    }

    this.setState({
      itens: response,
      spinner: false,
    });
  }

  unsubscribe = NetInfo.addEventListener(state => {
    if(state.isConnected) {
      this.props.navigation.addListener(
        'didFocus',
        payload => {
          this.notificacoes();
        }
      );
    }
    else {
      Alert.alert('Alerta', 'Você está sem internet!');
    }
  });
  
  async componentDidMount() {
    this.unsubscribe();
  }

  renderRow = ({item}) => {
    if(item.fields.status == false){
      return(
        <View>
          <TouchableOpacity key={item.pk} onPress={() => this.letNotificacao(id=(item.pk))}>
            <NotificacaoScreen id={item.pk} status={item.fields.status} titulo={item.fields.titulo} assunto={item.fields.assunto}/>
          </TouchableOpacity>
        </View>
      );
    
    } else {
      return(
        <View>
          <NotificacaoScreen id={item.pk} status={item.fields.status} titulo={item.fields.titulo} assunto={item.fields.assunto}/>
        </View>
      );
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTIFICAÇÕES</Text>
        </View>
        <View style={{ borderBottomColor: 'white', borderBottomWidth: 4 }} />
        <FlatList 
          data={this.state.itens}
          renderItem={this.renderRow}
          refreshing={this.state.isLoading}
          onRefresh={this.notificacoes}
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

