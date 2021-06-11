require('dotenv').config();

import app from './app';
import database from "./data_base";

app.listen(app.set('port'), () => {
    console.log('Servidor Corriendo', app.set('port'));
});