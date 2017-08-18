var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var tstUtils = require('nodejs-maxbit89-testutils');
var performance = new tstUtils.Performance();

var auth = require('./auth.js');
var validatorSimple = require('nodejs-auth-validator-simple');

//register simple auth:
auth.registerValidator(validatorSimple);

describe('registerValidator', function() {
    it('functional register Validator', function() {
//        validatorSimple.clearUsers(); //do not do this first time to check user list gets initialized.
        validatorSimple.createUser("root", "e=m*c^2")
        assert(auth.validateUser("root", "e=m*c^2"));
        assert(!auth.validateUser("root", "wrong"));
    });
    it('second login must be faster.', function() {
        validatorSimple.clearUsers();
        validatorSimple.createUser("root", "e=m*c^2");
        var t1 = performance.methodExecutionTime(auth.validateUser, ["root", "e=m*c^2"]);
        var t2 = performance.methodExecutionTime(auth.validateUser, ["root", "e=m*c^2"]);
        expect(t1).to.be.above(t2);
    });
    it('can not assign two validators under same name.', function() {
        var ok = false;
        try {
            auth.registerValidator(validatorSimple);
        } catch (e) {
            ok = true;
            expect(e).to.equal("validator already registered!");
        }
        
        assert(ok);
    });
});