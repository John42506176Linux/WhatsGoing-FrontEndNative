import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type EventMetaData = {
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event, EventMetaData>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}