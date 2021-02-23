import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Button, Icon, Fab, Left, Thumbnail, Header } from 'native-base';

export default class ResponsavelScreen extends React.Component {

    render() {
        return (
            <Content padder style={styles.corpo}>
                <CardItem style={styles.contaner}>
                    <Image
                        style={styles.imgPage}
                        source={{uri: this.props.imagem}}
                    />
                    <Left>
                        <Body style={styles.bold}>
                            <Text style={styles.text}>{this.props.nome} {this.props.sobrenome}</Text>
                        </Body>
                    </Left>
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

    avatar: {
        flex: 1,
        width: 70,
        height: 70,
        justifyContent: "center",
        margin: 10,
    },

    corpo: {
        flex: 1,
        flexDirection: 'column',
    },

    text: {
        color: '#1E90FF',
        margin: 2,
    },
    
    imgPage: {
        width: 50,
        height: 50,
        marginTop: 20,
        marginRight: 30,
        borderRadius: 100,
    },
});