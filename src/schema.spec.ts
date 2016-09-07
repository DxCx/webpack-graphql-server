import { expect, should } from "chai";
import { Schema } from "./schema";
import { graphql } from "graphql";

// Enable Chai's should
should();

function assertNoError(res) {
    if ( res.errors ) {
        console.error(res.errors);
        expect(res.errors).to.be.an("undefined");
    }
}

describe("Schema", () => {
    it("should export valid schema", () => {
        let query = Schema.getQueryType();
        expect(query).to.be.a("object");

        let fields: any = query.getFields();
        expect(fields).to.be.a("object");
    });

    it("should resolve testString correctly", () => {
        let testQuery = `{
            testString
        }`;

        let expectedResponse = {
            testString: "it Works!",
        };

        return graphql(Schema, testQuery, undefined, {}).then((res) => {
            assertNoError(res);
            expect(res.data).to.deep.equal(expectedResponse);
        });
    });

    it("should resolve someType correctly", () => {
        let testQuery = `{
            someType {
                testFloat,
                testInt,
                fixedString,
            }
        }`;

        let expectedResponse = {
            someType: {
                fixedString: "fixed.",
                testFloat: 303.0303,
                testInt: 666,
            },
        };

        return graphql(Schema, testQuery, undefined, {}).then((res) => {
            assertNoError(res);
            expect(res.data).to.deep.equal(expectedResponse);
        });
    });

    it("should resolve testStringConnector correctly", () => {
        let testQuery = `{
            testStringConnector
        }`;

        let expectedResponse = {
            testStringConnector: "it works from connector as well!",
        };

        return graphql(Schema, testQuery, undefined, {}).then((res) => {
            assertNoError(res);
            expect(res.data).to.deep.equal(expectedResponse);
        });
    });

    it("should resolve mockedObject  correctly", () => {
        let testQuery = `{
            mockedObject {
                mockedFirstName,
                mockedInt,
            }
        }`;

        return graphql(Schema, testQuery, undefined, {}).then((res) => {
            let data = res.data;

            assertNoError(res);
            expect(data.mockedObject.mockedFirstName).to.be.equal("Hello World");
            expect(data.mockedObject.mockedInt).to.be.within(-1000, 1000);
        });
    });
});
