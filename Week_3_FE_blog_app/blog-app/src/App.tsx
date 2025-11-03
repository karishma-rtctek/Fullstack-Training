import { useState } from 'react';
import type { BlogPost, BlogFormData } from './interfaces/BlogInterfaces';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreatePost = (data: BlogFormData) => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
    setIsFormVisible(false);
  };

  const handleUpdatePost = (data: BlogFormData) => {
    if (!editingPost) return;

    const updatedPost: BlogPost = {
      ...editingPost,
      ...data,
      updatedAt: new Date().toISOString()
    };

    setPosts(posts.map(post => 
      post.id === editingPost.id ? updatedPost : post
    ));
    setEditingPost(null);
    setIsFormVisible(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormVisible(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Blog App</h1>
        <button onClick={() => setIsFormVisible(true)}>Create New Post</button>
      </header>
      <main className="app-main">
        {isFormVisible ? (
          <BlogForm
            post={editingPost || undefined}
            onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
            onCancel={() => {
              setIsFormVisible(false);
              setEditingPost(null);
            }}
          />
        ) : (
          <BlogList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        )}
      </main>
    </div>
  );
}

export default App;
