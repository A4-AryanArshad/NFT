const { header } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT = 'Sohailisthegreatboy';


const fetchuser =(req,res,next)=>
{
    const token = req.header('auth_token')
    if(!token)
        {
         return res.status(400).json({error:"Please authenticate the valis tiken"});
        }

        try{
            const data = jwt.verify(token,JWT);
            req.user=data.user;
            next();
        }
        catch{
            console.error(error.message);
            res.status(500).send("Some eror occure");

        } 
}
module.exports = fetchuser;

