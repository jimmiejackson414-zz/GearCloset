import { Model } from '@vuex-orm/core';
// import Hike from './Hike';

export default class Todo extends Model {
  static entity = 'todos';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      checked: this.boolean(false),
      hike_id: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null)

      // relationships
      // hike: this.belongsTo(Hike, 'hike_id')
    };
  }
}
