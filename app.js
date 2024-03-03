const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const usersRouter = require('./routes/userRouter');
const diaryRoutes = require('./routes/diaryRouts');
const trainingRoutes = require('./routes/trainingRoutes');

dotenv.config();
const { DB_HOST } = process.env;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/diary', diaryRoutes);
app.use('/api/exercises', trainingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .then(() =>
    app.listen(3000, () => {
      console.log('Server is running. Use our API on port: 3000');
    })
  )
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
