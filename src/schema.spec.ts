import { Schema } from "./schema";
import { graphql } from "graphql";
import 'jest';

function assertNoError(res) {
    if ( res.errors ) {
        console.error(res.errors);
        expect(typeof res.errors).toBe("undefined");
    }
}

describe("Schema", () => {
    it("should export valid schema", () => {
        let query = Schema.getQueryType();
        expect(typeof query).toBe("object");

        let fields: any = query.getFields();
        expect(typeof fields).toBe("object");
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
            expect(res.data).toMatchSnapshot();
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

        return graphql(Schema, testQuery, undefined, {}).then((res) => {
            assertNoError(res);
            expect(res.data).toMatchSnapshot();
        });
    });

    it("should resolve testStringConnector correctly", () => {
        let testQuery = `{
            testStringConnector
        }`;
  
        const ctx = {testConnector: {testString: 'it works from connector as well!'}};
        return graphql(Schema, testQuery, undefined, ctx).then((res) => {
            assertNoError(res);
            expect(res.data).toMatchSnapshot();
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
            let data = res.data as {
              mockedObject: {
                mockedInt: number
                mockedFirstName: string
              }
            };

            assertNoError(res);
            expect(data.mockedObject.mockedInt).toBeGreaterThan(-1000);
            expect(data.mockedObject.mockedInt).toBeLessThan(1000);

            expect(data.mockedObject.mockedFirstName).toMatchSnapshot();
        });
    });
});
