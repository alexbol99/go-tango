/**
 * Created by alexanderbol on 23/06/2016.
 */
/**
 * Created by alexanderbol on 09/01/2016.
 */
import React from 'react';

import * as ActionTypes from './store/actionTypes';
//var LoginView = require('./views/loginView').LoginView;
//var HomeView = require('./views/homeView').HomeView;
//var DictionaryView = require('./views/dictionaryView').DictionaryView;
//var ConfigView = require('./views/configView').ConfigView;
//var AddNewDictionaryView = require('./views/addNewDictionaryView').AddNewDictionaryView;
//var GoWebView = require('./views/goWebView').GoWebView;

import {
    Text,
    StyleSheet,
    View
} from 'react-native';

var Parse = require('parse/react-native');

Parse.initialize('gotango', 'unused');
Parse.serverURL = 'https://go-tango.herokuapp.com/parse';

// import {OrganizersService} from './models/organizers';
// import {LocationsService}  from './models/locations';

import {EventsListView} from './components/eventListView';
import {EditEventComponent} from './components/editEventComponent';
import {EventsMapView} from './components/eventMapView';

var App = React.createClass ({
    getInitialState() {
        return {
        }
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
    render() {
        var page;
        switch (this.state.app.navigateTo) {
            case "eventsListView":
                page = (
                    <EventsListView {...this.props} />
                );
                break;
            case "editEventComponent":
                page = (
                    <EditEventComponent {...this.props} />
                )
                break;
            case "eventsMapView":
                page = (
                    <EventsMapView {...this.props} />
                );
                break;
            default:
                page = (
                    <EventsListView {...this.props} />
                );
                break;
        }
        return (
            <View style={{flex:1}}>
                {page}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        /*flex: 1,*/
        backgroundColor: '#F5FCFF'
    }
});

/*
 var styles = StyleSheet.create({
 container: {
 padding:30,
 marginTop: 65,
 alignItems:'center'
 },
 image: {
 width: 217,
 height: 138
 },
 searchInput: {
 height: 36,
 padding: 4,
 marginRight: 5,
 flex: 4,
 fontSize: 18,
 borderWidth: 1,
 borderColor: '#48BBEC',
 borderRadius: 8,
 color: '#48BBEC'
 }
 });
 */

module.exports = App;
