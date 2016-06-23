/**
 * Created by alexanderbol on 23/06/2016.
 */
var Parse = require('parse/react-native');

Parse.initialize('gotango', 'unused');
Parse.serverURL = 'https://go-tango.herokuapp.com/parse';

export class LocationsService extends Parse.Object {
    constructor() {
        super('Locations');     // Pass the ClassName to the Parse.Object constructor
    }
    fetch() {
        var localeQuery = new Parse.Query('Locations');
        return localeQuery.find();
    }
}
