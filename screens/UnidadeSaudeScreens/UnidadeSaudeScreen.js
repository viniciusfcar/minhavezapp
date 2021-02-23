import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header } from 'native-base';

export default class UnidadeSaudeScreen extends React.Component {

    render() {
        return (
            <Content padder style={styles.corpo}>
                <CardItem style={styles.contaner}>
                    <Text style={styles.bold}>{this.props.razao_social}</Text>
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
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
    },

    bold: {
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#1E90FF',
        fontSize: 20        
    },

    corpo: {
        flex: 1,
        flexDirection: 'column',
    },

});