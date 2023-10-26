import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerEvent = {
  readonly id: string;
  readonly event_date: string;
  readonly event_link: string;
  readonly event_title: string;
  readonly event_location: string;
  readonly is_local: boolean;
  readonly is_tweet_event: boolean;
  readonly is_in_state: boolean;
  readonly is_event_date_available: boolean;
  readonly url: string;
  readonly source: string;
  readonly retweet_count?: number | null;
  readonly favorite_count?: number | null;
  readonly reply_count?: number | null;
  readonly twitter_id?: string | null;
  readonly is_going?: boolean | null;
  readonly saved_event_date: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly id: string;
  readonly event_date: string;
  readonly event_link: string;
  readonly event_title: string;
  readonly event_location: string;
  readonly is_local: boolean;
  readonly is_tweet_event: boolean;
  readonly is_in_state: boolean;
  readonly is_event_date_available: boolean;
  readonly url: string;
  readonly source: string;
  readonly retweet_count?: number | null;
  readonly favorite_count?: number | null;
  readonly reply_count?: number | null;
  readonly twitter_id?: string | null;
  readonly is_going?: boolean | null;
  readonly saved_event_date: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event, EventMetaData>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}

type EagerUser = {
  readonly id: string;
  readonly categories?: (Category | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly categories: AsyncCollection<Category>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerCategory = {
  readonly id: string;
  readonly name: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCategoriesId?: string | null;
}

type LazyCategory = {
  readonly id: string;
  readonly name: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCategoriesId?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category, CategoryMetaData>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}