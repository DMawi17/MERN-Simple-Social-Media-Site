import User from "../models/user.model";
import errorHandler from "./../helpers/dbErrorHandler";

// The create controller function creates a new user with the user JSON object that's received in the POST request from the frontend within req.body.
const create = async (req, res, next) => {
    // Attempts to save new user in db after validation check on the data.
    const user = new User(req.body);

    // An error or success response is returned to the requesting client.
    try {
        await user.save();
        return res.status(200).json({ message: "Successfully signed up" });
    } catch (err) {
        // This controller will make use of the errorHandler helper to respond to route requests with meaningful messages when a Mongoose error occurs.
        return res
            .status(400)
            .json({ error: errorHandler.getErrorMessage(err) });
    }
};

// The list controller function finds all the users from the database, populates only the name, email, created, and updated fields in the resulting user list, and then returns this list of users as JSON objects in an array.
const list = async (req, res) => {
    try {
        let users = await User.find().select("name email updated created");
        res.json(users);
    } catch (err) {
        return res
            .status(400)
            .json({ error: errorHandler.getErrorMessage(err) });
    }
};

// Whenever the Express app receives a request to a route that matches a path containing the :userId parameter in it, the app will execute the userByID controller function, which fetches and loads the user into the Express request object, before propagating it to the next function that's specific to the request that came in.
const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) return res.status("400").json({ error: "User not found" });
        req.profile = user; // If a matching user is found in the database, the user object is appended to the request object in the profile key.
        next(); // used to propagate control to the next relevant controller.
    } catch (err) {
        return res.status("400").json({
            error: "Could not retrieve user",
        });
    }
};

// The read function retrieves the user details from req.profile and removes sensitive information, such as the hashed_password and salt values, before sending the user object in the response to the requesting client.
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// When the Express app gets a PUT request at '/api/users/:userId', similar to read, it loads the user with the :userId parameter value before executing the update controller function.
const update = async (req, res) => {
    try {
        let user = req.profile; // retrieves the user details from req.profile
        // & merge the changes that came in the request body to update the user
        user = Object.assign(user, req.body);
        user.updated = Date.now(); // Add the last updated timestamp.
        await user.save(); // Upon successfully saving, the updated user is
        user.hashed_password = undefined; // cleaned by removing hashed_password
        user.salt = undefined; // & slat before
        res.json(user); // sending the user object in response to the request.
    } catch (err) {
        return res
            .status(400)
            .json({ error: errorHandler.getErrorMessage(err) });
    }
};

// The remove function retrieves the user from req.profile and uses the remove() query to delete the user from the database. On successful deletion, the requesting client is returned the deleted user object in the response.
const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export default { create, list, userById, read, update, remove };
