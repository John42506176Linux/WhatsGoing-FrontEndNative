/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
