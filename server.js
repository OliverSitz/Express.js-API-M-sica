// server.js
const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Generador de Canciones
const generateSong = () => ({
    id: faker.string.uuid(), // Genera un UUID
    titulo: faker.lorem.words(3), // Genera un título
    artista: faker.person.fullName(), // Usa faker.person.fullName()
    album: faker.lorem.words(2), // Genera un álbum
    duracion: `${faker.number.int({ min: 1, max: 5 })}:${faker.number.int({ min: 0, max: 59 }).toString().padStart(2, '0')}`, // Genera una duración
    genero: faker.music.genre(), // Genera un género musical
    fechaLanzamiento: faker.date.past(5).toISOString().split('T')[0], // Genera una fecha de lanzamiento
});

// Generador de Playlists
const generatePlaylist = () => ({
    idPlaylist: faker.string.uuid(), // Genera un UUID para la playlist
    nombre: faker.lorem.words(2), // Genera un nombre
    descripcion: faker.lorem.sentence(), // Genera una descripción
    canciones: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, generateSong), // Genera un array de canciones
    creador: faker.person.fullName(), // Usa faker.person.fullName()
    fechaCreacion: new Date().toISOString().split('T')[0], // Genera una fecha de creación
});

// Rutas
app.get('/api/canciones', (req, res) => {
    const canciones = Array.from({ length: 5 }, generateSong); // Genera 5 canciones
    res.json(canciones);
});

app.get('/api/playlists', (req, res) => {
    const playlists = Array.from({ length: 3 }, generatePlaylist); // Genera 3 playlists
    res.json(playlists);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

