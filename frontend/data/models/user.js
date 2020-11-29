import { Model } from '@vuex-orm/core';
import Notification from './notification';
import Trip from './trip';

export default class User extends Model {
  static entity = 'users';

  static eagerLoad = ['notifications'];

  static fields () {
    return {
      id: this.attr(null),
      email: this.string(''),
      first_name: this.string('').nullable(),
      last_name: this.string('').nullable(),
      avatar_url: this.string('').nullable(),
      trail_name: this.string('').nullable(),
      address_1: this.string('').nullable(),
      address_2: this.string('').nullable(),
      city: this.string('').nullable(),
      state: this.string('').nullable(),
      country: this.string('').nullable(),
      subscription_level: this.string(''),
      measuring_system: this.string(''),
      pending_invite: this.boolean(false),
      has_onboarded: this.boolean(false),

      // relationships
      notifications: this.hasMany(Notification, 'user_id'),
      trips: this.hasMany(Trip, 'owner_id')
    };
  }
};
