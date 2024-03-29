import express from 'express';
import { routes } from './routes/index';
import dotenv from 'dotenv';

dotenv.config({
  path: `./environments/.env.${process.env.NODE_ENV}`
});

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)