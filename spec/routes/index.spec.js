const express = require('express');
const request = require('supertest');
const index = require('../../routes/index');
const mock = require("mock-require");

const mockPath = "../mocks/";

mock("../../services/database.js", require(mockPath.concat("mock-database")));

function IndexParams(filters, page) {
    _.extend(this, filters);
    this.page = page;
}

describe("The index page", () => {
    describe("Get /", () => {
        let app;

        beforeEach(() => {
            app = express();
            app.use(index);
            app.set('view engine', 'pug');
            app.engine('html', require('ejs').renderFile);
        });

        it("Test", () => {
            expect(null).toBeNull();
        });

        it("It should render a page", (done) => {
            let req, res;

            req = res = {};

            app.use("/", index);

            request(app).get("/", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            }).end();
        });

        it("It should contain the cars, and filters", (done) => {
            let req, res;

            req = res = {};

            app.use("/", index);

            request(app).get("/", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            }).query(new IndexParams({

            })).end();

        });
    });
});