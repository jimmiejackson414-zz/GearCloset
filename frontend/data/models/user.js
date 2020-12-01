import { Model } from '@vuex-orm/core';
import ForumComment from './forumComment';
import ForumPost from './forumPost';
import Notification from './notification';
import Pack from './pack';
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
      comments: this.hasMany(ForumComment, 'user_id'),
      posts: this.hasMany(ForumPost, 'user_id'),
      notifications: this.hasMany(Notification, 'user_id'),
      packs: this.hasMany(Pack, 'user_id'),
      trips: this.hasMany(Trip, 'owner_id')
    };
  }
};
