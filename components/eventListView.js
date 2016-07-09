/**
 * Created by alexanderbol on 23/06/2016.
 */
import React from 'react';

var ReactNative = require('react-native');
var Parse = require('parse/react-native');

Parse.initialize('gotango', 'unused');
Parse.serverURL = 'https://go-tango.herokuapp.com/parse';

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

// use http://fortawesome.github.io/Font-Awesome/icons/

var Icon = require('react-native-vector-icons/FontAwesome');

import {EventListHeaderComponent} from '../components/eventListHeaderComponent';

export const EventsListView = React.createClass ({
    getInitialState() {
        return {}
    },
    componentWillMount() {
        this.dispatch = this.props.store.dispatch;
        var state = this.props.store.getState();
        this.setState(state);
    },
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.store.getState());
    },
    componentDidMount() {
        if (this.state.app.needFetchData) {
            this.fetchData();
        }
    },
    fetchData() {
        var query = new Parse.Query('Locations');
        query.find()
            .then((locations) => {
                this.dispatch({
                    type: ActionTypes.FETCH_LOCATIONS_REQUEST_SUCCEED,
                    locations: locations
                });
                //locations.forEach(location => {
                //    console.log(location.get('geolocation'));
                //})
                var query1 = new Parse.Query('Organizers');
                return query1.find();
            })
            .then((organizers) => {
                this.dispatch({
                    type: ActionTypes.FETCH_ORGANIZERS_REQUEST_SUCCEED,
                    organizers: organizers
                });
                var query2 = new Parse.Query('Events')
                    .include('organizer')
                    .include('location');
                return query2.find();
            })
            .then((events) => {
                this.dispatch({
                    type:ActionTypes.FETCH_EVENTS_REQUEST_SUCCEED,
                    events: events
                });

            }, (error) => {
                console.log(error)
            });
            this.dispatch( {
                type: ActionTypes.FETCH_DATA_REQUEST_STARTED
            })
    },
    onAddButtonPressed() {
        var event = new Parse.Object('Events');

        event.set({
            "name":"my milonga"
        });

        event.save().then((event) => {
            this.dispatch({
                type: ActionTypes.ADD_NEW_EVENT_REQUEST_SUCCEED,
                event: event
            })
        });
    },
    goToMap() {
        this.dispatch({
            type: ActionTypes.GO_TO_MAP_PRESSED
        })
    },
    itemSelected(item) {
        alert('item selected');
    },
    renderRow(item) {
        return (
            <TouchableOpacity key={item.id}
                              onPress={() => this.itemSelected(item)} >
                <View style={styles.itemContainer} >
                    <Text style={styles.itemName}>
                        {item.get('name')}
                    </Text>
                    <Text style={{marginLeft:10}}>
                        {item.get('organizer').get('name')}
                    </Text>
                    <Text style={{marginLeft:10}}>
                        {item.get('location').get('name')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },
    render() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource = ds.cloneWithRows(this.state.events);
        var styleContainer = this.state.app.showSpinner ? styles.containerSpinner : styles.containerList
        return (
            <View style={styleContainer}>

                {this.state.app.showSpinner ? (
                    <Image
                        source={require('../logo.png')} />
                ) : (
                    <View style={styles.container}>
                        <EventListHeaderComponent
                            title="Milongas"
                            onMapButtonPressed={() => this.goToMap()}
                        />

                        <ListView ref="eventsList"
                                  dataSource={dataSource}
                                  enableEmptySections={true}
                                  initialListSize = {20}
                                  renderRow={(event) => this.renderRow(event)}
                        />
                         <TouchableOpacity
                            onPress={() => this.onAddButtonPressed()}
                            activeOpacity={1.0}>
                            <Icon name='plus' size={20} color='green'>
                            </Icon>
                         </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
});

/*

 */
const styles = StyleSheet.create({
    containerSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerList: {
        flex: 1,
        /*justifyContent: 'center',*/
        /*alignItems: 'center',*/
        backgroundColor: '#F5FCFF',
    },
    itemContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'honeydew',
        marginVertical: 5,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
        color: 'grey'
    },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
});


