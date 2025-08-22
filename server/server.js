const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { dynamicRouter, reloadRoutes } = require('./controllers/projectController');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => reloadRoutes());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', dynamicRouter);

// basic swagger UI with empty spec placeholder
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup({ openapi: '3.0.0', info: { title: 'API', version: '1.0.0' } }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
