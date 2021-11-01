import axios from 'axios';
export const listarProductos = async(token) => {    

    try {
        return await axios({
            method: 'GET',
            url: "http://localhost:4000/api/productos/verproductos",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}

export const verProducto = async(token,id) => {    

    try {
        return await axios({
            method: 'GET',
            url: `http://localhost:4000/api/productos/verproductos/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}



export const eliminarProducto = async(productoId, token) => {    
    
    try {
        return await axios({
            method: 'DELETE',
            url: `http://localhost:4000/api/productos/verproductos/eliminar/${productoId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.status;
    }
}