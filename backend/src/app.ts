import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';


const app = express();
const port = process.env.PORT || 3000;-

app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173'
}))
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/equipos', inventoryRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;