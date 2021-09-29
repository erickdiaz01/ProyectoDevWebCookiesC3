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
  const [fechaNacimientoInvalid, setFechaNacimientoInvalid] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
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
      if (value === password.value) {
        setPasswordError(false);
        setHasError(false);
        setRepeatPassword(value);
      } else {
        setPasswordError(true);
        setHasError(true);
      }
    } else if (name === "email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    } else if (name === "fechaNacimiento") {
      if (calcularEdad < 16) {
        setFechaNacimientoInvalid(true);
      } else {
        setFechaNacimientoInvalid(false);
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
    };
    if (account) {
      ifMatch(account);
    }
  }
  function ifMatch(param) {
    if (param.user.length > 3 && param.password.length > 6) {
      if (param.user === "ErickDiaz" && param.password === "Salem 14") {
        const { user, password } = param;
        let ac = { user, password };
        let account = JSON.stringify(ac);
        localStorage.setItem("account", account);
        setIsRegister(false);
        setHasError(false);
      } else {
        setIsRegister(true);
        setHasError(true);
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

  return (
    <div className="register-container">
      <div className="register-content">
        <Title text="Registrese" />
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
        <Label text="Ingrese nuevamente su contraseña" />
        <Input
          attribute={{
            id: "repeatPassword",
            name: "repeatPassword",
            type: "password",
            placeholder: "Ingrese nuevamente su contraseña",
          }}
          handleChange={handleChange}
          param={passwordError}
          required
        />
        <Label text="Ingrese su correo" />
        <Input
          attribute={{
            id: "email",
            name: "email",
            type: "email",
            placeholder: "Ingrese su correo",
          }}
          handleChange={handleChange}
          param={passwordError}
          required
        />
        <Label text="Fecha de nacimiento" />
        <input
          id="fechaNacimiento"
          type="date"
          name="fechaNacimiento"
          value="fechaNacimiento"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={fechaNacimientoInvalid? "input-error" : "regular-style"}
          required
        />
        <Label text="Sexo" />
        <select required id="genero" name="genero" onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="regular-style">
          <option value="M">Mujer</option>
          <option value="H">Hombre</option>
          <option value="O">Otro</option>
        </select>
        <div className="submit-button-container">
          <button onClick={handleSubmit} className="submit-button">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
