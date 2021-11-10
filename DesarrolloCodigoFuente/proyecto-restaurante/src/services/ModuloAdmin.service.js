import axios from 'axios';
export const listarClientes = async(token) => {    

    try {
        return await axios({
            method: 'GET',
            url: "http://localhost:4000/api/clientes/verclientes",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}
export const listarPedidos = async(token) => {    

    try {
        return await axios({
            method: 'GET',
            url: "http://localhost:4000/api/ventas/verpedidos",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

export const verCliente = async(token,id) => {    

    try {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/api/clientes/verclientes/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}
export const verPedido = async(token,idPedido) => {    

    try {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/api/ventas/verpedidos/${idPedido}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}



export const eliminarCliente = async(token,clienteId ) => {    
    
    try {
        return await axios({
            method: 'DELETE',
            url: `http://localhost:4000/api/clientes/verclientes/eliminar/${clienteId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}
export const eliminarPedido = async( token,pedidoId,) => {    
    
    try {
        return await axios({
            method: 'DELETE',
            url: `http://localhost:4000/api/ventas/verpedidos/eliminarventa/${pedidoId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}


export const editarPedido = async( token,pedidoId) => {    
    
    try {
        return await axios({
            method: 'PUT',
            url: `http://localhost:4000/api/ventas/verpedidos/editarventa/${pedidoId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}