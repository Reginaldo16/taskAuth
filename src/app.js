import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'


const app = express();
app.use(express.json());
app.use(cookieParser())

//para poder ver as requisicoes feitas
app.use(morgan('dev'));

//routas
app.use('/api',authRoutes)
app.use('/api',tasksRoutes)

export default app;