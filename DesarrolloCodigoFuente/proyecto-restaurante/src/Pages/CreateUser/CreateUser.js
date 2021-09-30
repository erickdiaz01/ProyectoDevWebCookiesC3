import React, { useState } from "react";

import Title from "./components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "./components/Input/Input";
//Importación de estilos
import "./CreateUser.css";

const CreateUser = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [rol, setRol] = useState("");
  const [fechaNacimientoInvalid, setFechaNacimientoInvalid] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [rolInvalid, setRolInvalid] = useState(false);
  const [hasError, setHasError] = useState(false);

  function handleChange(name, value) {
    if (name === "user") {
      setUser(value);
      setHasError(false);
    } else if (name === "password") {
      if (value.length < 6) {
        setPasswordError(true);
        setHasError(false);
      } else {
        setPassword(value);
        setPasswordError(false);
        setHasError(false);
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
    }
  }

  function handleSubmit() {
    let account = {
      user,
      password,
      repeatPassword,
      email,
      fechaNacimiento,
      genero,
      rol,
    };
    if (account) {
      ifMatch(account);
    }
  }
  function ifMatch(param) {
    if (param.user.length > 3 && param.password.length >= 6) {
      if (param.user === "ErickDiaz" && param.password === "Salem 14") {
        setIsRegister(true);
      } else {
        const { user, password } = param;
        let ac = { user, password };
        let account = JSON.stringify(ac);
        localStorage.setItem("account", account);
        setIsRegister(false);
      }
    } else {
      setHasError(true);
    }
  }

  function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var cumpleanos = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  function passwordValid(password) {
    var p1 = password;
    var p2 = repeatPassword;
    if (p1 !== p2) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <div className="register-container">
        <div className="register-content">
          <Title text="Registrese" />
          {hasError && (
            <label className="label-alert">
              Su Usuario o Contraseña son invalidos.
            </label>
          )}
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
            required
          />
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
            required
          />
          {passwordError && (
            <label className="label-error">
              Contraseña invalida o incompleta
            </label>
          )}
          <Label text="Ingrese nuevamente su contraseña" />
          <Input
            attribute={{
              id: "repeatPassword",
              name: "repeatPassword",
              type: "password",
              placeholder: "Ingrese nuevamente su contraseña",
            }}
            handleChange={handleChange}
            param={repeatPasswordError}
            required
          />
          {repeatPasswordError && (
            <label className="label-error">Contraseñas no coinciden</label>
          )}
          <Label text="Ingrese su correo" />
          <Input
            attribute={{
              id: "email",
              name: "email",
              type: "email",
              placeholder: "Ingrese su correo",
            }}
            handleChange={handleChange}
            param={emailInvalid}
            required
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
            required
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
              id="genero"
              name="genero"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="regular-style"
            >
              <option value="usuario">Usuario</option>
              <option value="vendedor" disabled>
                Vendedor
              </option>
              <option value="administrador" disabled>Administrador</option>
            </select>
          </div>

          <div className="submit-button-container">
            <button onClick={handleSubmit} className="submit-button">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
