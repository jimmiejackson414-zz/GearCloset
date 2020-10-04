/* eslint-disable import/no-named-as-default-member */
import VuexORM from '@vuex-orm/core';
import database from '~/database';

export const state = () => ({});

export const mutations = {};

export const plugins = [
  VuexORM.install(database)
];
