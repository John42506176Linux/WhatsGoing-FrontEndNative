/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      event_date
      event_link
      event_title
      event_location
      is_local
      is_tweet_event
      is_in_state
      is_event_date_available
      url
      source
      retweet_count
      favorite_count
      reply_count
      twitter_id
      is_going
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      event_date
      event_link
      event_title
      event_location
      is_local
      is_tweet_event
      is_in_state
      is_event_date_available
      url
      source
      retweet_count
      favorite_count
      reply_count
      twitter_id
      is_going
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      event_date
      event_link
      event_title
      event_location
      is_local
      is_tweet_event
      is_in_state
      is_event_date_available
      url
      source
      retweet_count
      favorite_count
      reply_count
      twitter_id
      is_going
      createdAt
      updatedAt
    }
  }
`;
