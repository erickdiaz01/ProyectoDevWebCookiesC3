const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('824425476103-5dbk8p9i571u0jpejf75o5rq0lhkbfuh.apps.googleusercontent.com');

const validarGoogleAuth = (req, res = response, next) => {

    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un toke valido'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        client.verifyIdToken({ idToken: token, audience: '824425476103-5dbk8p9i571u0jpejf75o5rq0lhkbfuh.apps.googleusercontent.com' })
            .then((response) => {

                const { sub, name, email } = response.payload;

                req.uid = sub;
                req.name = name;
                req.email = email;
                next();
            }).catch((err) => {
                console.log(err);
                return res.status(401).json({
                    ok: false,
                    msg: 'Token invalido'
                });
            });

    } catch (error) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

}

module.exports = {
    validarGoogleAuth
}