import UPDATE_TRIP_MUTATION from '~/apollo/mutations/planning/updateTrip.gql';

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_TRIP_MUTATION,
    variables: fields
  });
}

export const tripService = {
  update
};
