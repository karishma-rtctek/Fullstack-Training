import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

// TodoList.tsx = list of todo items component, responsonible for rendering the list of multiple todo items components
// these props are coming from parent component (App.tsx)
export const TodoList = ({ todos, onToggle, onDelete, onEdit }: Props) => ( 
  <ul>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </ul>
);
