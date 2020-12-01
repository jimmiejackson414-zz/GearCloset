import { Model } from '@vuex-orm/core';
import Trip from './trip';

export default class ShoppingListItem extends Model {
  static entity = 'shoppingListItems';

  static fields () {
    return {
      id: this.attr(0),
      title: this.string('New Item'),
      checked: this.boolean(false),
      trip_id: this.attr(null),
      quantity: this.number(0),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships
      trip: this.belongsTo(Trip, 'trip_id')
    };
  }
}
