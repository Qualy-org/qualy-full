'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use('/api/tech', require('./index'));

describe('ROUTE /api/tech', function () {
    describe('GET /api/tech', function () {
        it('should respond an array with techs', function (done) {
            request(app)
                .get('/api/tech')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.be.an.instanceof(Array);
                    expect(res.body).to.eql([
                        'ES6',
                        'Gulp',
                        'Stylus',
                        'Jade',
                        'Browsersync',
                        'Husky Hooks',
                        'JSCS',
                        'Nodejs'
                    ]);

                    done();
                });
        });
    });
});
