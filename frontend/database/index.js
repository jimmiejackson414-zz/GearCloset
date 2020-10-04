import { Database } from '@vuex-orm/core';
import Category from '~/models/Category';
import CategoryItem from '~/models/CategoryItem';
import Hike from '~/models/Hike';
import Item from '~/models/Item';
import Pack from '~/models/Pack';
import ShoppingListItem from '~/models/ShoppingListItem';
import Todo from '~/models/Todo';
import TripDetail from '~/models/TripDetail';
import User from '~/models/User';

const database = new Database();

database.register(Category);
database.register(CategoryItem);
database.register(Hike);
database.register(Item);
database.register(Pack);
database.register(ShoppingListItem);
database.register(Todo);
database.register(TripDetail);
database.register(User);

export default database;
