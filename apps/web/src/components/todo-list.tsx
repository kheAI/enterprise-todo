// apps/web/src/components/todo-list.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../graphql/todo.operations';

export function TodoList() {
  const [newTodoText, setNewTodoText] = useState('');

  // Fetch todos with Apollo useQuery
  // Meteor equivalent: useTracker(() => TasksCollection.find().fetch())
  const { data, loading, error } = useQuery(GET_TODOS, {
    variables: {
      filter: { status: { eq: 'ACTIVE' } },
      sorting: [{ field: 'createdAt', direction: 'DESC' }],
      paging: { first: 20 },
    },
    fetchPolicy: 'cache-and-network',
  });

  // Create mutation
  // Meteor equivalent: Meteor.callAsync('createTask', text)
  const [createTodo, { loading: creating }] = useMutation(CREATE_TODO, {
    refetchQueries: ['GetTodos'], // refetch all active GetTodos queries after mutation
    onError: (err) => console.error('Create failed:', err.message),
  });

  // Toggle completion
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: ['GetTodos'],
  });

  // Delete
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: ['GetTodos'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    // Part 07: userId comes from JWT — hardcoded to 1 for Part 06 demo
    await createTodo({
      variables: { input: { text: newTodoText.trim(), userId: 1 } },
    });
    setNewTodoText('');
  };

  const handleToggle = async (id: number, isChecked: boolean) => {
    await updateTodo({ variables: { id, input: { isChecked: !isChecked } } });
  };

  const handleDelete = async (id: number) => {
    await deleteTodo({ variables: { id } });
  };

  const todos = data?.getTodos?.edges?.map((edge: any) => edge.node) ?? [];
  const totalCount = data?.getTodos?.totalCount ?? 0;

  if (loading && !data)
    return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error: {error.message}</div>
    );

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Enterprise Todo
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          {totalCount} todo{totalCount !== 1 ? 's' : ''}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add new todo form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            disabled={creating}
            className="flex-1"
          />
          <Button type="submit" disabled={creating || !newTodoText.trim()}>
            {creating ? 'Adding...' : 'Add'}
          </Button>
        </form>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No todos yet. Add one above.
            </p>
          )}

          {todos.map((todo: any) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
            >
              {/* Checkbox — toggles isChecked via mutation */}
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.isChecked}
                onCheckedChange={() => handleToggle(todo.id, todo.isChecked)}
              />

              {/* Todo text */}
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 text-sm cursor-pointer ${
                  todo.isChecked ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {todo.text}
              </label>

              {/* Status badge */}
              <Badge variant={todo.isChecked ? 'secondary' : 'default'}>
                {todo.isChecked ? 'Done' : 'Active'}
              </Badge>

              {/* Delete button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(todo.id)}
                className="text-destructive hover:text-destructive"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
