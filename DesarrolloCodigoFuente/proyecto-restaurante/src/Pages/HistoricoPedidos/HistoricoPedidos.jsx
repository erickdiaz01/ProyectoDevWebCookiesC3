import React from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../CreateUser/components/Input/Input";

import Title from "../CreateUser/components/Title/Title";
import "./historicopedidos.css";

const HistoricoPedidos = () => {

    return (
        <div className="bg-prim">
            <div className="container">
                <div className="row">
                    <div className="col-12 pt-5 ">
                        <h1 className="text-center">Histórico de Pedidos </h1>
                        <div className="table-responsive pb-5">
                            <table class="table table-dark table-sm pt-3">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col" className="text-center">Cantidad</th>
                                        <th scope="col" className="text-center"> Precio Unidad</th>
                                        <th scope="col" className="text-center">Precio Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Frijolada</td>
                                        <td className="text-center">3</td>
                                        <td className="text-center">$10.000</td>
                                        <td className="text-center">$30.000</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" className="table-active text-end"><h3 className="pe-3">Gran Total</h3></td>
                                        <td className="text-center">$90.000</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricoPedidos;
