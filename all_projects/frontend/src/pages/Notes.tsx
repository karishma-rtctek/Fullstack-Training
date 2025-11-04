import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    note: Note | null;
    editTitle: string;
    editContent: string;
  }>({
    open: false,
    note: null,
    editTitle: '',
    editContent: ''
  });

  // Add new note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        createdAt: new Date()
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
    }
  };

  // Delete note
  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Open edit dialog
  const handleEditOpen = (note: Note) => {
    setEditDialog({
      open: true,
      note,
      editTitle: note.title,
      editContent: note.content
    });
  };

  // Close edit dialog
  const handleEditClose = () => {
    setEditDialog({
      open: false,
      note: null,
      editTitle: '',
      editContent: ''
    });
  };

  // Save edited note
  const handleEditSave = () => {
    if (editDialog.note && editDialog.editTitle.trim() && editDialog.editContent.trim()) {
      setNotes(notes.map(note =>
        note.id === editDialog.note?.id
          ? {
              ...note,
              title: editDialog.editTitle.trim(),
              content: editDialog.editContent.trim()
            }
          : note
      ));
      handleEditClose();
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Notes
      </Typography>

      {/* Add Note Form */}
      <Card sx={{ mb: 4 }}>
        <Box component="form" onSubmit={handleAddNote}>
          <CardContent>
            <TextField
              fullWidth
              label="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
          </CardContent>
          <CardActions>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={!newNote.title.trim() || !newNote.content.trim()}
            >
              Add Note
            </Button>
          </CardActions>
        </Box>
      </Card>

      {/* Notes Grid */}
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {note.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {note.content}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mt: 2, display: 'block' }}
                >
                  {new Date(note.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditOpen(note)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(note.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialog.open} 
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Note</DialogTitle>
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
            rows={4}
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
      {notes.length === 0 && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center"
          sx={{ mt: 4 }}
        >
          No notes yet. Create one above!
        </Typography>
      )}
    </Container>
  );
};

export default Notes;
