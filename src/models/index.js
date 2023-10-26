// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Event, User, Category } = initSchema(schema);

export {
  Event,
  User,
  Category
};