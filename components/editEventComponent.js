/**
 * Created by alexanderbol on 23/06/2016.
 */
import React from 'react';

import * as ActionTypes from '../store/actionTypes';

import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    TextInput,
    Picker,
    Switch
} from 'react-native';

// use http://fortawesome.github.io/Font-Awesome/icons/
var Icon = require('react-native-vector-icons/FontAwesome');

export const EditEventComponent = React.createClass ({
    getInitialState() {
        return {
        };
    },
    componentWillMount() {
        this.dispatch = this.props.store.dispatch;
        this.setState(this.props.store.getState());
    },
    componentDidMount() {

    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.store.getState());
    },
    nameChanged(value) {
        var event = this.state.app.currentEvent;
        event.set("name", value);
        this.dispatch({
            type: ActionTypes.EVENT_CHANGED,
            event: event
        });
    },
    nameChangeDone() {
        this.state.app.currentEvent.save()
            .then((event) => {
                console.log('event updated');
            })
    },
    render() {
        return (
            <View style={styles.container}>
                <Text>Event name</Text>
                <TextInput
                    style={styles.editItem}
                    value={this.state.app.currentEvent.get("name")}
                    onChangeText={(value) => this.nameChanged({value})}
                    onBlur = {() => this.nameChangeDone()}
                />
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 5,
    },
    editItem: {
        flex:1
    }
});

