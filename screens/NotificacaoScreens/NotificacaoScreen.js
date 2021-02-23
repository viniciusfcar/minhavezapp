import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header, Right } from 'native-base';
import { CheckBox } from 'react-native-elements';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ListaNotificacaoScreen from './ListaNotificacaoScreen';

export default class NotificacaoScreen extends React.Component {
    
    check() {
        if(this.props.status == true) {
            return(
                <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={false}
                />
            )
        } else {
            return(
                <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={true}
                />
            )
        }
    }

    delete_notificacao = async () => {
        const form = new FormData();
        form.append("token", await AsyncStorage.getItem('@MinhaVezSistema:token'));
        form.append("idNotificacao", this.props.id);

        const apiCall = await fetch('http://165.22.185.36/api/notificacao/delete_notificacao/', {
            method: 'POST',
            body: form,
        });

        if(apiCall.status == 200){
            Alert.alert('Sucesso', 'Notificação excluida, arraste para baixo para atualizar a página!')
        }
    }

    render() {
        let check = this.check()
        return (
            <Content padder style={styles.corpo}>
                <CardItem style={styles.contaner}>
                    {check}
                    <Text style={styles.text}>{this.props.titulo}</Text>
                    <TouchableOpacity key={this.props.id} onPress={() => this.delete_notificacao()}>
                        <AntDesing style={{color: '#1E90FF'}} size={20} name='delete' />
                    </TouchableOpacity>
                </CardItem>
                <CardItem style={styles.contaner}>
                    <Text style={styles.text_body}>{this.props.assunto}</Text>
                </CardItem>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    contaner: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        flexDirection: 'row',
        justifyContent: "space-around",
    },

    bold: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#1E90FF',        
    },

    corpo: {
        flex: 1,
        flexDirection: 'column',
    },

    text: {
        color: '#1E90FF',
        margin: 2,
        fontSize: 20
    },

    text_body: {
        color: 'black',
        margin: 2
    }

});