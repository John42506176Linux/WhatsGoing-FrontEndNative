/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
      saved_event_date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        saved_event_date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        saved_event_date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
