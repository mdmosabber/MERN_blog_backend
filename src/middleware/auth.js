const jwt = require('jsonwebtoken');

exports.requireSign = (req, res, next )=>{
    try {
        const decode = jwt.verify( req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}