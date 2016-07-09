/**
 * Created by alexanderbol on 23/06/2016.
 */
import React from 'react';

var ReactNative = require('react-native');

var {Text,
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ActionSheetIOS,
    Platform,
    Linking,
    Alert
    } = ReactNative;

// var ActionTypes = require('../store/actionTypes.js');
import * as ActionTypes from '../store/actionTypes';

var Icon = require('react-native-vector-icons/FontAwesome');

import {HeaderComponent} from '../components/headerComponent';

var MapView = require('react-native-maps');

export const EventsMapView = React.createClass ({
    getInitialState() {
        return {
            region: {
                latitude: 32.072528,
                longitude: 34.784366,
                latitudeDelta: 0.031,
                longitudeDelta: 0.014,
                /*
                 latitude: 37.78825,
                 longitude: -122.4324,
                 latitudeDelta: 0.0922,
                 longitudeDelta: 0.0421,
                 */
                /*34.784366,  32.072528*/
            },
        };
    },
    componentWillMount() {
        this.dispatch = this.props.store.dispatch;
        var events = this.props.store.getState().events;
        this.setState({ events });
    },
    componentWillReceiveProps(nextProps) {
        var events = nextProps.store.getState().events;
        this.setState({ events });
    },
    componentDidMount() {
    },
    backToEventListView() {
        this.dispatch({
            type: ActionTypes.BACK_TO_EVENT_LIST_VIEW
        })
    },
    onRegionChange(region) {
        this.setState({ region });
    },
    render() {
        return (
            <View>
                <HeaderComponent
                    title="Map of milongas"
                    onBackButtonPressed={() => this.backToEventListView()}
                />
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    {
                        this.state.events.map(event => {
                            var location = event.get('location').get('geolocation');
                            var latlng = {latitude: location.latitude,
                                longitude: location.longitude};

                            return (
                                <MapView.Marker
                                    key = {event.id}
                                    coordinate={latlng}
                                    title={event.get('name')}
                                    description=""
                                />
                            )
                        })

                    }
                </MapView>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        width: 500,
        height: 800
    },
});

/*
 <HeaderComponent
 title="Map of milongas"
 onBackButtonPressed={() => this.backToEventListView()}
 />

 */

/*
 {
 this.props.events.map(event => {
 var location = event.get('location').get('geolocation');
 var latlng =
 {latitude: location.get('latitude'),
 longitude: location.get('longitude')}
 return (
 <MapView.Marker
 key = {event.id}
 coordinate={latlng}
 title={event.get('title')}
 description=""
 />
 )
 })

 }

 */