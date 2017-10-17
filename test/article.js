const chai = require('chai')
const chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Article', function() {
    it('should have valid input attribute at POST /article', function (done) {
        // How many tours are there now?
        Tour.find(function(err, tours) {
            var tourCount = tours.count;

            var tour = { category: "Fashion", articleName: "Some modern thing", content: "something interesting..." };
            chai.request('localhost:8080')
                .post('/tours', tour)
                .end(function (err, res){

                    // re-checking the database
                    Tour.find(function(err, tours) {
                        tourCount.should.be.equal(tours + 1);

                        // Check that the response is a successful
                        res.should.have.status(200);
                        done();
                    });
                });
        });
    });
});