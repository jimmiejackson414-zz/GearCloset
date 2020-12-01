import { Model } from '@vuex-orm/core';

export default class CategoryItem extends Model {
  // static entity = 'categories_items';
  static entity = 'categoriesItems';

  static primaryKey = ['category_id', 'item_id'];

  static fields () {
    return {
      id: this.attr(null),
      category_id: this.attr(null),
      item_id: this.attr(null),
      position: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null)
    };
  }
}
