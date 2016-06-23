/**
 * Created by alexanderbol on 23/06/2016.
 */
/**
 * Created by alexanderbol on 19/02/2016.
 */
import React from 'react';
var globalStyles = require('../styles/styles').styles;

import * as ActionTypes from '../store/actionTypes';

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

// use http://fortawesome.github.io/Font-Awesome/icons/
var Icon = require('react-native-vector-icons/FontAwesome');

var BackButton = ({onButtonPressed}) => {
    return (
        <TouchableOpacity onPress={onButtonPressed} activeOpacity={1.0}>
            <Icon
                name='long-arrow-left'
                size={20}
                color={globalStyles.header.color}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};
var Title = ({title}) => {
    return <Text style={styles.title}> {title} </Text>
};

export const HeaderComponent = React.createClass ({
    render() {
        return (
            <View style={styles.headerContainer}>
                <BackButton onButtonPressed={this.props.onBackButtonPressed} />
                <Title title={this.props.title} />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    headerContainer: {
        backgroundColor:globalStyles.header.backgroundColor,
        paddingTop:30,
        paddingBottom:10,
        marginTop: 0,
        flexDirection: 'row'
    },
    title: globalStyles.header.title,
    icon: globalStyles.header.icon
});
