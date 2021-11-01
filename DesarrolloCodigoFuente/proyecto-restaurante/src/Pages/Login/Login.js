import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import notie from "notie";
import { useForm } from "../../hooks/useForm"
import  {loginGoogle} from "../../services/Auth.service";
import useAuth from "../../hooks/useAuth"

import "notie/dist/notie.css";
//Importación de componentes
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Input from "./components/Input/Input";
//Importación de estilo
import "./Login.css";
import axios from "axios";
import Header from "../../Commons/Header/Header";
import Footer from "../../Commons/Footer/Footer";

const Login = () => {
  //Gestión de estados
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [hasError, setHasError] = useState(false);

  const auth = useAuth();

  const responseGoogle = async (resp) => {
    console.log(resp);

    try {
      const { status, data } = await axios({
        method: "POST",
        url: "http://localhost:4000/api/auth/google/login",
        headers: {
          Authorization: `Bearer ${resp.tokenId}`,
        },
      });

      console.log("status", status);

      if (status === 200) {
        auth.setToken(data.token);
        auth.setUser({ uid: data.uid, name: data.name });
      } else if (status === 201) {
        notie.alert({ text: data.msg, type: "success", time: 10 });
      }
    } catch (error) {
      //    console.log(error);
      // console.log(error.toJSON());
      // console.log(error.response.status);
      // console.log(error.response.data);
      // <Notificacion type={'error'} text={'No autorizado'}/>

      if (error.response.status === 401) {
        notie.alert({
          text: error.response.data.msg,
          type: "warning",
          time: 10,
        });
      } else {
        notie.alert({ text: error.response.data.msg, type: "error", time: 10 });
      }
    }
  };

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
    if (param.user.length > 3 && param.password.length > 6) {
      if (param.user === "ErickDiaz" && param.password === "Salem 14") {
        const { user, password } = param;
        let ac = { user, password };
        let account = JSON.stringify(ac);
        localStorage.setItem("account", account);
        setIsLogin(true);
        setHasError(false);
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
    <div>
    <div className="login-container">
    
      <div className="login-content">
      
        <Title text="Iniciar sesión" />
        {hasError && (
          <label className="label-alert">
            Su Usuario o Contraseña son incorrectos, o no existen en la
            plataforma.
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
        <div
          className="mb-3 text-center text-dark mt-3"
          style={{ fontWeight: "bolder" }}
        >
          o usa
        </div>
        <div className="d-flex justify-content-around mb-3">
          <GoogleLogin
            clientId="824425476103-aangmpfd4ujrao35spctq78m1ea1gof4.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
       
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default Login;
