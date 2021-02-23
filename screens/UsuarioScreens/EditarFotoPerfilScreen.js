import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Header, Content, Left, Right, Thumbnail, CardItem, Body, } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo/';
import AntDesing from 'react-native-vector-icons/AntDesign/';
import {showImagePicker, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Axios from 'axios';
import {useNetInfo} from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export default function EditeFotoPerfilScreen() {
    const netInfo = useNetInfo();
    const [avatar, setAvatar] = useState();
    const [imagem, setImagem] = useState();
    const [token, setToken] = useState();
    const [fileName, setFileName] = useState();

    useEffect(() => {
        (async () => {
            if(netInfo.isConnected){
                setImagem(
                    await AsyncStorage.getItem('@MinhaVezSistema:imagem'),
                );
        
                setToken(await AsyncStorage.getItem('@MinhaVezSistema:token'));
            }else {
                Alert.alert('Atenção', 'Você está sem internet!')
            }
        })();
        
    }, [ ]);

    const imagePickerOption = {
        title: 'Selecione uma imagem',
    }

    function imagePickerCallback(data) {

        if(data.didCancel) {
            return;
        }

        if(data.error){
            return;
        }

        if(!data.uri){
            return;
        }

        setFileName(data.fileName)
        
        setAvatar(data)
    }

    async function uploadImage() {
        const form = new FormData();

        form.append('avatar', avatar.uri);

        form.append('fileName', fileName);

        form.append('token', 
            await AsyncStorage.getItem('@MinhaVezSistema:token')
        );

        Axios.post('http://165.22.185.36/api/usuario/editar_foto_perfil/', form, {
            headers: {
                'content-type': 'file'
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .then(function (error) {
            console.log(error)
        })
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <Image 
                    style={styles.logo}
                    source={require('./../../static/images/logo.png')}
                />
            </View>
            <Image 
                style={styles.img}
                source={{uri: avatar
                    ? avatar.uri
                    : imagem}}
            />
            <TouchableOpacity style={styles.button} onPress={() => launchImageLibrary(imagePickerOption, imagePickerCallback)}>
                <Text style={styles.textButton}>Editar</Text>
                <AntDesing name='edit' size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.textButton}>Salvar</Text>
                <AntDesing name='totop' size={25} style={{color: 'white'}}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        margin: 20,
        marginTop: 10,
        alignItems: 'center',
    },

    img: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginRight: 30,
        borderRadius: 100,
    },

    button: {
        width: 150,
        height: 50,
        borderRadius: 3,
        marginTop: 20,
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    logo: {
        width: 300,
        height: 140,
    },
});
