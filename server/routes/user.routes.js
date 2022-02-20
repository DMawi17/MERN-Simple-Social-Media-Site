import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

// declaring API endpoints that correspond to user CRUD operations.
const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

// The route to read a user's information only needs authentication verification, whereas the update and delete routes should check for both authentication and authorization before these CRUD operations are executed.
router
    .route("/api/users/:userId")
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// configure the Express router so that it handles the userId parameter in a requested route by executing the userByID controller function.
router.param("userId", userCtrl.userById);

export default router;
