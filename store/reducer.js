/**
 * Created by alexanderbol on 23/06/2016.
 */
/**
 * Created by alexanderbol on 09/01/2016.
 */
import * as ActionTypes from '../store/actionTypes';
var Redux = require('redux');

const initialAppState = {
    showSpinner: false,
    navigateTo: "eventsListView",
    currentEvent: null
};

function app(state=initialAppState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_DATA_REQUEST_STARTED:
            return Object.assign({}, state, {
                showSpinner: true
            });
        case ActionTypes.FETCH_DATA_REQUEST_FINISHED:
            return Object.assign({}, state, {
                showSpinner: false
            });
        case ActionTypes.ADD_NEW_EVENT_REQUEST_SUCCEED:
            return Object.assign({}, state, {
                navigateTo: "editEventComponent",
                currentEvent: action.event
            });
        default:
            return state;
    }
}

function organizers(state=[], action) {
    switch (action.type) {
        case ActionTypes.FETCH_ORGANIZERS_REQUEST_SUCCEED:
            return action.organizers;
        default:
            return state;
    }
}

function locations(state=[], action) {
    switch (action.type) {
        case ActionTypes.FETCH_LOCATIONS_REQUEST_SUCCEED:
            return action.locations;
        default:
            return state;
    }
}

function events(state=[], action) {
    switch (action.type) {
        case ActionTypes.FETCH_EVENTS_REQUEST_SUCCEED:
            return action.events;
        case ActionTypes.ADD_NEW_EVENT_REQUEST_SUCCEED:
            return (state
                .slice()
                .concat([action.event]));
        case ActionTypes.EVENT_CHANGED:
            var index = state.findIndex( (event_tmp) => (event_tmp.id == action.event.id) );
            return (state
                .slice(0, index)
                .concat([action.event])
                .concat(state.slice(index+1)));
        default:
            return state;
    }
}

export var reducer = Redux.combineReducers({
    app,
    organizers,
    locations,
    events
});
