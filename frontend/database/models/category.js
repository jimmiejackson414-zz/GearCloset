import { Model } from '@vuex-orm/core';
import CategoryItem from './categoryItem';
import Item from './item';
import Pack from './pack';

export default class Category extends Model {
  static entity = 'categories';
  static eagerLoad = ['items'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      pack_id: this.attr(null),
      unit: this.string(''),
      created_at: this.string(''),
      updated_at: this.string(''),

      // relationships //
      categoriesItem: this.hasMany(CategoryItem, 'category_id'),
      items: this.belongsToMany(Item, CategoryItem, 'category_id', 'item_id'),
      pack: this.belongsTo(Pack, 'pack_id')
    };
  }
}
