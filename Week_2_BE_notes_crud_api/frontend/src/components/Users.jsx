import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../api/notes_and_user_api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  // Load all users
  useEffect(() => {
    getUsers().then(res => setUsers(res.data)).catch(console.error);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create user
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(form)
      .then(() => {
        alert('User Created');
        setForm({ name: '', email: '' });
        return getUsers();
      })
      .then(res => setUsers(res.data))
      .catch(console.error);
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>👤 Users</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}
