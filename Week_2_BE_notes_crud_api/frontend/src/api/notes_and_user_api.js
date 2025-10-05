import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// get & create "users" in backend
export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const createUser = (data) => axios.post(`${BASE_URL}/users`, data);

// get, post, put & delete "notes" in backend
export const getNotes = () => axios.get(`${BASE_URL}/notes`);
export const createNote = (data) => axios.post(`${BASE_URL}/notes`, data);
export const updateNote = (id, data) => axios.put(`${BASE_URL}/notes/${id}`, data);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/notes/${id}`);
