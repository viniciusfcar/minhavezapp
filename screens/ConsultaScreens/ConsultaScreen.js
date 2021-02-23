import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header, Right } from 'native-base';

export default class ConsultaScreen extends React.Component {
    
    render() {
        return (
            <Content padder style={styles.corpo}>
                <CardItem style={styles.contaner}>
                    <Left>
                        <Text style={styles.bold}>Nome: </Text>
                        <Text style={styles.text}>{this.props.nome}</Text>
                    </Left>
                    <Right>
                        <Text style={styles.bold}>Status: </Text>
                        <Text style={styles.text}>{this.props.status}</Text>
                    </Right>
                </CardItem>
                <CardItem style={styles.contaner}>
                    <Left>
                        <Text style={styles.bold}>Hora: </Text>
                        <Text style={styles.text}>{this.props.hora}</Text>
                    </Left>
                    <Right>
                        <Text style={styles.bold}>Data: </Text>
                        <Text style={styles.text}>{this.props.data}</Text>
                    </Right>
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
    }

});