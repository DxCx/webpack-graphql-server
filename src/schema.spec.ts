import {Schema} from './schema';
import {graphql} from 'graphql';
import 'jest';
import {persons, findPerson, addPerson} from './data-base/person-database';

function assertNoError(res) {
  if (res.errors) {
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

  it("should list all persons", () => {
    let testQuery = `{
             persons {
                name
                sex
            }
        }`;

    return graphql(Schema, testQuery, undefined, {persons}).then((res) => {
      assertNoError(res);
      expect(res.data).toMatchSnapshot();
    });
  });

  it("should find a person correctly", () => {
    let testQuery = `{
             getPerson(id: "3"){
                name
                id
            }
        }`;

    return graphql(Schema, testQuery, undefined, {persons, findPerson, addPerson}).then((res) => {
      assertNoError(res);
      expect(res.data).toMatchSnapshot();
    });
  });

  it("should find a person and drill down matches (2 levels) correctly", () => {
    let testQuery = `{
             getPerson(id: "3"){
                name
                id
                matches {
                    id
                    matches {
                        name
                    }
                }
            }
        }`;

    return graphql(Schema, testQuery, undefined, {persons, findPerson, addPerson}).then((res) => {
      assertNoError(res);
      expect(res.data).toMatchSnapshot();
    });
  });

  it("should add a person and retrieve it correctly", () => {
    let testQuery = `mutation {
            addPerson(name:"kuku", sex: "male") {
                id
            }
        }`;

    return graphql(Schema, testQuery, undefined, {persons, findPerson, addPerson}).then((res) => {
      assertNoError(res);
      let newId = res.data.addPerson.id;
      let testVerifyQuery = `{
                getPerson(id: "${newId}"){
                        id
                        name
                    }
                }`;
      return graphql(Schema, testVerifyQuery, undefined, {persons, findPerson, addPerson}).then((res) => {
        expect(res.data.getPerson.id).toEqual(newId);
        expect(res.data.getPerson.name).toEqual("kuku");
      });
    });
  });

});
