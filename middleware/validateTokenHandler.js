const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization || req.headers["authorization"] || req.headers["Authorization"];
    console.log("authHeader: ", authHeader)
    try {
        let token = authHeader.split(" ")[1];
        console.log("token: ", token)
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT)
        req.id = decoded;
        console.log("lower side: ", req.id)
        next();
    }
    catch (err) {
        res.status(401);
        throw new Error(err);
    }
});

module.exports = validateToken;