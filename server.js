const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

// Add this line to parse JSON request bodies
app.use(express.json());

// Define some sample playlist data
let playlist = [
    {
        "title": "Song 1",
        "artist": "Artist 1",
        "album": "Oldies",
        "duration": 3,
        "genre": "slow"
    },
    {
        "title": "Song 2",
        "artist": "Artist 2",
        "album": "Oldies",
        "duration": 4,
        "genre": "slow"
    },
    {
        "title": "Song 3",
        "artist": "Artist 3",
        "album": "Oldies",
        "duration": 5,
        "genre": "slow"
    }
];

// Get all songs
app.get('/api/playlist', (req, res) => {
  res.json(playlist);
});

// Get a specific song by ID
app.get('/api/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = playlist.find(item => item.id === id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Create a new song
app.post('/api/playlist', (req, res) => {
  const { title, artist, album,  duration, genre } = req.body;
  const newSong = { id: playlist.length + 1, title, artist, album, duration, genre };
  playlist.push(newSong);
  res.status(201).json(newSong);
});

// Update an existing song
app.put('/api/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, artist, album,  duration, genre } = req.body;
  const song = playlist.find(item => item.id === id);
  if (song) {
    song.title = title || song.title;
    song.artist = artist || song.artist;
    song.album = album || song.album;
    song.duration = duration || song.duration;
    song.genre = genre || song.genre;
    res.json(song);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Delete a song
app.delete('/api/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = playlist.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedSong = playlist.splice(index, 1);
    res.json(deletedSong[0]);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
