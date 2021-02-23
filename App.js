import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack'
import { DrawerItems, createSwitchNavigator } from 'react-navigation';
import HomeUserScreen from './screens/UsuarioScreens/HomeUserScreen';
import ListaEspecialistaScreen from './screens/EspecialistaScreens/ListaEspecialistaScreen';
import DetalhesEspecialistaScreen from './screens/EspecialistaScreens/DetalhesEspecialistaScreen';
import DetalhesConsultaScreen from './screens/ConsultaScreens/DetalhesConsultaScreen';
import ListaConsultaScreen from './screens/ConsultaScreens/ListaConsultaScreen';
import ListaFichasScreen from './screens/FichaScreens/ListaFichasScreen';
import DetalhesFichaScreen from './screens/FichaScreens/DetalhesFichaScreen';
import ListaAutorizacaoScreen from './screens/AutorizacaoScreens/ListaAutorizacaoScreen';
import DetalhesAutorizacaoScreen from './screens/AutorizacaoScreens/DetalhesAutorizacaoScreen';
import ListaUnidadeScreen from './screens/UnidadeSaudeScreens/ListaUnidadeScreen';
import DetalhesUnidadeScreen from './screens/UnidadeSaudeScreens/DetalhesUnidadeScreen';
import ListaAgendamentoScreen from './screens/AgendamentoScreens/ListaAgendamentoScreen';
import ListaConsultaUnidadeScreen from './screens/ConsultaScreens/ListaConsultaUnidadeScreen';
import ListaAutorizacaoUnidadeScreen from './screens/AutorizacaoScreens/ListaAutorizacaoUnidadeScreen';
import ListaEspecialistaUnidadeScreen from './screens/EspecialistaScreens/ListaEspecialistaUnidadeScreen';
import ListaResponsavelUnidadeScreen from './screens/ResponsavelScreens/ListaResponsavelUnidadeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingLoginScreen from './screens/LoadingLoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import ListaConfiguracoesScreen from './screens/ConfiguraçõesScreens/ListaConfiguracoesScreen';
import PerfilUserScreen from './screens/UsuarioScreens/PerfilUserScreen';
import EditarPerfilScreen from './screens/UsuarioScreens/EditarPerfilScreen';
import ListaExameScreen from './screens/ExameScreens/ListaExameScreen';
import ListaExameUnidadeScreen from './screens/ExameScreens/ListaExameUnidadeScreen';
import DetalhesExameScreen from './screens/ExameScreens/DetalhesExameScreen';
import DetalhesAgendamentoScreen from './screens/AgendamentoScreens/DetalhesAgendamentoScreen';
import CadastroUserScreen from './screens/CadastroUserScreen';
import RecuperarSenhaScreen from './screens/RecuperarSenhaScreen';
import VerDadosScreen from './screens/UsuarioScreens/VerDadosScreen';
import EditarFotoPerfilScreen from './screens/UsuarioScreens/EditarFotoPerfilScreen';
import EditarEmailScreen from './screens/ConfiguraçõesScreens/EditarEmailScreen';
import EditarUsernameScreen from './screens/ConfiguraçõesScreens/EditarUsernameScreen';
import ListaNotificacaoScreen from './screens/NotificacaoScreens/ListaNotificacaoScreen';

const App: () => React$Node = () => {
  return (
    <SwitchNavigator />
  );
};

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{height: 200, backgroundColor: '#1E90FF'}}>
      <Body style={{alignItems: 'center'}}>
        <Image 
          style={styles.img}
          source={require('./static/images/isotipo_branco.png')}
        />
      </Body>
    </Header>
    <Content>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <DrawerItems {...props}/>
        </ScrollView>
      </SafeAreaView>
    </Content>
  </Container>
);

const DrawerNavigatorUser = createDrawerNavigator(
  { 
    Home: HomeUserScreen,
    Perfil: PerfilUserScreen,
    Configuracoes: ListaConfiguracoesScreen,
    Logout: LogoutScreen,
  }, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent,
    navigationOptions: {
      headerTransparent: true,
    }
  },
);

const StackCadastroUser = createStackNavigator(
  {
    CadastroUser: CadastroUserScreen,
  },{
    initialRouteName: 'CadastroUser',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackRecuperarSenha = createStackNavigator(
  {
    RecuperarSenha: RecuperarSenhaScreen,
  },{
    initialRouteName: 'RecuperarSenha',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const StackUser = createStackNavigator(
  {
    DrawerNavigator: DrawerNavigatorUser,
    DetalhesEspecialista: DetalhesEspecialistaScreen,
    DetalhesConsulta: DetalhesConsultaScreen,
    DetalhesFicha: DetalhesFichaScreen,
    DetalhesAutorizacao: DetalhesAutorizacaoScreen,
    DetalhesUnidade: DetalhesUnidadeScreen,
    ListaConsultaUnidade: ListaConsultaUnidadeScreen,
    ListaAutorizacaoUnidade: ListaAutorizacaoUnidadeScreen,
    ListaEspecialistaUnidade: ListaEspecialistaUnidadeScreen,
    ListaResponsavelUnidade: ListaResponsavelUnidadeScreen,
    ListaFicha: ListaFichasScreen,
    ListaAgendamento: ListaAgendamentoScreen,
    ListaConsulta: ListaConsultaScreen,
    ListaAutorizacao: ListaAutorizacaoScreen,
    ListaEspecialista: ListaEspecialistaScreen,
    ListaUnidade: ListaUnidadeScreen,
    EditarPerfil: EditarPerfilScreen,
    ListaExame: ListaExameScreen,
    ListaExameUnidade: ListaExameUnidadeScreen,
    DetalhesExame: DetalhesExameScreen,
    DetalhesAgendamento: DetalhesAgendamentoScreen,
    VerDados: VerDadosScreen,
    EditarFotoPerfil: EditarFotoPerfilScreen,
    EditarEmail: EditarEmailScreen,
    EditarUsername: EditarUsernameScreen,
    ListaNotificacao: ListaNotificacaoScreen,    
  }, {
    initialRouteName: 'DrawerNavigator',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    StackUser: StackUser,
    LoadingLogin: LoadingLoginScreen,
    Login: LoginScreen,
    StackCadastroUser: StackCadastroUser,
    StackRecuperarSenha: StackRecuperarSenha,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  },
);

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 150,
  }
})

export default App;
