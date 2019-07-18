const jwt = require('../_service/jwt');

const isWebValid = (req, res, next) => {
    let token = req.headers['authorization'] || req.params.token || req.query.token;
    if (token) {
        jwt.verifyMobToken(token).then(decoded =>{
            req.session = decoded;
            next();
        }).catch(err => {
            res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    }
}

module.exports = {
    isWebValid
}