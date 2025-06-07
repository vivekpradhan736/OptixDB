const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const fileRoutes = require('./routes/file.js');
const apikeyRoutes = require('./routes/apikey.js');
const storageRoutes = require('./routes/storage.js');
const folderRoutes = require('./routes/folder.js');

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'https://optix-db.vercel.app', methods: ['GET', 'POST', 'PUT', 'DELETE'] })); // Allow credentials
app.use(cookieParser()); // Add cookie-parser middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/apikey', apikeyRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/folder', folderRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));