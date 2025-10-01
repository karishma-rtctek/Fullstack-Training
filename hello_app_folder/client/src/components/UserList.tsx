import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/user");
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
