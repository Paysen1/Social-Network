const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

const thoughtRoutes = require('./routes/thoughtRoutes');
const userRoutes = require('./routes/userRoutes'); 
const reactionRoutes = require('./routes/reactionRoutes'); 


app.use('/api/thoughts', thoughtRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/reactions', reactionRoutes); 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});