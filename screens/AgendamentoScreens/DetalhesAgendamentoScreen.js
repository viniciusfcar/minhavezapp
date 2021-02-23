import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Container, Header, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab, Left, Thumbnail, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export default class DetalhesAgendamentoScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            idAgendamento: 0,
            consulta: null,
            autorizacao: null,
            exame: null,
            especialista: '',
            responsavel: '',
            active: false,
            id_ficha: '',
            participa: false,
            objeto: '',
            stringObj: '',
            id_usuario: '',
            spinner: false,
        }
    }

    getUser = async () => {
      this.setState({
        id_usuario: await AsyncStorage.getItem('@MinhaVezSistema:id_usuario'),
      });
    };

    onFilas = async () => {
        this.setState({spinner: true});
        var lista = this.state.objeto.fields.filas;

        var newLista = [];
        var fichas = [];
    
        for(var i = 0; i < lista.length; i++) {
          const apiCall = await fetch('http://165.22.185.36/api/fila/'+lista[i]+'/');
          const response = await apiCall.json();
          newLista.push(response);
        }
    
        this.setState({
          filas: newLista,
        });
    
        for(var i = 0; i < newLista.length; i++){
          for(var j = 0; j < newLista[i].fichas.length; j++){
            fichas.push(newLista[i].fichas[j]);
          }
        }
        
        for(var i = 0; i < fichas.length; i++){
          const apiCall = await fetch('http://165.22.185.36/api/ficha/'+fichas[i]+'/');
          const response = await apiCall.json();
          if(response.usuario == this.state.id_usuario){
            this.setState({
              participa: true,
              id_ficha: response.id,
            });
          }
        }
        this.setState({spinner: false});
    };

    desmarcar = async () => {
        const form = new FormData();
        form.append("id_ficha", this.state.id_ficha);
        form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
    
        const apiCall = await fetch('http://165.22.185.36/api/ficha/desistir_ficha/', {
          method: 'POST',
          body: form,
        });
    
        if(apiCall.status == 200) {
          this.setState({
            participa: false,
          });
          Alert.alert('Sucesso!', 'Consultas desmarcada.')
        
        } else if(apiCall.status == 401) {
          Alert.alert('Cuidado!', 'Sem permissão para tal ação, verifique e refaça se necessário.')
        
        } else if(apiCall.status == 511) {
          this.props.navigation.navigate('Logout');
          Alert.alert('Erro!', 'Você não estálogado, refaça o login.');
        
        } else if(apiCall.status == 400) {
          alert('Atenção!','Requisição errada, contate o suporte.');
        }
    }
    
    marcar = async (pref) => {
        const form = new FormData();
        form.append("id_"+this.state.stringObj, this.state.objeto.pk);
        form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
        form.append("preferencial", pref);
    
        const apiCall = await fetch('http://165.22.185.36/api/ficha/cadastro_ficha_' + this.state.stringObj + '/', {
          method: 'POST',
          body: form,
        });
    
        const response = await apiCall.json();
        
        if(response[0]){
          this.setState({
            active: false,
            participa: true,
            id_ficha: response[0].pk,
          });
    
          Alert.alert('Sucesso!', 'Consulta marcada.');
        
        } else if(apiCall.status == 511){
          this.props.navigation.navigate('Logout');
          Alert.alert('Erro!', 'Você não estálogado, refaça o login.');
        
        } else if(apiCall.status == 400){
          Alert.alert('Atenção!', 'Requisição errada, contate o suporte!');
        
        } else if(apiCall.status == 403){
          Alert.alert('Atenção!', 'Você já participa dessa consulta, que tipo de ação está tentando ?');
        }
    }

    onCheck(){
        this.setState({
          active: true,
        });
    }

    open(){
        if(this.state.active){
            return(
            <View>
                <TouchableOpacity onPress={() => this.setState({active: false})}>
                <Text style={styles.close}>x</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.marcar(0)} style={[styles.button, styles.buttonAdd]}>
                        <Text>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.marcar(1)} style={[styles.button, styles.buttonAdd]}>
                        <Text>Preferêncial</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
        }
    }

    verificaButton(objeto){
        if(objeto.fields.create_fila){ 
          if(this.state.participa){
            return(
              <TouchableOpacity onPress={() => this.desmarcar()}>
                <View style={styles.header}>
                  <Text style={styles.headerDanger}>Desmarcar</Text>
                  <Left style={{marginLeft: 50}}>
                    <Icon style={{color: 'red'}} name='close'/>
                  </Left>
                </View>
              </TouchableOpacity>
            );
          } else {
            return(
              <TouchableOpacity onPress={() => this.onCheck()}>
                <View style={styles.header}>
                  <Text style={styles.headerSuccess}>Marcar</Text>
                  <Left style={{marginLeft: 50}}>
                    <Icon style={{color: 'green'}} name='save'/>
                  </Left>
                </View>
              </TouchableOpacity>
            );
          }
        }
    }

    verificar(){
        if(this.state.autorizacao != null) {
            let but = this.verificaButton(this.state.autorizacao)
            let open = this.open()
            return(
                <ScrollView ontentInsetAdjustmentBehavior="automatic">
                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados do Agendamento</Text>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text style={{marginRight: 30}}>{this.props.navigation.getParam('agendamento').fields.nome}</Text>
                            </Left>
                        </CardItem>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados da Autorização</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text>{this.state.autorizacao.fields.nome}</Text>
                            </Left>
                            <Right>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                                <Text>{this.state.autorizacao.fields.data}</Text>
                            </Right>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                                <Text>{this.state.autorizacao.fields.status}</Text>
                            </Left>
                        </CardItem>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Responsável</Text>
                        </CardItem>
                        <CardItem header bordered>
                            <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                            <Text style={{color: 'black', marginLeft: 5}}>{this.state.responsavel.nome} {this.state.responsavel.sobrenome}</Text>
                        </CardItem>
                    </Card>
                    <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
                        {but}
                        {open}
                    </View>
                </ScrollView>
            )
        }
        else if(this.state.consulta != null){
            let but = this.verificaButton(this.state.consulta)
            let open = this.open()
            return(
                <ScrollView ontentInsetAdjustmentBehavior="automatic">
                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados do Agendamento</Text>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text style={{marginRight: 30}}>{this.props.navigation.getParam('agendamento').fields.nome}</Text>
                            </Left>
                        </CardItem>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados da Consulta</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text>{this.state.consulta.fields.nome}</Text>
                            </Left>
                            <Right>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                                <Text>{this.state.consulta.fields.data}</Text>
                            </Right>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Status:</Text>
                                <Text>{this.state.consulta.fields.status}</Text>
                            </Left>
                        </CardItem>
                        <CardItem header>
                            <Text style={styles.negrito}>Especialista</Text>
                        </CardItem>
                        <CardItem>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalhesEspecialista', {especialista: this.state.especialista})}>
                                <Thumbnail style={styles.avatar} source={require('../../static/images/user.png')}/>
                            </TouchableOpacity>  
                            <Left>
                                <Body>
                                    <Text>{this.state.especialista.nome}</Text>
                                    <Text note>{this.state.especialista.sobrenome}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
                        {but}
                        {open}
                    </View>
                </ScrollView>
            )
        } else if(this.state.exame != null) {
            let but = this.verificaButton(this.state.exame)
            let open = this.open()
            return(
                <ScrollView ontentInsetAdjustmentBehavior="automatic">
                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados do Agendamento</Text>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text style={{marginRight: 30}}>{this.props.navigation.getParam('agendamento').fields.nome}</Text>
                            </Left>
                        </CardItem>
                        <CardItem header bordered>
                            <Text style={styles.negrito}>Dados do Exame</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Nome:</Text>
                                <Text>{this.state.exame.fields.nome}</Text>
                            </Left>
                            <Right>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                                <Text>{this.state.exame.fields.data}</Text>
                            </Right>
                        </CardItem>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Tipo:</Text>
                                <Text>{this.state.exame.fields.tipo}</Text>
                            </Left>
                            <Right>
                                <Text style={{fontWeight: 'bold', color: '#4169E1'}}>Data:</Text>
                                <Text>{this.state.exame.fields.data}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <View style={{ borderBottomColor: '#e9e7e7', borderBottomWidth: 50 }}>
                        {but}
                        {open}
                    </View>
                </ScrollView>
            )
        }
    }

    consult_aut = async () =>{

        const apiCall = await fetch('http://165.22.185.36/api/agendamento/'+this.props.navigation.getParam('agendamento').pk+'/detalhes_agendamento/')
        const response = await apiCall.json();

        if(response[0].model == 'consulta.consulta'){
            this.setState({
                consulta: response[0],
                objeto: response[0],
                stringObj: 'consulta',
            });

            this.esp_resp();
        }
        else if(response[0].model == 'autorizacao.autorizacao') {
            this.setState({
                autorizacao: response[0],
                objeto: response[0],
                stringObj: 'autorizacao',
            });

            this.esp_resp();
        } else {
            this.setState({
                exame: response[0],
                objeto: response[0],
                stringObj: 'exame',
            })
        }

        this.onFilas();
        
        await AsyncStorage.setItem('@MinhaVezSistema:detalhesAgendamento_con_aut', JSON.stringify(this.state.consulta, this.state.autorizacao, this.state.exame));
    }

    esp_resp = async () =>{

        if(this.state.consulta != null) {
            const apiCall = await fetch('http://165.22.185.36/api/especialista/'
                +this.state.consulta.fields.especialista+'/')
            const response = await apiCall.json();

            this.setState({
                especialista: response
            })
        }
        else {
            const apiCall = await fetch('http://165.22.185.36/api/responsavel/'
                +this.state.autorizacao.fields.responsavel+'/')
            const response = await apiCall.json();
            
            this.setState({
                responsavel: response
            })
        }

        await AsyncStorage.setItem('@MinhaVezSistema:detalhesAgendamento_esp_rep', JSON.stringify(this.state.responsavel, this.state.especialista));
    }

    async componentDidMount() {
        this.consult_aut();
        this.getUser();
    }
  
    render() {
        let verificar = this.verificar()
        return (
            <View style={styles.container}>
              <Spinner
                visible={this.state.spinner}
                textStyle={styles.spinnerTextStyle}
              />
              <Header style={styles.headerTittle}>
                  <Text style={styles.headerText}>DETALHES DO AGENDAMENTO</Text>
              </Header>
              <View padder>
                  {verificar}
              </View>
            </View>
        );

    };

};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#e9e7e7',  
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
    fontSize: 19,
    color: '#1E90FF',
    fontWeight: 'bold',
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

  headerSuccess: {
    fontSize: 20,
    color: 'green',
    marginLeft: 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  headerDanger: {
    fontSize: 20,
    color: 'red',
    marginLeft: 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },

  negrito: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },

  button:{
    borderRadius: 10,       
    padding: 10,    
    marginTop: 5,           
  },

  buttonAdd:{
    backgroundColor: 'white',
    paddingHorizontal: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: 5,
  },

  buttonContainer:{
    flexDirection: 'row',        
  },

  close: {
    fontSize: 25,
    color: 'red',
  },
})

