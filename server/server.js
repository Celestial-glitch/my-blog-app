import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import BlogRoutes from './routes/BlogRoute.js';

dotenv.config();                      // load env variables
const app = express();

app.use(cors());
app.use(bodyParser.json());

// access images http://localhost:5000/uploads/photo1.jpg

app.use('/uploads', express.static('uploads'));

// all routes under /api
app.use('/api', BlogRoutes);




const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.error(err));