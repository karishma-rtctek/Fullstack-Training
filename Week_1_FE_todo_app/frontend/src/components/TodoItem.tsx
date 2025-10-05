import type { Todo } from "../types";

interface Props {
  todo: Todo;  // Todo = contains (id, text, done)
  onToggle: (todo: Todo) => void; // needs to mark the todo text as completed
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

// TodoItem.tsx = only responsible for rendering a single todo item component with its buttons
// these props are coming from parent component (TodoList.tsx)

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => (
  <li>
    <span style={{ cursor: "pointer" }} onClick={() => onToggle(todo)}>
      {todo.text}
    </span>
    <div>

      {/* Delete = needs only "id" (as an identifier)
      Edit = needs full object 
      bec. when editing, we usually want to pre-fill the form with the todo’s current text.
      For that, we need the whole object (id, text, done) */}
      <button onClick={() => onEdit(todo)}>✏️</button>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </div>
  </li>
);
