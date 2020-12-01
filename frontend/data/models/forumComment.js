import { Model } from '@vuex-orm/core';
import ForumPost from './forumPost';
import User from './user';

export default class ForumComment extends Model {
  static entity = 'forumComments';

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      forum_post_id: this.attr(null),
      text: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),

      // relationships
      post: this.belongsTo(ForumPost, 'forum_post_id'),
      author: this.belongsTo(User, 'user_id')
    };
  }
}
