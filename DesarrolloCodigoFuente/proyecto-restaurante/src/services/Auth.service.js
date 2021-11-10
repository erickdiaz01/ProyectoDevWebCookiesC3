import axios from "axios";

export const loginGoogle = ({ tokenId }) => {
  return axios({
    method: "POST",
    url: "http://localhost:4000/api/auth/google/login",
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const listarUsuarios = async (tokenId) => {
  try {
    return await axios({
      method: "GET",
      url: "http://localhost:4000/api/auth/verusuarios",
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    });
  } catch (error) {
    throw error.status;
  }
};
export const listarUsuario = async (tokenId, idUsuario) => {
  try {
    return await axios({
      method: "GET",
      url: `http://localhost:4000/api/auth/verusuarios/${idUsuario}`,
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    });
  } catch (error) {
    throw error.status;
  }
};

export const crearUsuario = async (tokenId, newUser) => {
  return await axios(
    {
      method: "POST",
      url: "http://localhost:4000/api/auth/crearusuario",
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    },
    newUser
  )
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const eliminarUsuario = async ( token, usuarioId) => {
  try {
    return await axios({
      method: "DELETE",
      url: `http://localhost:4000/api/auth/verusuarios/eliminar/${usuarioId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.status;
  }
};

export const listarRoles = async (tokenId) => {
  try {
    return await axios({
      method: "GET",
      url: "http://localhost:4000/api/auth/roles",
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    });
  } catch (error) {
    throw error.status;
  }
};
