import { Model } from '@vuex-orm/core';
// import Hike from './Hike';

export default class TripDetail extends Model {
  static entity = 'trip_details';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      url: this.string(''),
      url_title: this.string(''),
      hike_id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null)

      // relationships
      // hike: this.belongsTo(Hike, 'hike_id')
    };
  }
}
