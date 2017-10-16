const chai = require('chai');
const chaiHttp = require('chai-http');
var server = require('../app'); //should fail
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require('../models/user');

describe('User', function() {
});

it('should no be able to login, if user don`t have an account', function (done) {
    agent
        .post('/login', { email: "error@wrong.com", password: "fail" })
        .end(function (err, res){
            res.status.should.be.equal(401);
            done();
        });

});