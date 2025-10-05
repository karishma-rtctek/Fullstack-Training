import { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote, getUsers } from '../api/notes_and_user_api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', userId: '' });
  const [editId, setEditId] = useState(null);

  // Load all notes and users
  useEffect(() => {
    getNotes().then(res => setNotes(res.data));
    getUsers().then(res => setUsers(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create or update note
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId
      ? updateNote(editId, form)
      : createNote(form);

    action
      .then(() => {
        alert(editId ? 'Note Updated' : 'Note Created');
        setForm({ title: '', content: '', userId: '' });
        setEditId(null);
        return getNotes();
      })
      .then(res => setNotes(res.data))
      .catch(console.error);
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setForm({ title: note.title, content: note.content, userId: note.userId });
  };

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => getNotes())
      .then(res => setNotes(res.data))
      .catch(console.error);
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>📝 Notes</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="content" placeholder="Content" value={form.content} onChange={handleChange} />
        <select name="userId" value={form.userId} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <button type="submit">{editId ? 'Update' : 'Add'} Note</button>
      </form>

      <ul>
        {notes.map(n => (
          <li key={n.id}>
            <strong>{n.title}</strong> - {n.content} (User ID: {n.userId})
            <button onClick={() => handleEdit(n)}>Edit</button>
            <button onClick={() => handleDelete(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
