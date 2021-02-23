import React from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right } from 'native-base';
import AntDesing from 'react-native-vector-icons/AntDesign/';

export default class LogoutScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sair',
        drawerIcon: ({ tintColor }) => (
            <AntDesing style={{color: '#1E90FF'}} size={25} name='logout' />
        ),
    }

    constructor(props) {
        super(props);
        this.init();
    }

    state = {
        spinner: false,
    }
    
    init = async () => {
        await AsyncStorage.removeItem("@MinhaVezSistema:usuario");
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator 
                    size="large"
                    color="#1E90FF"
                />
                <Text style={styles.text}>Até mais...</Text>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    icon: {
        width: 35,
        height: 35,
    },

    text: {
        fontSize: 20,
        color: '#1E90FF',
        marginTop: 5,
        fontWeight: 'bold',
    }

})

