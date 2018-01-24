import { gql, graphql } from 'services/graphql/helpers';

const query = gql`
  query Viewer($after: DateType, $before: DateType) {
    viewer {
      id
      firstName
      lastName
      company {
        id
        name
        users {
          id
          firstName
          lastName
        }
        shifts(after: $after, before: $before) {
          id
          endTime
          startTime
          published
          user {
            id
          }
        }
      }
    }
  }
`;

const get = async ({ after, before }) => {
  try {
    const { data: { viewer }, errors } = await graphql.query({
      query,
      fetchPolicy: 'network-only',
      variables: {
        after,
        before,
      },
    });

    return {
      errors,
      data: viewer,
    };
  } catch (e) {
    return {
      errors: e,
    };
  }
};

export default get;
