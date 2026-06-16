// apps/web/src/graphql/todo.operations.ts
import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos(
    $filter: TodoFilter
    $paging: CursorPaging
    $sorting: [TodoSort!]
  ) {
    getTodos(filter: $filter, paging: $paging, sorting: $sorting) {
      totalCount
      edges {
        cursor
        node {
          id
          text
          isChecked
          status
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Part 07: userId removed from CreateTodoInput (injected from JWT instead)
export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      text
      isChecked
      status
      createdAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      isChecked
      status
      updatedAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;
