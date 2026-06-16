/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ConnectionCursor: { input: unknown; output: unknown; }
  DateTime: { input: unknown; output: unknown; }
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateTodoInput = {
  text: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int']['input'];
  upper: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['Boolean']['output'];
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTodoInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getTodos: TodoConnection;
  health: Scalars['String']['output'];
  todo?: Maybe<Todo>;
};


export type QueryGetTodosArgs = {
  filter?: TodoFilter;
  paging?: CursorPaging;
  sorting?: Array<TodoSort>;
};


export type QueryTodoArgs = {
  id: Scalars['Int']['input'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  status: TodoStatus;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoConnection = {
  __typename?: 'TodoConnection';
  /** Array of edges. */
  edges: Array<TodoEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TodoEdge = {
  __typename?: 'TodoEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Todo */
  node: Todo;
};

export type TodoFilter = {
  and?: InputMaybe<Array<TodoFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IntFieldComparison>;
  isChecked?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<TodoFilter>>;
  status?: InputMaybe<TodoStatusFilterComparison>;
  text?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type TodoSort = {
  direction: SortDirection;
  field: TodoSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TodoSortFields {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsChecked = 'isChecked',
  Status = 'status',
  Text = 'text',
  UpdatedAt = 'updatedAt'
}

export enum TodoStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export type TodoStatusFilterComparison = {
  eq?: InputMaybe<TodoStatus>;
  gt?: InputMaybe<TodoStatus>;
  gte?: InputMaybe<TodoStatus>;
  iLike?: InputMaybe<TodoStatus>;
  in?: InputMaybe<Array<TodoStatus>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<TodoStatus>;
  lt?: InputMaybe<TodoStatus>;
  lte?: InputMaybe<TodoStatus>;
  neq?: InputMaybe<TodoStatus>;
  notILike?: InputMaybe<TodoStatus>;
  notIn?: InputMaybe<Array<TodoStatus>>;
  notLike?: InputMaybe<TodoStatus>;
};

export type UpdateTodoInput = {
  isChecked?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<TodoStatus>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type BooleanFieldComparison = {
  is?: boolean | null | undefined;
  isNot?: boolean | null | undefined;
};

export type CreateTodoInput = {
  text: string;
  userId: number;
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: unknown;
  /** Paginate before opaque cursor */
  before?: unknown;
  /** Paginate first */
  first?: number | null | undefined;
  /** Paginate last */
  last?: number | null | undefined;
};

export type DateFieldComparison = {
  between?: DateFieldComparisonBetween | null | undefined;
  eq?: unknown;
  gt?: unknown;
  gte?: unknown;
  in?: Array<unknown> | null | undefined;
  is?: boolean | null | undefined;
  isNot?: boolean | null | undefined;
  lt?: unknown;
  lte?: unknown;
  neq?: unknown;
  notBetween?: DateFieldComparisonBetween | null | undefined;
  notIn?: Array<unknown> | null | undefined;
};

export type DateFieldComparisonBetween = {
  lower: unknown;
  upper: unknown;
};

export type IntFieldComparison = {
  between?: IntFieldComparisonBetween | null | undefined;
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number> | null | undefined;
  is?: boolean | null | undefined;
  isNot?: boolean | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
  notBetween?: IntFieldComparisonBetween | null | undefined;
  notIn?: Array<number> | null | undefined;
};

export type IntFieldComparisonBetween = {
  lower: number;
  upper: number;
};

/** Sort Directions */
export type SortDirection =
  | 'ASC'
  | 'DESC';

/** Sort Nulls Options */
export type SortNulls =
  | 'NULLS_FIRST'
  | 'NULLS_LAST';

export type StringFieldComparison = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  iLike?: string | null | undefined;
  in?: Array<string> | null | undefined;
  is?: boolean | null | undefined;
  isNot?: boolean | null | undefined;
  like?: string | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  notILike?: string | null | undefined;
  notIn?: Array<string> | null | undefined;
  notLike?: string | null | undefined;
};

export type TodoFilter = {
  and?: Array<TodoFilter> | null | undefined;
  createdAt?: DateFieldComparison | null | undefined;
  id?: IntFieldComparison | null | undefined;
  isChecked?: BooleanFieldComparison | null | undefined;
  or?: Array<TodoFilter> | null | undefined;
  status?: TodoStatusFilterComparison | null | undefined;
  text?: StringFieldComparison | null | undefined;
  updatedAt?: DateFieldComparison | null | undefined;
};

export type TodoSort = {
  direction: SortDirection;
  field: TodoSortFields;
  nulls?: SortNulls | null | undefined;
};

export type TodoSortFields =
  | 'createdAt'
  | 'id'
  | 'isChecked'
  | 'status'
  | 'text'
  | 'updatedAt';

export type TodoStatus =
  | 'ACTIVE'
  | 'ARCHIVED';

export type TodoStatusFilterComparison = {
  eq?: TodoStatus | null | undefined;
  gt?: TodoStatus | null | undefined;
  gte?: TodoStatus | null | undefined;
  iLike?: TodoStatus | null | undefined;
  in?: Array<TodoStatus> | null | undefined;
  is?: boolean | null | undefined;
  isNot?: boolean | null | undefined;
  like?: TodoStatus | null | undefined;
  lt?: TodoStatus | null | undefined;
  lte?: TodoStatus | null | undefined;
  neq?: TodoStatus | null | undefined;
  notILike?: TodoStatus | null | undefined;
  notIn?: Array<TodoStatus> | null | undefined;
  notLike?: TodoStatus | null | undefined;
};

export type UpdateTodoInput = {
  isChecked?: boolean | null | undefined;
  status?: TodoStatus | null | undefined;
  text?: string | null | undefined;
};

export type GetTodosQueryVariables = Exact<{
  filter?: TodoFilter | null | undefined;
  paging?: CursorPaging | null | undefined;
  sorting?: Array<TodoSort> | TodoSort | null | undefined;
}>;


export type GetTodosQuery = { getTodos: { totalCount: number, edges: Array<{ cursor: unknown, node: { id: number, text: string, isChecked: boolean, status: TodoStatus, createdAt: unknown } }>, pageInfo: { hasNextPage: boolean | null, endCursor: unknown } } };

export type CreateTodoMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type CreateTodoMutation = { createTodo: { id: number, text: string, isChecked: boolean, status: TodoStatus, createdAt: unknown } };

export type UpdateTodoMutationVariables = Exact<{
  id: number;
  input: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { updateTodo: { id: number, text: string, isChecked: boolean, status: TodoStatus, updatedAt: unknown } };

export type DeleteTodoMutationVariables = Exact<{
  id: number;
}>;


export type DeleteTodoMutation = { deleteTodo: boolean };


export const GetTodosDocument = gql`
    query GetTodos($filter: TodoFilter, $paging: CursorPaging, $sorting: [TodoSort!]) {
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

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      paging: // value for 'paging'
 *      sorting: // value for 'sorting'
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
// @ts-ignore
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>): Apollo.UseSuspenseQueryResult<GetTodosQuery, GetTodosQueryVariables>;
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>): Apollo.UseSuspenseQueryResult<GetTodosQuery | undefined, GetTodosQueryVariables>;
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosSuspenseQueryHookResult = ReturnType<typeof useGetTodosSuspenseQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export const CreateTodoDocument = gql`
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
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const UpdateTodoDocument = gql`
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
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: Int!) {
  deleteTodo(id: $id)
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;