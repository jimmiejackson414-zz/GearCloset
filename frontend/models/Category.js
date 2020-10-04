import { Model } from '@vuex-orm/core';
// import CategoryItem from './CategoryItem';
// import Item from './Item';
// import Pack from './Pack';

export default class Category extends Model {
  static entity = 'categories';

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      pack_id: this.attr(null),
      created_at: this.string(''),
      updated_at: this.string('')

      // relationships //
      // categories_items: this.hasMany(CategoryItem, 'category_id'),
      // items: this.belongsToMany(Item, CategoryItem, 'category_id', 'item_id'),
      // pack: this.belongsTo(Pack, 'pack_id')
    };
  }
}
