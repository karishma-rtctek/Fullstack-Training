import { useState, useEffect } from "react";
import type { Todo } from "../types";

// onAdd = func coming as prop from parent component (App.tsx)
// this func will contain string as parameter and will not return anything (void)
// editingTodo = optional prop (can be null or undefined)
// editingtodo either contain a todo object (which is being edited currently) or 
// it can be null (when no todo is being edited currently)

interface Props {
  onAdd: (text: string) => void; 
  editingTodo?: Todo | null;  // ? = it means this value can be null or undefined
}

export const TodoForm = ({ onAdd, editingTodo }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    }
  }, [editingTodo]);


// e: React.FormEvent = if this was not used, then typescript would have 
// thrown an error as "e" would be of type "any" which is not safe to use
// preventDefault() = it prevents the default behaviour of the <form> (which is to refresh the page)

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    if (!text.trim()) return; // this is used to avoid adding empty spaces as todo
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={editingTodo ? "Update todo..." : "Add a new todo"}
      />
      <button type="submit">{editingTodo ? "Update" : "Add"}</button>
    </form>
  );
};
