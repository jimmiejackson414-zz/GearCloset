import { DefaultAdapter, ConnectionMode } from '@vuex-orm/plugin-graphql';

export default class CustomAdapter extends DefaultAdapter {
  getConnectionMode () {
    return ConnectionMode.PLAIN;
  }
};
