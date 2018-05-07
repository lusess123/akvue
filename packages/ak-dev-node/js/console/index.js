"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
class AA {
    aaa() {
        console.log("eeeeee");
    }
}
exports.AA = AA;
new AA().aaa();
const str1 = graphql_tag_1.default `
  {
      
  }
`;
// query is now a GraphQL syntax tree object
console.log(str1);
