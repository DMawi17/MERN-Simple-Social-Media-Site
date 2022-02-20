import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

/* 
The auth controller functions will not only handle requests to the signin and signout routes, but also provide JWT and express-jwt functionality to enable authentication and authorization for protected user API endpoints.
 */
const signin = async (req, res) => {
    // The POST request object receives the email and password in req.body.
    try {
        // This email is used to retrieve a matching user from the database.
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status("401").json({ error: "User not found" });

        /*
        the password authentication method defined in UserSchema is used to verify the password that's received in req.body from the client.
        */
        if (!user.authenticate(req.body.password)) {
            return res
                .status("401")
                .send({ error: "Email and password don't match." });
        }

        /*
        If the password is successfully verified, the JWT module is used to generate a signed JWT using a secret key and the user's _id value.
        */
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);

        // Optionally, we can also set the token to a cookie in response object
        res.cookie("t", token, { expire: new Date() + 9999 });

        /*
        Then, the signed JWT is returned to the authenticated client, along with the user's details.
        */
        return res.json({
            /* 
            On the client-side, this token must be attached as an Authorization header when requesting protected routes from the server. 
           */
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status("401").json({ error: "Could not sign in" });
    }
};

/* 
The signout function clears the response cookie containing the signed JWT. This is an optional endpoint and not really necessary for auth purposes if cookies are not used at all in the frontend.
With JWT, user state storage is the client's responsibility, and there are multiple options for client-side storage besides cookies. On signout, the client needs to delete the token on the client-side to establish that the user is no longer authenticated.  
*/
const signout = (req, res) => {
    res.clearCookie("t");
    return res.status("200").json({ message: "signed out" });
};

/* 
The requireSignin method uses express-jwt to verify that the incoming request has a valid JWT in the Authorization header. If the token is valid, it appends the verified user's ID in an 'auth' key to the request object; otherwise, it throws an authentication error.
We can add requireSignin to any route that should be protected against
unauthenticated access.
*/
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: "auth",
    algorithms: ["sha1", "RS256", "HS256"], // Solves the 'error algorithms should be set express-jwt'
});

/* 
The hasAuthorization function will check whether the authenticated user is the same as the user being updated or deleted before the corresponding CRUD controller function is allowed to proceed.
 */
const hasAuthorization = (req, res, next) => {
    /*
    The req.auth object is populated by express-jwt in requireSignin after authentication verification, while req.profile is populated by the userByID function in user.controller.js. 
    */
    const authorized =
        req.profile && req.auth && req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status("403").json({ error: "User is not authorized" });
    }

    next();
    /*
    We will add the hasAuthorization function to routes that require both authentication and authorization.
    */
};

export default { signin, signout, requireSignin, hasAuthorization };
