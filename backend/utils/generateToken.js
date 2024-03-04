import  Jwt  from "jsonwebtoken";

const generateTokenAndSetCookies = (userID, res) => {
    const token = Jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent XSS attack cross site scripting attacks
        sameSite:"strict", //CSRF attack cross site request forgery
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateTokenAndSetCookies;