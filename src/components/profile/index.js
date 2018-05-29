import React from 'react';
import Amplify, { Auth } from 'aws-amplify'
import { graphql, compose } from 'react-apollo'

// components
import ProfileForm from './Form';

// queries
import CreateProfile from '../../queries/profile/Create';
import GetProfile from '../../queries/profile/Get';
import UpdateProfile from '../../queries/profile/Update';

export default compose(
  graphql(CreateProfile, {
    options:{
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
      createProfile: profile => {
        return props.mutate({
          variables: profile,
          optimisticResponse: (responseProps) => {
            const defaultProfile = {
              userid: '', firstName: '', lastName: '', birdthdate: '', gender: '', location: ''
            }
            return({ createProfile: {...profile, ...defaultProfile, __typename: 'Profile' } })
          }
        });
      }
    }),
    options: {
      refetchQueries: [{ query: GetProfile }],
      update: (dataProxy, { data: { createProfile } }) => {
        const query = GetProfile;
        const data = dataProxy.readQuery({ query });
        dataProxy.writeQuery({ query, data });
    }
    }
  }),
  graphql(UpdateProfile, {
    props: (props) => ({
      updateProfile: (profile) => {
          props.mutate({
          variables: profile,
          optimisticResponse: (responseProps) => {
            return({ updateProfile: {...profile, __typename: 'Profile' } })
          }
        })
      }
    }),
    options: {
        refetchQueries: [{ query: GetProfile }],
        update: (dataProxy, { data: { updateProfile } }) => {
            const query = GetProfile;
            const data = dataProxy.readQuery({ query });
            dataProxy.writeQuery({ query, data });
        }
    }
  }),
  graphql(GetProfile, {
     options:{
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => {
      // console.log('GET PROFILE GRAPHQL', props)
      return ({
        loading: props.data.loading,
        profile: props.data.getProfile && props.data.getProfile
      })
      
    }
  })
)(ProfileForm);
