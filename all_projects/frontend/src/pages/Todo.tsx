import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { todoApi } from '../services/api';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Todo = () => {
  console.log('Accessing Todo component');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    todo: Todo | null;
    editText: string;
  }>({
    open: false,
    todo: null,
    editText: ''
  });

  // Load todos on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await todoApi.getTodos();
        setTodos(response.data);
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const response = await todoApi.createTodo({ text: newTodo.trim() });
        setTodos([...todos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Toggle todo completion
  const handleToggle = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        const response = await todoApi.updateTodo(id, { 
          completed: !todoToUpdate.completed 
        });
        setTodos(todos.map(todo =>
          todo.id === id ? response.data : todo
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const handleDelete = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Open edit dialog
  const handleEditOpen = (todo: Todo) => {
    setEditDialog({
      open: true,
      todo,
      editText: todo.text
    });
  };

  // Close edit dialog
  const handleEditClose = () => {
    setEditDialog({
      open: false,
      todo: null,
      editText: ''
    });
  };

  // Save edited todo
  const handleEditSave = async () => {
    if (editDialog.todo && editDialog.editText.trim()) {
      try {
        const response = await todoApi.updateTodo(editDialog.todo.id, {
          text: editDialog.editText.trim()
        });
        setTodos(todos.map(todo =>
          todo.id === editDialog.todo?.id ? response.data : todo
        ));
        handleEditClose();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Todo List
      </Typography>
      
      {/* Add Todo Form */}
      <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          margin="normal"
          label="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Todo
        </Button>
      </Box>

      {/* Loading State and Todo List */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                dense
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                  boxShadow: 1
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <ListItemText
                  primary={todo.text}
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary'
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleEditOpen(todo)}
                    sx={{ mr: 1 }}
                    disabled={todo.completed}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Dialog open={editDialog.open} onClose={handleEditClose}>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                value={editDialog.editText}
                onChange={(e) => setEditDialog(prev => ({ ...prev, editText: e.target.value }))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleEditSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>

          {todos.length === 0 && (
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center"
              sx={{ mt: 4 }}
            >
              No todos yet. Add one above!
            </Typography>
          )}
        </>
      )}


    </Container>
  );
};

export default Todo;
