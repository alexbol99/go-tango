/**
 * Created by alexanderbol on 19/02/2016.
 */
import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = {
    container: {
        backgroundColor: '#F5FCFF',
    },
    content: {
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor:'#81c04d',
        color: '#ffffff',
        title: {
            flex: 5,
            fontSize: 20,
            color: '#ffffff',
            textAlign:'center',
            alignSelf:'center'
        },
        icon: {
            flex: 1,
            /*width: 20,
            height: 20,*/
            marginLeft: 10,
            marginRight: 10,
            alignSelf: 'center'
        }
    },
    footer: {
        backgroundColor:'#81c04d',
        color:'#ffffff'
    },
    item: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'honeydew',
        marginVertical: 5,
    },
    itemSelected: {
        flex:1,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'lightcyan',
        marginVertical:5,
    },
    iconAdd: {
        /*
        width: 50,
        height: 50,*/
        elevation: 1,
        shadowColor:'darkgray',
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
            height:0,
            width:0
        }
    },
    menuItem: {
        fontSize: 20,
        color: '#ffffff',
        textAlign:'center',
        alignSelf:'center',
        padding: 10,
    },
    };