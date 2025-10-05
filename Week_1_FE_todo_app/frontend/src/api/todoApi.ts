import type { Todo } from "../types";

// todoApis.ts = this file uses the funcs which make the actual API calls to backend server
// BASE_URL = the base url of the backend server, where all the todo related endpoints are present

const BASE_URL = "http://localhost:5000/todos";

// Promise<Todo[]> = "Promise" is used as it instantly returns the promise value (success or error)
export const getTodos = async (): Promise<Todo[]> => {  
  const res = await fetch(BASE_URL);
  return res.json(); // the request from frontend goes into string format (i.e. why we must use stringfy) and 
  // the response from backend also comes into string but it gets converted into json for frontend's ease
};

export const addTodo = async (text: string): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },     // used to tell server about what type of data is being sent
    body: JSON.stringify({ text }),
  });
  return res.json();    
};

export const updateTodo = async (todo: Todo): Promise<Todo> => { 
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
