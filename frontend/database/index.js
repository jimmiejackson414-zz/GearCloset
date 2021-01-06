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
import * as users from '~/database/users';
import * as trips from '~/database/trips';

// Register VuexORM databases
const database = new Database();
database.register(Category, {});
database.register(CategoryItem, {});
database.register(ForumCategory, {});
database.register(ForumComment, {});
database.register(ForumPost, {});
database.register(ForumSubcategory, {});
database.register(FriendUser, {});
database.register(Item, {});
database.register(Notification, {});
database.register(Pack, {});
database.register(ShoppingListItem, {});
database.register(Todo, {});
database.register(Trip, trips);
database.register(TripDetail, {});
database.register(TripUser, {});
database.register(User, users);

export default database;
