/**
 * Created by alexanderbol on 23/06/2016.
 */
var Parse = require('parse/react-native');

Parse.initialize('gotango', 'unused');
Parse.serverURL = 'https://go-tango.herokuapp.com/parse';

export class OrganizersService extends Parse.Object {
    constructor() {
        super('Organizers');     // Pass the ClassName to the Parse.Object constructor
    }
    fetch() {
        var localeQuery = new Parse.Query('Organizers');
        return localeQuery.find();
    }
}
