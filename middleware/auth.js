const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const { JWT_SECRET } = process.env;

const auth = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({msg:'plz login first'})

    }
    try{
        const decode = jwt.verify(token,JWT_SECRET)
        req.admin = decode.admin

        const admin = await Admin.findById(req.admin.id)
        if(!admin){
            return res.status(401).json({msg:'plz login first'})
        }
        next()
    }
    catch (err){
        return res.status(401).json({msg:'invalid token'})
    }
}

module.exports = auth