import { Database } from '@vuex-orm/core';

// Import models
import Category from './models/category';
import CategoryItem from './models/categoryItem';
import ForumCategory from './models/forumCategory';
import ForumComment from './models/forumComment';
import ForumPost from './models/forumPost';
import ForumSubcategory from './models/forumSubcategory';
import FriendUser from './models/friendUser';
import Item from './models/item';
import Notification from './models/notification';
import Pack from './models/pack';
import ShoppingListItem from './models/shoppingListItem';
import Todo from './models/todo';
import Trip from './models/trip';
import TripDetail from './models/tripDetail';
import TripUser from './models/tripUser';
import User from './models/user';

// Import Vuex modules
import * as categories from '~/database/categories';
import * as forumCategories from '~/database/forumCategories';
import * as forumPosts from '~/database/forumPosts';
import * as forumSubcategories from '~/database/forumSubcategories';
import * as items from '~/database/items';
import * as notifications from '~/database/notifications';
import * as packs from '~/database/packs';
import * as shoppingListItems from '~/database/shoppingListItems';
import * as todos from '~/database/todos';
import * as tripDetails from '~/database/tripDetails';
import * as trips from '~/database/trips';
import * as users from '~/database/users';

// Register VuexORM databases
const database = new Database();
database.register(Category, categories);
database.register(CategoryItem, {});
database.register(ForumCategory, forumCategories);
database.register(ForumComment, {});
database.register(ForumPost, forumPosts);
database.register(ForumSubcategory, forumSubcategories);
database.register(FriendUser, {});
database.register(Item, items);
database.register(Notification, notifications);
database.register(Pack, packs);
database.register(ShoppingListItem, shoppingListItems);
database.register(Todo, todos);
database.register(Trip, trips);
database.register(TripDetail, tripDetails);
database.register(TripUser, {});
database.register(User, users);

export default database;
