import { Model } from '@vuex-orm/core';
// import Pack from './Pack';
// import ShoppingListItem from './ShoppingListItem';
// import TripDetail from './TripDetail';
// import Todo from './Todo';

export default class Hike extends Model {
  static entity = 'hikes';

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      distance: this.number(0).nullable(),
      user_id: this.attr(null),
      pack_id: this.attr(null),
      start_date: this.string('').nullable(),
      end_date: this.string('').nullable(),
      start_location: this.string('').nullable(),
      end_location: this.string('').nullable(),
      created_at: this.attr(null),
      updated_at: this.attr(null)

      // relationships //
      // pack: this.hasOne(Pack, 'pack_id'),
      // shopping_list_items: this.hasMany(ShoppingListItem, 'hike_id'),
      // trip_details: this.hasMany(TripDetail, 'hike_id'),
      // todos: this.hasMany(Todo, 'hike_id')
    };
  }
}
