import { Model } from '@vuex-orm/core';

export default class TripUser extends Model {
  // static entity = 'trip_user';
  static entity = 'tripUser';

  static primaryKey = ['trip_id', 'user_id'];

  static fields () {
    return {
      id: this.attr(null),
      trip_id: this.attr(null),
      user_id: this.attr(null),
      created_at: this.attr(''),
      updated_at: this.attr('')
    };
  }
};
