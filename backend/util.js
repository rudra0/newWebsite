var jwt = require('jsonwebtoken');
var config = require('./config');
const getToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        password: user.password,
        isAdmin: user.isAdmin
        
    }, config.JWT_SECRET, {
        expiresIn: "48h"
    });

}

const isAuth = ( req, res, next ) =>{

    const token = req.header.authorization;
    if(token)
    {
        const onlyToken = token.slice( 7, token.length );
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode )=>{
            if(err)
            {
                return res.status(401).send({ msg: 'Invalid Token' })
            }
            req.user = decode;
            next();
            return
        } );
    }
    else{

    return res.status(401).send({ msg: 'Token Is not supplied' })

    }


}

const isAdmin = ( req, res, next ) =>{

    if(req.user && req.user.isAdmin)
    {
        return next();
    }

    return res.status(401).send({ msg: 'Token is Not valid'});
}

module.exports= {
    getToken, isAuth, isAdmin
}