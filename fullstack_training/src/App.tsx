import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return; // do 2 things, trims the entered text & checks if it's empty
    setTodos([...todos, { id: Date.now(), text: input }]); // id: Date.now() = quick way to generate a unique id based on the current timestamp
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(index => index.id !== id));
  };

  // ✅ All styles in one object
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: 500,
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      padding: "12px",
      fontSize: "16px",
      width: "calc(70% - 20px)",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    addButton: {
      padding: "12px 20px",
      fontSize: "16px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    inputContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    list: {
      listStyle: "none",
      padding: 0,
      marginTop: "2rem",
    },
    listItem: {
      margin: "12px 0",
      padding: "12px",
      border: "1px solid #eee",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
    },
    removeButton: {
      padding: "8px 12px",
      fontSize: "14px",
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#333" }}>Todo App</h2>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button style={styles.addButton} onClick={addTodo}>Add</button>
      </div>
      <ul style={styles.list}>
        {todos.map(index => (
          <li key={index.id} style={styles.listItem}>
            <span>{index.text}</span>
            <button onClick={() => removeTodo(index.id)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
