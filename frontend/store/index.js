import { install } from '@vuex-orm/core';
import database from '~/database';

export const plugins = [install(database)];

export const state = () => ({});
