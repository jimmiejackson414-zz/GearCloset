import { Model } from '@vuex-orm/core';
// import Category from '~/models/Category';
// import Item from '~/models/Item';

export default class Pack extends Model {
  static entity = 'packs';

  static state () {
    return {
      selected: null
    };
  }

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      user_id: this.attr(null),
      active: this.boolean(false),
      created_at: this.attr(null),
      updated_at: this.attr(null)

      // relationships //
      // categories: this.hasMany(Category, 'pack_id'),
      // items: this.hasManyThrough(Item, Category, 'pack_id', 'category_id')
    };
  }
}
