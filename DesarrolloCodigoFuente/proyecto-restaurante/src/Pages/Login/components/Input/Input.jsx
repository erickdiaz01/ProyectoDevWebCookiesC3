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
            accept={attribute.accept}
            defaultValue={attribute.defaultValue}
            list={attribute.list}
            onChange={(e)=> handleChange(e.target.name,e.target.value)}
            className={param ?"input-error":"regular-style"}
            />
        </div>

    )
};

export default Input;