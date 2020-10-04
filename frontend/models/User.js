import { Model } from '@vuex-orm/core';
// import Category from './Category';
// import Pack from './Pack';

export default class User extends Model {
  static entity = 'users';

  static fields () {
    return {
      id: this.uid(1),
      email: this.string('benny.timkins@gmail.com'),
      first_name: this.string('Benny').nullable(),
      last_name: this.string('Timkins').nullable(),
      trail_name: this.string('Walk and Eat').nullable(),
      // hiker_type: this.string('').nullable(),
      address_1: this.string('342 CR 101').nullable(),
      address_2: this.string('').nullable(),
      city: this.string('Lago Vista').nullable(),
      state: this.string('Texas').nullable(),
      country: this.string('United States').nullable(),
      avatar_url: this.string('https://cdn.vuetifyjs.com/images/john.jpg').nullable(),
      // cloudinary_public_id: this.string('').nullable(),
      created_at: this.attr('2020-03-09 17:09:16'),
      updated_at: this.attr('2020-03-09 17:09:16'),
      // miles_by_month: this.attr([]).nullable(),
      token: this.attr(null)

      // relationships //
      // packs: this.hasMany(Pack, 'user_id'),
      // categories: this.hasManyThrough(Category, Pack, 'user_id', 'pack_id'),
      // items: this.hasManyThrough()
    };
  };

  // get avatarInitials() {
  //   if (this.first_name && this.last_name) return `${this.first_name.charAt(0)}${this.last_name.charAt(0)}`;
  //   if (this.first_name && !this.last_name) return `${this.first_name.charAt(0)}`;
  //   if (!this.first_name && this.last_name) return `${this.last_name.charAt(0)}`;
  //   return `${this.email.charAt(0)}`;
  // }
}
