import React from "react";
//Importación de estilo
import "../../Login/Login.css";

const InputOnlyRead = ({attribute,param})=>{
    return(
        <div className="input-container">
            <input
            id={attribute.id}
            name={attribute.name}
            placeholder={attribute.placeholder}
            type={attribute.type}
            accept={attribute.accept}
            defaultValue={attribute.idProd}
            readOnly
            className={param ?"input-error":"regular-style"}
            />
        </div>

    )
};

export default InputOnlyRead;