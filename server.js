import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRouter from './routes/userRoutes.js';
import errorHandling from './middlewares/errorHandler.js';
import createUserTable from './data/createUserTable.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRouter);

// Error handling middleware
app.use(errorHandling);

// Create table before starting server
createUserTable();

// Testing postgres connection
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()');
  console.log('end');
  res.send(`The database name is :${result.rows[0].current_database}`);
});

// Server running
app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});
