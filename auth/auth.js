/**
 * Load Modules:
 */
var _m_mongoose = require('mongoose')

/**
 *  Default Validator:
 */
var _defaultUsers = {};
var validatorDefault = {
    createUser : function(username, password, properties) {
        if(username in _defaultUsers) {
            throw "User Allready Exists!"
        } else {
            user = {
                'username'   : username,
                'password'   : password,
                'properties' : properties
            };
            _defaultUsers[username] = user;
        }
    },
    validateUser : function(username, password) {
        try {
            return _defaultUsers[username].password === password;
        } catch (e) {
            return false;
        }
    },
    getUserProperties : function(username) {
        try {
            return _defaultUsers[username].properties;
        } catch (e) {
            throw "User: "+username+" doesn't exist!";
        }
    },
    setUserProperties : function(username, properties) {
        try {
            _defaultUsers[username].properties = properties;
        } catch (e) {
            throw "User: "+username+" doesn't exist!";
        }
    },
}
validatorDefault.createUser("root", "e=m*c^2");

/**
 *  mongodb Validator
 */
var _m_mongoose.connect("mongodb://localhost/TMMO");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
var validatorMongoDB = {
    createUser : function(username, password, properties) {

    },
    validateUser : function(username, password) {

    },
    getUserProperties : function(username) {

    },
    setUserProperties : function(username, properties) {

    },
}

module.exports.login = function(username, password) {
    
}