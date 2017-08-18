/**
 * Load Modules:
 */

var _validators = {};
var _user2validatorCache = {};

function _loginAndCache(username, password) {
    for(nValidator in _validators) {
        var validator = _validators[nValidator];
        if(validator.validateUser(username, password)) {
            _user2validatorCache[username] = validator;
            return validator.validateUser(username, password);
        }
    }
}

module.exports = {
    registerValidator : function(validator, name) {
        if(name in _validators) {
            throw "validator already registered!"
        }
        //validate interface:
        if(typeof(validator.createUser) !== 'function') {
            throw "validator has missing mandatory functions.1"
        }
        if(typeof(validator.validateUser) !== 'function') {
            throw "validator has missing mandatory functions.2"
        }
        if(typeof(validator.getUserProperties) !== 'function') {
            throw "validator has missing mandatory functions.3"
        }
        if(typeof(validator.setUserProperties) !== 'function') {
            throw "validator has missing mandatory functions.4"
        }
        if(typeof(validator.deleteUser) !== 'function') {
            throw "validator has missing mandatory functions.5"
        }
        
        _validators[name] = validator;
    },
    validateUser : function(username, password) {
        if(username in _user2validatorCache) {
            return _user2validatorCache[username].validateUser(username, password);
        } else {
            return _loginAndCache(username, password);
        }
    }
}