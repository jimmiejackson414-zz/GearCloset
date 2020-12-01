import { Model } from '@vuex-orm/core';
import ForumComment from './forumComment';
import ForumSubcategory from './forumSubcategory';
import User from './user';

export default class ForumPost extends Model {
  static entity = 'forumPosts';

  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      forum_subcategory_id: this.attr(null),
      user_id: this.attr(null),
      pinned: this.boolean(false),
      slug: this.string(''),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      commentCount: this.number(0),

      // relationships
      author: this.belongsTo(User, 'user_id'),
      comments: this.hasMany(ForumComment, 'forum_post_id'),
      subcategory: this.belongsTo(ForumSubcategory, 'forum_subcategory_id')
    };
  }
}
