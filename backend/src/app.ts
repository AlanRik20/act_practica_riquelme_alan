import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes)
app.use('/api/users',userRoutes)


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;