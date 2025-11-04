import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    post: BlogPost | null;
    editTitle: string;
    editContent: string;
    editAuthor: string;
  }>({
    open: false,
    post: null,
    editTitle: '',
    editContent: '',
    editAuthor: ''
  });

  // Add new post
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim() && newPost.author.trim()) {
      const post: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        author: newPost.author.trim(),
        createdAt: new Date()
      };
      setPosts([post, ...posts]); // Add new post at the beginning
      setNewPost({ title: '', content: '', author: '' });
    }
  };

  // Delete post
  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Open edit dialog
  const handleEditOpen = (post: BlogPost) => {
    setEditDialog({
      open: true,
      post,
      editTitle: post.title,
      editContent: post.content,
      editAuthor: post.author
    });
  };

  // Close edit dialog
  const handleEditClose = () => {
    setEditDialog({
      open: false,
      post: null,
      editTitle: '',
      editContent: '',
      editAuthor: ''
    });
  };

  // Save edited post
  const handleEditSave = () => {
    if (editDialog.post && editDialog.editTitle.trim() && editDialog.editContent.trim() && editDialog.editAuthor.trim()) {
      setPosts(posts.map(post =>
        post.id === editDialog.post?.id
          ? {
              ...post,
              title: editDialog.editTitle.trim(),
              content: editDialog.editContent.trim(),
              author: editDialog.editAuthor.trim()
            }
          : post
      ));
      handleEditClose();
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Blog Posts
      </Typography>

      {/* Add Post Form */}
      <Card sx={{ mb: 4 }}>
        <Box component="form" onSubmit={handleAddPost}>
          <CardContent>
            <TextField
              fullWidth
              label="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Author Name"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              margin="normal"
              placeholder="Your name"
            />
          </CardContent>
          <CardActions>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={!newPost.title.trim() || !newPost.content.trim()}
            >
              Publish Post
            </Button>
          </CardActions>
        </Box>
      </Card>

      {/* Blog Posts */}
      <Stack spacing={3}>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {post.title}
              </Typography>
              
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Written by: {post.author}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography 
                variant="body1" 
                sx={{
                  whiteSpace: 'pre-wrap'
                }}
              >
                {post.content}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleEditOpen(post)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialog.open} 
        onClose={handleEditClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Blog Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editDialog.editTitle}
            onChange={(e) => setEditDialog(prev => ({ ...prev, editTitle: e.target.value }))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            value={editDialog.editContent}
            onChange={(e) => setEditDialog(prev => ({ ...prev, editContent: e.target.value }))}
            margin="normal"
            multiline
            rows={6}
          />
          <TextField
            fullWidth
            label="Author Name"
            value={editDialog.editAuthor}
            onChange={(e) => setEditDialog(prev => ({ ...prev, editAuthor: e.target.value }))}
            margin="normal"
            placeholder="Your name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button 
            onClick={handleEditSave} 
            variant="contained"
            disabled={!editDialog.editTitle.trim() || !editDialog.editContent.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Empty state */}
      {posts.length === 0 && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center"
          sx={{ mt: 4 }}
        >
          No blog posts yet. Write your first post above!
        </Typography>
      )}
    </Container>
  );
};

export default Blog;
