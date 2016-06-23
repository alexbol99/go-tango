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

import {HeaderComponent} from '../components/headerComponent';

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
    backToEventListView() {
        this.updateEvent();
        this.dispatch({
            type: ActionTypes.BACK_TO_EVENT_LIST_VIEW
        })
    },
    nameChanged(value) {
        var event = this.state.app.currentEvent;
        event.set("name", value);
        this.dispatch({
            type: ActionTypes.EVENT_CHANGED,
            event: event
        });
    },
    organizerSelected(value) {
        var organizer = this.state.organizers.find((organizer_tmp) => {
            return (organizer_tmp.get('name') == value);
        }, this);
        this.state.app.currentEvent.set("organizer", organizer);
        this.dispatch({
            type: ActionTypes.EVENT_CHANGED,
            event: this.state.app.currentEvent
        });
        this.updateEvent();
    },
    locationSelected(value) {
        var location = this.state.locations.find((location_tmp) => {
            return (location_tmp.get('name') == value);
        }, this);
        this.state.app.currentEvent.set("location", location);
        this.dispatch({
            type: ActionTypes.EVENT_CHANGED,
            event: this.state.app.currentEvent
        });
        this.updateEvent();
    },
    updateEvent() {
        this.state.app.currentEvent.save()
            .then((event) => {
                console.log('event updated');
            })
    },
    render() {
        var event = this.state.app.currentEvent;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    title="Edit Details"
                    onBackButtonPressed={this.backToEventListView}
                />

                <Text style={styles.label}>Event name:</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.app.currentEvent.get("name")}
                    onChangeText={(value) => this.nameChanged(value)}
                    onBlur = {() => this.updateEvent()}
                />

                <Text style={styles.label}>Organizer:</Text>
                <Picker style={{flex:1}}
                        selectedValue={event.get('organizer') ? event.get('organizer').get('name') : ''}
                        onValueChange={(name) => this.organizerSelected(name)} >
                    {
                        this.state.organizers.map( (organizer) =>
                            <Picker.Item key= {organizer.id}
                                         label={organizer.get('name')}
                                         value={organizer.get('name')} />
                        )
                    }
                </Picker>

                <Text style={styles.label}>Location:</Text>
                <Picker style={{flex:1}}
                        selectedValue={event.get('location') ? event.get('location').get('name') : ''}
                        onValueChange={(name) => this.locationSelected(name)} >
                    {
                        this.state.locations.map( (location) =>
                            <Picker.Item key= {location.id}
                                         label={location.get('name')}
                                         value={location.get('name')} />
                        )
                    }
                </Picker>

            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 5,
    },
    label: {
        fontSize: 20,
        marginLeft: 10
    },
    editItem: {
        flex:1
    },
    input: {
        height: 36,
        padding: 4,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        /*flex: 4,*/
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'chartreuse', /*'#48BBEC',*/
        borderRadius: 8,
        /*color: '#48BBEC'*/
    },

});

