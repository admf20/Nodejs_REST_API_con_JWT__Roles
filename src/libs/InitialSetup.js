import Role from "../models/Role";

export const CreateRoles = async () => {
    
    try {
        const count = await Role.estimatedDocumentCount(); // el 'estimatedDocumentCount' para saber si ya existe algun dato creado en la tabla Roles
        
        if(count > 0) return; 
    
        const values = await Promise.all([
            new Role({name:'User'}).save(),
            new Role({name:'Moderator'}).save(),
            new Role({name:'Admin'}).save()
        ])

        //si la tabla esta vacia creamos los diferentes usuarios

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};