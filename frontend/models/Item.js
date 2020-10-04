import { Model } from '@vuex-orm/core';
// import Category from './Category';
// import CategoryItem from './CategoryItem';

export default class Item extends Model {
  static entity = 'items';

  static fields () {
    return {
      id: this.attr(null),
      name: this.string('').nullable(),
      weight: this.number(null).nullable(),
      website: this.string('').nullable(),
      price: this.number(null).nullable(),
      information: this.string('').nullable(),
      notes: this.string('').nullable(),
      generic_type: this.string(null).nullable(),
      category_id: this.attr(null).nullable(),
      consumable: this.boolean(0),
      worn: this.boolean(0),
      quantity: this.number(0),
      created_at: this.attr(''),
      updated_at: this.attr('')

      // relationships
      // categories_items: this.hasMany(CategoryItem, 'item_id'),
      // categories: this.belongsToMany(Category, CategoryItem, 'item_id', 'category_id')
    };
  }
}
