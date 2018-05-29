import gql from 'graphql-tag';

export default gql`

mutation UpdateProfile (
    $firstName: String,
    $lastName: String,
    $birthdate: String,
    $gender: String,
    $location: String
  ){
    updateProfile(input: {firstName:$firstName, lastName:$lastName, birthdate:$birthdate, gender:$gender, location:$location}){
      userid
      firstName
      lastName
      birthdate
      gender
      location
    }
}`;
