const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    /**x-token headers */
    // const token = req.header('x-token');

    /**Bearer token Authorization */
    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    // console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.lenth);
    }

    console.log(token);

    try {
        console.log(uid,name,process.env.Secret_JWT)
        const { uid, name } = jwt.verify(
            token,
            process.env.Secret_JWT
        );
        req.uid = uid;
        req.name = name;
        
        

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

    next();

}

module.exports = {
    validarJWT
}