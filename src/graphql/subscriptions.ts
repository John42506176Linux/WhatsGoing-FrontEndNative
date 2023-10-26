/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onCreateEvent(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onUpdateEvent(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onDeleteEvent(filter: $filter, owner: $owner) {
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
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      categories {
        items {
          id
          name
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCategoriesId
        }
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      categories {
        items {
          id
          name
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCategoriesId
        }
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      categories {
        items {
          id
          name
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userCategoriesId
        }
        nextToken
        startedAt
      }
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onCreateCategory(filter: $filter, owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCategoriesId
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onUpdateCategory(filter: $filter, owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCategoriesId
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory(
    $filter: ModelSubscriptionCategoryFilterInput
    $owner: String
  ) {
    onDeleteCategory(filter: $filter, owner: $owner) {
      id
      name
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userCategoriesId
    }
  }
`;
