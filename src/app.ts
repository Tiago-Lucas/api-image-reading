import express, { Request, Response } from "express";
import cors from 'cors'
const app = express();
import routes from '../src/routes/index'

app.use(cors());
app.use(express.json())
app.use('/api', routes)

export default app