import React from "react";
import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";
import Table from "react-bootstrap/Table";
import "./GestionUsuarios.css";

const GestionUsuarios = () => {
    return (
        <div className="gestion-usuarios-container">
            <div className="gestion-usuarios-content">
                <header className="title-container">
                    <Title text="Roles Registrados" />
                </header>
                <section className="row">
                    <div className="col-md-4">
                        <Label text="Tipo de Rol" />
                        <div className="input-container">
                            <select
                                id="BusquedaUsuariosPorRol"
                                name="BusquedaUsuariosPorRol"
                                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="regular-style"
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Cajero">Cajero</option>
                                <option value="Mesero">Mesero</option>
                                <option value="Domiciliario">Domiciliario</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Label text="Permisos del Usuario" />
                        <div className="input-container">
                            <select
                                id="busquedaPermisosUsuario"
                                name="busquedaPermisosUsuario"
                                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="regular-style"
                            >
                                <option value="AccesoTotal">Acceso Total</option>
                                <option value="ModuloMaestroVentas">Modulo Maestro de Ventas</option>
                                <option value="ModuloVentas">Modulo de Ventas</option>
                                <option value="ModuloEntregas">Modulo de Entregas</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Label text="Estado de Usuarios" />
                        <div className="input-container">
                            <select
                                id="EstadoUsuarios"
                                name="EstadoUsuario"
                                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className="regular-style"
                            >
                                <option value="UsuarioActivo">Activo</option>
                                <option value="UsuarioInactivo">Inactivo</option>

                            </select>
                        </div>
                    </div>

                </section>
                <section className="row">
                    <Table striped bordered hover responsive className="tabla">
                        <thead>
                            <tr>
                                <th>Tipo de Rol</th>
                                <th>Permisos del Usuario</th>
                                <th>Estado</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Administrador</td>
                                <td>Acceso total</td>
                                <td>Activo</td>
                                <td>
                                    <a href="#">
                                        <i className="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Vendedor</td>
                                <td>Modulo maestro de ventas</td>
                                <td>Activo</td>
                                <td>
                                    <a href="#">
                                        <i className="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Cajero</td>
                                <td>Modulo de ventas</td>
                                <td>Activo</td>
                                <td>
                                    <a href="#">
                                        <i className="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Mesero</td>
                                <td>Modulo de ventas</td>
                                <td>Inactivo</td>
                                <td>
                                    <a href="#">
                                        <i className="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td>Domiciliario</td>
                                <td>Modulo de entregas</td>
                                <td>Activo</td>
                                <td>
                                    <a href="#">
                                        <i className="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#">
                                        <i class="bi bi-trash-fill"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </section>
            </div>
        </div>




    );
};

export default GestionUsuarios;