import React, { useState } from "react";
import { crearUsuario } from "../../services/Auth.service";
import Title from "./components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "../Login/components/Input/Input";
//Importación de estilos
import "./CreateUser.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const CreateUser = () => {
  const auth = useAuth();

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
  const [fechaRolIngresoHistoricoInvalid, setFechaRolIngresoHistoricoInvalid] =
    useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [identificacionError, setIdRolError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  function handleChange(name, value) {
    if (name === "user") {
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
    } else {
      if (calcularEdad(value) < 0) {
        setFechaRolIngresoHistoricoInvalid(true);
      } else {
        setFechaRolIngresoHistoricoInvalid(false);
        setIngreso(value);
      }
    }
  }

  async function handleSubmit() {
    let newUser = {
      name: user,
      identificacion: identificacion,
      password: password,
      confirmacionPassword: repeatPassword,
      email: email,
      nacimiento: fechaNacimiento,
      fechaIngreso: ingreso,
      sexo: sexo,
      rol: rol,
    };
    
    axios.post("http://localhost:4000/api/auth/crearusuario", newUser);
    console.log(newUser);
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

  return (
    <div>
      <div className="register-container">
        <div className="register-content">
          <Title text="Registro de roles" />

          {isRegister && (
            <label className="label-alert">
              Ya hay un registro con ese usuario.
            </label>
          )}
          <Label text="Usuario" />
          <Input
            attribute={{
              id: "user",
              name: "user",
              type: "text",
              placeholder: "Ingrese un usuario",
            }}
            handleChange={handleChange}
          />
          <Label text="Número de identificación" />
          <Input
            attribute={{
              id: "identificacion",
              name: "identificacion",
              type: "text",
              placeholder: "Ingrese su ID",
            }}
            handleChange={handleChange}
            param={identificacionError}
          />
          {identificacionError && <label className="label-error">ID no valido</label>}
          <Label text="Contraseña" />
          <Input
            attribute={{
              id: "password",
              name: "password",
              type: "password",
              placeholder: "Ingrese una contraseña para registrarse",
            }}
            handleChange={handleChange}
            param={passwordError}
          />
          {passwordError && (
            <label className="label-error">
              Contraseña invalida o incompleta
            </label>
          )}
          <Label text="Confirme  su contraseña" />
          <Input
            attribute={{
              id: "repeatPassword",
              name: "repeatPassword",
              type: "password",
              placeholder: "Ingrese nuevamente su contraseña",
            }}
            handleChange={handleChange}
            param={repeatPasswordError}
          />
          {repeatPasswordError && (
            <label className="label-error">Contraseñas no coinciden</label>
          )}
          <Label text="Correo electronico" />
          <Input
            attribute={{
              id: "email",
              name: "email",
              type: "email",
              placeholder: "Ingrese su correo",
            }}
            handleChange={handleChange}
            param={emailInvalid}
          />
          {emailInvalid && (
            <label className="label-error">Correo no valido</label>
          )}
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
          <Label text="Sexo" />
          <div className="input-container">
            <select
              required
              id="sexo"
              name="sexo"
              handleChange={handleChange}
              className="regular-style"
            >
              <option value="M">Mujer</option>
              <option value="H">Hombre</option>
              <option value="O">Otro</option>
            </select>
          </div>

          <Label text="Rol" />
          <div className="input-container">
            <select
              required
              id="rol"
              name="rol"
              handleChange={handleChange}
              className="regular-style"
            >
              <option value="cajero">Cajero</option>
              <option value="vendedor">Vendedor</option>
              <option value="mesero">Mesero</option>
              <option value="domiciliario">Domiciliario</option>
              <option value="administrador" disabled>
                Administrador
              </option>
            </select>
          </div>
         
          <div className="submit-button-container">
            <button onClick={handleSubmit} className="submit-button">
              Registrarse
            </button>
          </div>

          <div
            className="mb-3 text-center text-dark mt-3"
            style={{ fontWeight: "bolder" }}
          >
            or register using
          </div>
          <div className="d-flex justify-content-around mb-3">
            <button type="submit" className="btn btn-danger btn-rounded">
              <i className="bi bi-google"></i>&nbsp;&nbsp;Google
            </button>
            <button type="submit" className="btn btn-primary btn-rounded">
              <i className="bi bi-facebook"></i>&nbsp;&nbsp;Facebook
            </button>
            <button type="submit" className="btn btn-primary btn-rounded">
              <i className="bi bi-linkedin"></i>&nbsp;&nbsp;Linkedin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
