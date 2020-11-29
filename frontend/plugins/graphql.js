/* eslint-disable import/no-named-as-default-member */
import VuexORM from '@vuex-orm/core';
import VuexORMGraphQL from '@vuex-orm/plugin-graphql';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import CustomAdapter from '~/data/adapter';
import database from '~/data/database';

// The url can be anything, in this example we use the value from dotenv
export default function ({ app, env }) {
  const apolloClient = app?.apolloProvider?.defaultClient;
  const options = {
    database,
    adapter: new CustomAdapter(),
    url: env.NUXT_ENV_BACKEND_API_URL,
    debug: process.env.NODE_ENV !== 'production'
  };

  if (apolloClient) {
    options.apolloClient = apolloClient;
  } else {
    options.link = new HttpLink({ uri: options.url, fetch });
  }

  VuexORM.use(VuexORMGraphQL, options);
};
