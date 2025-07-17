import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import toolboxRoutes from './routes/toolboxRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', toolboxRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
