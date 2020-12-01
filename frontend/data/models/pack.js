import { Model } from '@vuex-orm/core';
import Category from './category';
import Item from './item';
import Trip from './trip';
import User from './user';

export default class Pack extends Model {
  static entity = 'packs';
  static eagerLoad = ['categories'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      user_id: this.attr(null),
      active: this.boolean(false),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships //
      categories: this.hasMany(Category, 'pack_id'),
      items: this.hasManyThrough(Item, Category, 'pack_id', 'category_id'),
      trips: this.hasMany(Trip, 'pack_id'),
      user: this.belongsTo(User, 'user_id')
    };
  }
}
