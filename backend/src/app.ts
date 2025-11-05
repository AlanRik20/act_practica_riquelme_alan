import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/equipos', inventoryRoutes); // <-- NUEVO ENDPOINT PARA EQUIPOS

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;