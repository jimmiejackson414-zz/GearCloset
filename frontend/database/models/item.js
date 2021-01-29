import { Model } from '@vuex-orm/core';
import Category from './category';
import CategoryItem from './categoryItem';

export default class Item extends Model {
  static entity = 'items';

  static fields () {
    return {
      id: this.attr(null),
      name: this.string('').nullable(),
      weight: this.number(null).nullable(),
      price: this.number(null).nullable(),
      generic_type: this.string(null).nullable(),
      category_id: this.attr(null).nullable(),
      consumable: this.boolean(0),
      worn: this.boolean(0),
      unit: this.string(''),
      quantity: this.number(0),
      position: this.attr(0),
      created_at: this.attr(''),
      updated_at: this.attr(''),

      // relationships
      categoriesItem: this.hasMany(CategoryItem, 'item_id'),
      categories: this.belongsToMany(Category, CategoryItem, 'item_id', 'category_id')
    };
  }
}
