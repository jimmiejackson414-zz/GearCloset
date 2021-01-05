import { Model } from '@vuex-orm/core';
import ForumSubcategory from './forumSubcategory';

export default class ForumCategory extends Model {
  static entity = 'forumCategories';

  static eagerLoad = ['forumSubcategories'];

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      description: this.string(''),
      slug: this.string(''),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships
      subcategories: this.hasMany(ForumSubcategory, 'forum_category_id')
    };
  }
}
