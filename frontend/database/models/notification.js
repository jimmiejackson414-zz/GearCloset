import { Model } from '@vuex-orm/core';
import User from './user';

export default class Notification extends Model {
  static entity = 'notifications';

  static fields () {
    return {
      id: this.attr(null),
      message: this.string(''),
      viewed: this.boolean(false),
      user_id: this.attr(null),

      // relationships
      user: this.belongsTo(User, 'user_id')
    };
  }
};
