import { useEffect, useState } from "react";
import type { Todo } from "./types";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api/todoApi";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import "./styles/todoApp.css";

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos); // .then = used to handle the promise returned by getTodos function
  }, []);

  const handleAdd = async (text: string) => {
    if (editingTodo) {
      // update mode

      // updateTodo() = put api call func, takes input text as body & will return response
      // await updateTodo = await is used here to let the put api call finish first and then only move to next line,
      // otherwise the next line would execute before the api call is completed, which would set wrong data in the UI
      // like if the apicall would have been done half then the partial data would have been shown in the UI
      // i.e. this await makes the code synchronous, by waiting for the api call to complete first
      const updated = await updateTodo({ ...editingTodo, text });

      // todos.map = it goes through each todo in the todos array and 
      // checks if the id of that todo text matches with the updated todo's text id
      // then it replaces that todo with the updated todo, otherwise it keeps the same todo
      // finally it returns a new array with the updated todo in place of the old one

      // bec map = always returns a new array with updated values
      setTodos(todos.map((t) => (t.id === updated.id ? updated : t))); 
      setEditingTodo(null); 
    } else {
      // add mode

      // addTodo() = post api call func, it takes input text as body and 
      // will return the newly created todo object (with id, text, done) as response
      // which we will store in newTodo variable
      // await is used here to let the post api call finish first and then only move to next line,
      const newTodo = await addTodo(text);    
      setTodos([...todos, newTodo]);
    }
  };

  const handleToggleDone = async (todo: Todo) => { // needs to mark the todo text as completed
    // done: !todo.done = toggles the done status, either in "active todo" or "completed todo"
    const updated = await updateTodo({ ...todo, done: !todo.done }); 
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id); // deleteTodo() = delete api call func, it takes id as parameter

    // filter() = it creates new array with all todo items 
    // who pass the test implemented by the provided func
    setTodos(todos.filter((t) => t.id !== id)); 
  };

  // it wil; just prepare the form for editing, no actual update api get called here
  // until the user clikks the "Update" button in the <TodoForm> component
  const handleEdit = (todo: Todo) => {  
    setEditingTodo(todo);
  };

  const activeTodos = todos.filter((t) => !t.done);
  const completedTodos = todos.filter((t) => t.done);

  return (
    <div className="app-container">
      <h1>✨ Todo App</h1>

      <TodoForm onAdd={handleAdd} editingTodo={editingTodo} />
      <div className="headingLeft">
        <h4>📌 Active Todos</h4>
        <TodoList
          todos={activeTodos}
          onToggle={handleToggleDone}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <button
        className="history-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide Completed" : "Show Completed"}
      </button>

      {showHistory && (
        <div className="history-list">
          <h4>✅ Completed Todos</h4>
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                <span style={{ color: "green" }}>✅ {todo.text}</span>
                <div>
                  <button className="textBlack" onClick={() => handleToggleDone(todo)}>
                    ↩️ Revert
                  </button>
                  <button className="textBlack" onClick={() => handleDelete(todo.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
