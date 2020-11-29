import { Model } from '@vuex-orm/core';
import Trip from './trip';

export default class Todo extends Model {
  static entity = 'todos';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      checked: this.boolean(false),
      trip_id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships
      trip: this.belongsTo(Trip, 'trip_id')
    };
  }
}
