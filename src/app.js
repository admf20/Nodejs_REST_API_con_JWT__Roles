import express from 'express';
import morgan from "morgan";

//importando las rutas, ya que no estan como modules
import productsRoutes from "./routes/products.routes";

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/products', productsRoutes);
// app.get('/')

export default app;