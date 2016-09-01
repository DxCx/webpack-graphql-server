import { expect, should } from "chai";
import { Schema } from "./schema";

// Enable Chai's should
should();

describe("Schema", () => {
    it("should resolve testString correctly", (done) => {
        let query = Schema.getQueryType();
        expect(query).to.be.a("object");

        let fields: any = query.getFields();
        expect(fields).to.be.a("object");

        expect(fields.testString.resolve()).to.be.equal("it works");
        done();
    });
});
