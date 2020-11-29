/* eslint-disable import/no-named-as-default-member */
import VuexORM from '@vuex-orm/core';
import database from '~/data/database';

export default ({ store }) => {
  VuexORM.install(database)(store);
};
