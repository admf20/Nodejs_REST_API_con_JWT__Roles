import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI 
            ? process.env.MONGODB_URI
            : 'mongodb://localhost/api-jwt-test';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', (err) => {
    if(err){
        console.log(err);   
    }else{
        console.log('Base de Datos corriendo');
    }
});
