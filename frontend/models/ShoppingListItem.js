import { Model } from '@vuex-orm/core';
// import Hike from './Hike';

export default class ShoppingListItem extends Model {
  static entity = 'shopping_list_items';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      checked: this.boolean(false),
      hike_id: this.attr(null),
      quantity: this.number(0),
      created_at: this.attr(null),
      updated_at: this.attr(null)

      // relationships
      // hike: this.belongsTo(Hike, 'hike_id')
    };
  }
}
