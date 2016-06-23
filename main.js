/**
 * Created by alexanderbol on 23/06/2016.
 */
/**
 * Created by alexanderbol on 08/01/2016.
 */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
var Redux = require('redux');

var Reducer = require('./store/reducer');
var App = require('./app');

const store = Redux.createStore(Reducer.reducer);

var MainComponent = React.createClass ({
    componentWillMount() {
        this.state = store.getState();
        store.subscribe(() => {
            this.setState(store.getState());
        });
    },

    render() {
        return (
            <App store={store} />
        );
    }
});

module.exports = MainComponent;
