require('dotenv').config();
const middleware = (req, res, next) => {
    if (req.headers.key===process.env.API_KEY){
        next();
    }else{
        res.status(403).send("Lack of credentials.");
    }
}
module.exports = {middleware}