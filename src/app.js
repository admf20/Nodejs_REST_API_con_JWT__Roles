import express from 'express';
import morgan from 'morgan';

//importando las rutas, ya que no estan como modules
import productsRoutes from "./routes/products.routes";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes"

import {CreateRoles} from "./libs/InitialSetup";

const app = express();
CreateRoles();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

export default app;