import gql from 'graphql-tag';

export default gql`

query {
  getProfile {
    userid
    firstName
    lastName
    birthdate
    gender
    location
  }
}`;
