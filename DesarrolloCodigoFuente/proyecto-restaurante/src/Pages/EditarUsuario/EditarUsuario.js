import React, { useEffect, useState } from "react";
import {
  crearUsuario,
  listarRoles,
  listarUsuario,
  listarUsuarios,
} from "../../services/Auth.service";
import Title from "../CreateUser/components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "../Login/components/Input/Input";
//Importación de estilos
import "../CreateUser/CreateUser.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import InputOnlyRead from "../ModificarProducto/InputOnlyRead/InputOnlyRead";
import notie from "notie";

const EditUser = () => {
  const auth = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [rol, setRol] = useState();
  const [identificacion, setIdentificacion] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimientoInvalid, setFechaNacimientoInvalid] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [identificacionError, setIdRolError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [rolInvalid, setRolInvalid] = useState(false);
  const [sexoInvalid, setSexoInvalid] = useState(false);

  const getUsuarios = async () => {
    try {
      const { data } = await listarUsuarios(auth.token);
      console.log(data);
      await setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoles = async () => {
    try {
      const { data } = await listarRoles(auth.token);
      console.log(data);
      setRoles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async () => {
    try {
      let idUsuario = window.location.pathname.substring(
        20,
        window.location.pathname.length
      );
      const { data } = await listarUsuario(auth.token, idUsuario);
      setUsuario(data);
      setUser(data.name);
      setIdentificacion(data.identificacion);
      setEmail(data.email);
      setSexo(data.sexo);
      setRol(data.rol);
      setFechaNacimiento(data.nacimiento);
      console.log(data);
      //   setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(name, value) {
    if (name === "rol") {
      console.log(value);
      if (value === "") {
        setRolInvalid(true);
      } else {
        setRol(value);
        setRolInvalid(false);
      }
    } else if (name === "sexo") {
      if (value === "") {
        setSexoInvalid(true);
      } else {
        setSexoInvalid(false);
        setSexo(value);
      }
    } else if (name === "user") {
      setUser(value);
      console.log(user);
    } else if (name === "password") {
      if (value.length < 6) {
        setPasswordError(true);
      } else {
        
        setPassword(value);
        setPasswordError(false);
      }
    } else if (name === "repeatPassword") {
      if (passwordValid(value)) {
        setRepeatPasswordError(false);
        setRepeatPassword(value);
      } else {
        setRepeatPasswordError(true);
      }
    } else if (name === "email") {
      if (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          value
        )
      ) {
        setEmailInvalid(false);
        setEmail(value);
      } else {
        setEmailInvalid(true);
      }
    } else if (name === "fechaNacimiento") {
      if (calcularEdad(value) < 16) {
        setFechaNacimientoInvalid(true);
      } else {
        setFechaNacimientoInvalid(false);
        setFechaNacimiento(value);
      }
    } else if (name === "identificacion") {
      if (value.length < 5 || !/^[0-9]+$/.test(value)) {
        setIdRolError(true);
      } else {
        setIdentificacion(value);
        setIdRolError(false);
      }
    }
  }

  useEffect(() => {
    getUsuarios();
    getRoles();
    getUsuario();
  }, []);

  async function handleSubmit() {
    try {
      let rolUser = await roles.find((rolEnLista) => rol === rolEnLista._id);
      console.log(rolUser);
      let newUser = {
        name: user,
        identificacion: identificacion,
        password: password,
        confirmacionPassword: repeatPassword,
        email: email,
        nacimiento: fechaNacimiento,
        sexo: sexo,
        rol: rolUser,
        fechaIngreso: usuario.fechaIngreso,
      };

      const { data, status } = await axios.put(
        `http://localhost:4000/api/auth/verusuarios/editar/${usuario._id}`,
        newUser
      );
      if (status === 200 || 201 || 204) {
        notie.alert({ text: data.message, type: "success", time: 10 });
        console.log("usuario actualizado", newUser);
        return console.log(newUser);
      }
    } catch (error) {
      console.log(error);
      console.log(error.toJSON());
      console.log(error.response.status);
      console.log(error.response.data);
      if (error.response.status === 401) {
        notie.alert({
          text: error.response.data.message,
          type: "warning",
          time: 10,
        });
      } else {
        notie.alert({
          text: error.response.data.message,
          type: "error",
          time: 10,
        });
      }
    }
    // let UserByEmail = await usuarios.find((usuario) => usuario.email === email);
    // if (UserByEmail) {
    //   setIsRegister(true);
    //   return console.log("Usuario ya registrado");
    // }
  }

  function calcularEdad(valor) {
    var hoy = new Date();
    var cumpleanos = new Date(valor);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  function passwordValid(value) {
    if (password !== value) {
      return false;
    } else {
      return true;
    }
  }
  function confirmarSelectedRol(valor) {
    if (valor === usuario.rol._id) {
      return true;
    } else {
      return false;
    }
  }
  function confirmarSelectedSexo(valor) {
    if (valor === usuario.sexo) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      <div className="register-container">
        <div className="register-content">
          <Title text={`Actualizacion info de ${usuario.name}`} />

          {/* {isRegister && (
            <label className="label-alert">
              Ya hay un registro con ese usuario.
            </label>
          )} */}
          <br />
          <br />
          <div className="row">
            <InputOnlyRead
              attribute={{
                id: "idUsuario",
                name: "idUsuario",
                type: "text",
                placeholder: `${usuario._id}`,
                default: `${usuario._id}`,
              }}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label text="Usuario" />
              <Input
                attribute={{
                  id: "user",
                  name: "user",
                  type: "text",
                  placeholder: "Ingrese su nombre",
                  defaultValue: usuario.name,
                }}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Label text="Número de identificación" />
              <Input
                attribute={{
                  id: "identificacion",
                  name: "identificacion",
                  type: "text",
                  placeholder: "Ingrese su ID",
                  defaultValue: usuario.identificacion,
                }}
                handleChange={handleChange}
                param={identificacionError}
              />
              {identificacionError && (
                <label className="label-error">ID no valido</label>
              )}
            </div>
          </div>
         
          <div className="row">
            <div className="col-md-6">
              <Label text="Correo electronico" />
              <Input
                attribute={{
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "Ingrese su correo",
                  defaultValue: usuario.email,
                }}
                handleChange={handleChange}
                param={emailInvalid}
              />
              {emailInvalid && (
                <label className="label-error">Correo no valido</label>
              )}
            </div>
            <div className="col-md-6">
              <Label text="Fecha de nacimiento" />
              <Input
                attribute={{
                  id: "fechaNacimiento",
                  name: "fechaNacimiento",
                  type: "date",
                  placeholder: "Ingrese su fecha de nacimiento",
                }}
                handleChange={handleChange}
                param={fechaNacimientoInvalid}
              />
              {fechaNacimientoInvalid && (
                <label className="label-error">
                  Tienes que ser mayor de 16 años
                </label>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label text="Sexo" />
              <div className="input-container">
                <select
                  required
                  id="sexo"
                  name="sexo"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={sexo}
                  className={sexoInvalid ? "input-error" : "regular-style"}
                >
                  <option
                    value=""
                    // selected={(e) => confirmarSelectedSexo(e.value)}
                  ></option>
                  <option
                    value="M"
                    // selected={(e) => confirmarSelectedSexo(e.value)}
                  >
                    Mujer
                  </option>
                  <option
                    value="H"
                    // selected={(e) => confirmarSelectedSexo(e.value)}
                  >
                    Hombre
                  </option>
                  <option
                    value="O"
                    // selected={(e) => confirmarSelectedSexo(e.value)}
                  >
                    Otro
                  </option>
                </select>
                {sexoInvalid && (
                  <label className="label-error">Sexo obligatorio</label>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <Label text="Rol" />
              <div className="input-container">
                <select
                  required
                  id="rol"
                  name="rol"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={rol}
                  className={rolInvalid ? "input-error" : "regular-style"}
                >
                  <option value=""></option>
                  <option
                    // selected={(value) => confirmarSelectedRol(value)}
                    value="6187440898f2d08c80ae537f"
                  >
                    Cajero
                  </option>
                  <option
                    value="61763b69b176073c2a7202cd"
                    // selected={(value) => confirmarSelectedRol(value)}
                  >
                    Vendedor
                  </option>
                  <option
                    value="6187440898f2d08c80ae537f"
                    // selected={(value) => confirmarSelectedRol(value)}
                  >
                    Mesero
                  </option>
                  <option
                    value="6187441a98f2d08c80ae5380"
                    // selected={(value) => confirmarSelectedRol(value)}
                  >
                    Domiciliario
                  </option>
                  <option
                    value="6175ca2afe66858d6c5671e1"
                    // selected={(value) => confirmarSelectedRol(value)}
                    disabled
                  >
                    Administrador
                  </option>
                </select>
                {rolInvalid && (
                  <label className="label-error">Rol obligatorio</label>
                )}
              </div>
            </div>
          </div>

          <div className="submit-button-container">
            <button onClick={handleSubmit} className="submit-button">
              Actualizar el usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
