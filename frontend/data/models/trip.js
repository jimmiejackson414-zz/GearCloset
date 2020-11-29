import { Model } from '@vuex-orm/core';
import Pack from './pack';
import ShoppingListItem from './shoppingListItem';
import Todo from './todo';
import TripDetail from './tripDetail';
import TripUser from './tripUser';
import User from './user';

export default class Trip extends Model {
  static entity = 'trips';
  static eagerLoad = ['todos', 'shopping_list_items', 'trip_details', 'users', 'pack'];

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      description: this.string(''),
      owner_id: this.attr(null),
      pack_id: this.attr(null),
      starting_point: this.string(''),
      ending_point: this.string(''),

      // relationships
      pack: this.belongsTo(Pack, 'pack_id'),
      shopping_list_items: this.hasMany(ShoppingListItem, 'trip_id'),
      trip_details: this.hasMany(TripDetail, 'trip_id'),
      todos: this.hasMany(Todo, 'trip_id'),
      users: this.belongsToMany(User, TripUser, 'trip_id', 'user_id')
    };
  }
};
