import gql from 'graphql-tag';

export default gql`

query {
  getUser {
    id
    profile {
      userid
      firstName
      lastName
      birthdate
      gender
      location
    }
  }
}`;
