   import gql from 'graphql-tag';


export class AA {

    aaa() {
        console.log("eeeeee");
    }
}


new AA().aaa();

const str1 = gql`
  {
    
  }
`; 

// query is now a GraphQL syntax tree object


console.log(str1);