import React, { useState } from "react";
//Importación de componentes
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Input from "./components/Input/Input";
//Importación de estilo
import "./Login.css";

const Login = () => {
  //Gestión de estados
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hasError, setHasError] = useState(false);


  //Metodos
  function handleChange(name, value) {
    if (name === "user") {
      setUser(value);
      setHasError(false);
    } else {
      if (value.length < 6) {
        setPasswordError(true);
        setHasError(false);
      } else {
        setPassword(value);
        setPasswordError(false);
        setHasError(false);
      }
    }
  }

  function ifMatch(param) {
    if (param.user.length > 6 && param.password.length > 6) {
      if (param.user === "Erick" && param.password === "Salem 14") {
        const { user, password } = param;
        let ac = { user, password };
        let account = JSON.stringify(ac);
        localStorage.setItem("account", account);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        setHasError(true);
      }
    } else {
      setIsLogin(false);
      setHasError(true);
    }
  }

  function handleSubmit() {
    let account = { user, password };
    if (account) {
      ifMatch(account);
    }
  }

  //Renderización
  return (
    <div className="login-container">
      <div className="login-content">
        <Title text="Iniciar sesión" />
        {hasError && (
          <label className="label-alert">
            Su contraseña o usuario son incorrectos, o no existen en la
            plataforma
          </label>
        )}
        <Label text="Usuario" />
        <Input
          attribute={{
            id: "user",
            name: "user",
            type: "text",
            placeholder: "Ingrese su usuario",
          }}
          handleChange={handleChange}
        />
        <Label text="Contraseña" />
        <Input
          attribute={{
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Ingrese su contraseña",
          }}
          handleChange={handleChange}
          param={passwordError}
        />
        {passwordError && (
          <label className="label-error">
            Contraseña invalida o incompleta
          </label>
        )}
        <div className="submit-button-container">
          <button onClick={handleSubmit} className="submit-button">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
