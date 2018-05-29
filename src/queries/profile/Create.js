import gql from 'graphql-tag';

export default gql`

mutation createProfile (
    $firstName: String,
    $lastName: String,
    $birthdate: String,
    $gender: String,
    $location: String
  ){
    createProfile(input: {firstName:$firstName, lastName:$lastName, birthdate:$birthdate, gender:$gender, location:$location}){
      # __typename
      userid
      firstName
      lastName
      birthdate
      gender
      location
    }
}`;