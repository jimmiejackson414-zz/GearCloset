import { gql } from 'graphql-request';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    email
    avatar_url
    first_name
    last_name
    trail_name
    address_1
    address_2
    city
    state
    country
    subscription_level
    measuring_system
    pending_invite
    has_onboarded
    created_at
    updated_at
  }
`;
