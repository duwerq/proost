import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { graphql, compose } from 'react-apollo';

// components
import AuthForm from './Form';

// queries
import CreateUser from '../../queries/user/Create';
import GetUser from '../../queries/user/Get';

export default compose(
  graphql(CreateUser, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      createUser: (user) => {
        return props.mutate({
          optimisticResponse: (responseProps) => {
            return({ createUser: { id: '', __typename: 'User' } });
          }
        });
      }
    }),
    options: {
      refetchQueries: [{ query: GetUser }],
      update: (dataProxy, { data: { createUser } }) => {
        const query = GetUser;
        const data = dataProxy.readQuery({ query });
        dataProxy.writeQuery({ query, data });
      }
    }
  }),
  graphql(GetUser, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => {
      return ({
        loading: props.data.loading,
        user: props.data.getUser ? props.data.getUser : { user: null, profile: null }
      });
    }
  })
  // graphql(UpdateUser, {d
  //   props: (props) => ({
  //     updateUser: (user) => {
  //         props.mutate({
  //         variables: user,
  //         optimisticResponse: (responseProps) => {
  //           return({ updateUser: {...user, __typename: 'User' } })
  //         }
  //       })
  //     }
  //   }),
  //   options: {
  //       refetchQueries: [{ query: GetUser }],
  //       update: (dataProxy, { data: { updateUser } }) => {
  //           const query = GetUser;
  //           const data = dataProxy.readQuery({ query });
  //           dataProxy.writeQuery({ query, data });
  //       }
  //   }
  // }),

)(AuthForm);
