import { useState } from 'react';
import Users from '../components/Users';
import Notes from '../components/Notes';

export default function Home() {
  const [view, setView] = useState('users');

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>🗂 Notes + Users App</h1>
      <div>
        <button onClick={() => setView('users')}>Users</button>
        <button onClick={() => setView('notes')}>Notes</button>
      </div>
      {view === 'users' ? <Users /> : <Notes />}
    </div>
  );
}
