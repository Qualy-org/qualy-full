'use strict';

import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import router from './index';

const app = express();

app.use(bodyParser.json());

app.use('/api/tech', router);

describe('ROUTE /api/tech', () => {
    describe('GET /api/tech', () => {
        it('should respond an array with techs', (done) => {
            request(app)
                .get('/api/tech')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
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
