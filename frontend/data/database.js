import { Database } from '@vuex-orm/core';

// import models
import Category from '~/data/models/category';
import CategoryItem from '~/data/models/categoryItem';
import FriendUser from '~/data/models/friendUser';
import Item from '~/data/models/item';
import Notification from '~/data/models/notification';
import Pack from '~/data/models/pack';
import ShoppingListItem from '~/data/models/shoppingListItem';
import Todo from '~/data/models/todo';
import Trip from '~/data/models/trip';
import TripDetail from '~/data/models/tripDetail';
import TripUser from '~/data/models/tripUser';
import User from '~/data/models/user';

const database = new Database();
database.register(Category, {});
database.register(CategoryItem, {});
database.register(FriendUser, {});
database.register(Item, {});
database.register(Notification, {});
database.register(Pack, {});
database.register(ShoppingListItem, {});
database.register(Todo, {});
database.register(Trip, {});
database.register(TripDetail, {});
database.register(TripUser, {});
database.register(User, {});

export default database;
