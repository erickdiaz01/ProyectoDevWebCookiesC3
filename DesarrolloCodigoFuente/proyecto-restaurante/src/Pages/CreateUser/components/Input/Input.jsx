import React from "react";
//Importación de estilo
import "./Input.css";

const Input = ({attribute, handleChange, param})=>{
    return(
        <div className="input-container">
            <input
            id={attribute.id}
            name={attribute.name}
            placeholder={attribute.placeholder}
            type={attribute.type}
            
            className={param ?"input-error":"regular-style"}
            />
        </div>

    )
};

export default Input;