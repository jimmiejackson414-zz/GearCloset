import { DefaultAdapter, ConnectionMode, ArgumentMode } from '@vuex-orm/plugin-graphql';

export default class CustomAdapter extends DefaultAdapter {
  getConnectionMode () {
    return ConnectionMode.PLAIN;
  }

  getArgumentMode () {
    return ArgumentMode.LIST;
  }
};
