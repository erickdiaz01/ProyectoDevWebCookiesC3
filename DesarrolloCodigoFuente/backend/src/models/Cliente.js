const { Schema, model } = require('mongoose');

const clienteSchema = Schema({
    name: {
        type: String,
        required: true
    },
    identificacion:{
        type:String,
        required:true
    },
    
},
{
    collection: 'clientes'
}
);

module.exports = model('Cliente', clienteSchema);