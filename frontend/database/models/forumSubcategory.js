import { Model } from '@vuex-orm/core';
import ForumCategory from './forumCategory';
import ForumPost from './forumPost';

export default class ForumSubcategory extends Model {
  static entity = 'forumSubcategories';

  static eagerLoad = ['posts'];

  static fields () {
    return {
      id: this.attr(null),
      forum_category_id: this.attr(null),
      slug: this.string(''),
      title: this.string(''),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      postCount: this.number(0),

      // relationships
      category: this.belongsTo(ForumCategory, 'forum_category_id'),
      posts: this.hasMany(ForumPost, 'forum_subcategory_id')
    };
  }
}
