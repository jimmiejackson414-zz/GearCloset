import { Model } from '@vuex-orm/core';
import Trip from './trip';

export default class TripDetail extends Model {
  static entity = 'trip_details';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      url: this.string(''),
      value: this.string(''),
      type: this.string(''),
      trip_id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships
      trip: this.belongsTo(Trip, 'trip_id')
    };
  }
};
