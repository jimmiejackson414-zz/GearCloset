import CREATE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/createShoppingListItem.gql';
import REMOVE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/deleteShoppingListItem.gql';
import UPDATE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/updateShoppingListItem.gql';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_SHOPPING_LIST_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
};

async function destroy ({ graphql, token, variables }) {
  return await graphql.request(
    REMOVE_SHOPPING_LIST_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
};

async function update ({ graphql, token, variables }) {
  return await graphql.request(
    UPDATE_SHOPPING_LIST_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
};

export const shoppingListItemService = {
  create,
  destroy,
  update
};
