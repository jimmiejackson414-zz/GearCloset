import { Model } from '@vuex-orm/core';

export default class FriendUser extends Model {
  static entity = 'friend_user';

  static primaryKey = ['user_id', 'friend_id'];

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      friend_id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null)
    };
  }
};
