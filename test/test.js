var assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect;
const app = '../app.js';
var request = require('request');


describe('GET /Exchange Rate', () => {
    it('should return 200 and should have property base with value EURO', function (done) {
        this.timeout(30000);
        request.get('http://api.exchangeratesapi.io/latest?access_key=cfa1ceea094874dfa6a804c37410642a&base=EUR', function (err, res, body){
            expect(res.statusCode).to.equal(200) &&
                expect(JSON.parse(body)).to.have.property('base') &&
                    expect(JSON.parse(body)).has.property.valueOf('EUR');
            done();
        });
    });
});

describe('GET /Send Transactions', () => {
    it('should return 200', function (done) {
        this.timeout(30000);
        request.get('http://localhost:3000/converter/send-transactions', function (err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

describe('GET /Send Transactions', () => {
    it('should return 404', function (done) {
        request.get('http://localhost:3000/converter/send-transactions/adasd', function (err, res, body){
            expect(res.statusCode).to.equal(404);
            done();
        });
    });
});