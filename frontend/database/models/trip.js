import { Model } from '@vuex-orm/core';
import Pack from './pack';
import ShoppingListItem from './shoppingListItem';
import Todo from './todo';
import TripDetail from './tripDetail';
import TripUser from './tripUser';
import User from './user';

export default class Trip extends Model {
  static entity = 'trips';
  static eagerLoad = ['todos', 'shoppingListItems', 'tripDetails', 'users', 'pack'];

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
      shoppingListItems: this.hasMany(ShoppingListItem, 'trip_id'),
      tripDetails: this.hasMany(TripDetail, 'trip_id'),
      todos: this.hasMany(Todo, 'trip_id'),
      users: this.belongsToMany(User, TripUser, 'trip_id', 'user_id')
    };
  }

  static selectedTrip () {
    return this
      .query()
      .whereId(this.store().state.entities.trips.selectedTripId)
      .withAllRecursive()
      .first();
  }
};
