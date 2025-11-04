import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const checkBackendConnection = async () => {
  try {
    const response = await api.get('/api/test');
    return response.data;
  } catch (error) {
    console.error('Backend connection error:', error);
    throw error;
  }
};

// Todo endpoints
export const todoApi = {
  getTodos: () => api.get('/api/todos'),
  createTodo: (todo: { text: string }) => api.post('/api/todos', todo),
  updateTodo: (id: string, todo: { text?: string; completed?: boolean }) => 
    api.put(`/api/todos/${id}`, todo),
  deleteTodo: (id: string) => api.delete(`/api/todos/${id}`)
};

// Notes endpoints
export const notesApi = {
  getNotes: () => api.get('/api/notes'),
  createNote: (note: { title: string; content: string }) => 
    api.post('/api/notes', note),
  updateNote: (id: string, note: { title: string; content: string }) => 
    api.put(`/api/notes/${id}`, note),
  deleteNote: (id: string) => api.delete(`/api/notes/${id}`)
};

// Blog endpoints
export const blogApi = {
  getPosts: () => api.get('/api/blog'),
  createPost: (post: { title: string; content: string; author: string }) => 
    api.post('/api/blog', post),
  updatePost: (id: string, post: { title: string; content: string; author: string }) => 
    api.put(`/api/blog/${id}`, post),
  deletePost: (id: string) => api.delete(`/api/blog/${id}`)
};
