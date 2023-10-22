/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null,
  event_date: string,
  event_link: string,
  event_title: string,
  event_location: string,
  is_local: boolean,
  is_tweet_event: boolean,
  is_in_state: boolean,
  is_event_date_available: boolean,
  url: string,
  source: string,
  retweet_count?: number | null,
  favorite_count?: number | null,
  reply_count?: number | null,
  twitter_id?: string | null,
  is_going: boolean,
};

export type ModelEventConditionInput = {
  event_date?: ModelStringInput | null,
  event_link?: ModelStringInput | null,
  event_title?: ModelStringInput | null,
  event_location?: ModelStringInput | null,
  is_local?: ModelBooleanInput | null,
  is_tweet_event?: ModelBooleanInput | null,
  is_in_state?: ModelBooleanInput | null,
  is_event_date_available?: ModelBooleanInput | null,
  url?: ModelStringInput | null,
  source?: ModelStringInput | null,
  retweet_count?: ModelIntInput | null,
  favorite_count?: ModelIntInput | null,
  reply_count?: ModelIntInput | null,
  twitter_id?: ModelStringInput | null,
  is_going?: ModelBooleanInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Event = {
  __typename: "Event",
  id: string,
  event_date: string,
  event_link: string,
  event_title: string,
  event_location: string,
  is_local: boolean,
  is_tweet_event: boolean,
  is_in_state: boolean,
  is_event_date_available: boolean,
  url: string,
  source: string,
  retweet_count?: number | null,
  favorite_count?: number | null,
  reply_count?: number | null,
  twitter_id?: string | null,
  is_going: boolean,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateEventInput = {
  id: string,
  event_date?: string | null,
  event_link?: string | null,
  event_title?: string | null,
  event_location?: string | null,
  is_local?: boolean | null,
  is_tweet_event?: boolean | null,
  is_in_state?: boolean | null,
  is_event_date_available?: boolean | null,
  url?: string | null,
  source?: string | null,
  retweet_count?: number | null,
  favorite_count?: number | null,
  reply_count?: number | null,
  twitter_id?: string | null,
  is_going?: boolean | null,
};

export type DeleteEventInput = {
  id: string,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  event_date?: ModelStringInput | null,
  event_link?: ModelStringInput | null,
  event_title?: ModelStringInput | null,
  event_location?: ModelStringInput | null,
  is_local?: ModelBooleanInput | null,
  is_tweet_event?: ModelBooleanInput | null,
  is_in_state?: ModelBooleanInput | null,
  is_event_date_available?: ModelBooleanInput | null,
  url?: ModelStringInput | null,
  source?: ModelStringInput | null,
  retweet_count?: ModelIntInput | null,
  favorite_count?: ModelIntInput | null,
  reply_count?: ModelIntInput | null,
  twitter_id?: ModelStringInput | null,
  is_going?: ModelBooleanInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  event_date?: ModelSubscriptionStringInput | null,
  event_link?: ModelSubscriptionStringInput | null,
  event_title?: ModelSubscriptionStringInput | null,
  event_location?: ModelSubscriptionStringInput | null,
  is_local?: ModelSubscriptionBooleanInput | null,
  is_tweet_event?: ModelSubscriptionBooleanInput | null,
  is_in_state?: ModelSubscriptionBooleanInput | null,
  is_event_date_available?: ModelSubscriptionBooleanInput | null,
  url?: ModelSubscriptionStringInput | null,
  source?: ModelSubscriptionStringInput | null,
  retweet_count?: ModelSubscriptionIntInput | null,
  favorite_count?: ModelSubscriptionIntInput | null,
  reply_count?: ModelSubscriptionIntInput | null,
  twitter_id?: ModelSubscriptionStringInput | null,
  is_going?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionEventFilterInput | null > | null,
  or?: Array< ModelSubscriptionEventFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      event_date: string,
      event_link: string,
      event_title: string,
      event_location: string,
      is_local: boolean,
      is_tweet_event: boolean,
      is_in_state: boolean,
      is_event_date_available: boolean,
      url: string,
      source: string,
      retweet_count?: number | null,
      favorite_count?: number | null,
      reply_count?: number | null,
      twitter_id?: string | null,
      is_going: boolean,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    event_date: string,
    event_link: string,
    event_title: string,
    event_location: string,
    is_local: boolean,
    is_tweet_event: boolean,
    is_in_state: boolean,
    is_event_date_available: boolean,
    url: string,
    source: string,
    retweet_count?: number | null,
    favorite_count?: number | null,
    reply_count?: number | null,
    twitter_id?: string | null,
    is_going: boolean,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
