import updateTripMutation from '~/apollo/mutations/planning/updateTrip.gql';

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateTripMutation,
    variables: fields
  });
}

export const tripService = {
  update
};
