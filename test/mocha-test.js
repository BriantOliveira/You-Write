const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Site', function () {
   it('Home page', function (done) {
       chai.request('localhost:8080')
           .get('/')
           .end(function (err, res) {
               console.log(res);
               res.status.should.be.equal(200);
               done();
           });
   }) ;
});