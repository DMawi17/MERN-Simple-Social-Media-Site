/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);\n// These variables will give us the flexibility to change values from a single file and use it across the backend code.\n\nconst config = {\n  env: \"development\" || 0,\n  // differentiate b/n dev & prod\n  port: process.env.PORT || 3000,\n  // define the listening port for the server\n  jwtSecret: process.env.JWT_SECRET || \"YOUR_secret_key\",\n  // used to sign JWT\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || \"mongodb://\" + (process.env.IP || \"localhost\") + \":\" + (process.env.MONGODB_PORT || \"27017\") + \"/mernproject\" // location of the MongoDB database instance\n\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://mern-simplesetup/./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n\n\n\n\n/* \nThe auth controller functions will not only handle requests to the signin and signout routes, but also provide JWT and express-jwt functionality to enable authentication and authorization for protected user API endpoints.\n */\n\nconst signin = async (req, res) => {\n  // The POST request object receives the email and password in req.body.\n  try {\n    // This email is used to retrieve a matching user from the database.\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      email: req.body.email\n    });\n    if (!user) return res.status(\"401\").json({\n      error: \"User not found\"\n    });\n    /*\n    the password authentication method defined in UserSchema is used to verify the password that's received in req.body from the client.\n    */\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status(\"401\").send({\n        error: \"Email and password don't match.\"\n      });\n    }\n    /*\n    If the password is successfully verified, the JWT module is used to generate a signed JWT using a secret key and the user's _id value.\n    */\n\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret); // Optionally, we can also set the token to a cookie in response object\n\n    res.cookie(\"t\", token, {\n      expire: new Date() + 9999\n    });\n    /*\n    Then, the signed JWT is returned to the authenticated client, along with the user's details.\n    */\n\n    return res.json({\n      /* \n      On the client-side, this token must be attached as an Authorization header when requesting protected routes from the server. \n      */\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      }\n    });\n  } catch (err) {\n    return res.status(\"401\").json({\n      error: \"Could not sign in\"\n    });\n  }\n};\n/* \nThe signout function clears the response cookie containing the signed JWT. This is an optional endpoint and not really necessary for auth purposes if cookies are not used at all in the frontend.\nWith JWT, user state storage is the client's responsibility, and there are multiple options for client-side storage besides cookies. On signout, the client needs to delete the token on the client-side to establish that the user is no longer authenticated.  \n*/\n\n\nconst signout = (req, res) => {\n  res.clearCookie(\"t\");\n  return res.status(\"200\").json({\n    message: \"signed out\"\n  });\n};\n/* \nThe requireSignin method uses express-jwt to verify that the incoming request has a valid JWT in the Authorization header. If the token is valid, it appends the verified user's ID in an 'auth' key to the request object; otherwise, it throws an authentication error.\nWe can add requireSignin to any route that should be protected against\nunauthenticated access.\n*/\n\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\n  userProperty: \"auth\",\n  algorithms: [\"sha1\", \"RS256\", \"HS256\"] // Solves the 'error algorithms should be set express-jwt'\n\n});\n/* \nThe hasAuthorization function will check whether the authenticated user is the same as the user being updated or deleted before the corresponding CRUD controller function is allowed to proceed.\n */\n\nconst hasAuthorization = (req, res, next) => {\n  /*\n  The req.auth object is populated by express-jwt in requireSignin after authentication verification, while req.profile is populated by the userByID function in user.controller.js. \n  */\n  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;\n\n  if (!authorized) {\n    return res.status(\"403\").json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n  /*\n  We will add the hasAuthorization function to routes that require both authentication and authorization.\n  */\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization\n});\n\n//# sourceURL=webpack://mern-simplesetup/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n\n // The create controller function creates a new user with the user JSON object that's received in the POST request from the frontend within req.body.\n\nconst create = async (req, res, next) => {\n  // Attempts to save new user in db after validation check on the data.\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body); // An error or success response is returned to the requesting client.\n\n  try {\n    await user.save();\n    return res.status(200).json({\n      message: \"Successfully signed up\"\n    });\n  } catch (err) {\n    // This controller will make use of the errorHandler helper to respond to route requests with meaningful messages when a Mongoose error occurs.\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n}; // The list controller function finds all the users from the database, populates only the name, email, created, and updated fields in the resulting user list, and then returns this list of users as JSON objects in an array.\n\n\nconst list = async (req, res) => {\n  try {\n    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select(\"name email updated created\");\n    res.json(users);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n}; // Whenever the Express app receives a request to a route that matches a path containing the :userId parameter in it, the app will execute the userByID controller function, which fetches and loads the user into the Express request object, before propagating it to the next function that's specific to the request that came in.\n\n\nconst userById = async (req, res, next, id) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id);\n    if (!user) return res.status(\"400\").json({\n      error: \"User not found\"\n    });\n    req.profile = user; // If a matching user is found in the database, the user object is appended to the request object in the profile key.\n\n    next(); // used to propagate control to the next relevant controller.\n  } catch (err) {\n    return res.status(\"400\").json({\n      error: \"Could not retrieve user\"\n    });\n  }\n}; // The read function retrieves the user details from req.profile and removes sensitive information, such as the hashed_password and salt values, before sending the user object in the response to the requesting client.\n\n\nconst read = (req, res) => {\n  req.profile.hashed_password = undefined;\n  req.profile.salt = undefined;\n  return res.json(req.profile);\n}; // When the Express app gets a PUT request at '/api/users/:userId', similar to read, it loads the user with the :userId parameter value before executing the update controller function.\n\n\nconst update = async (req, res) => {\n  try {\n    let user = req.profile; // retrieves the user details from req.profile\n    // & merge the changes that came in the request body to update the user\n\n    user = Object.assign(user, req.body);\n    user.updated = Date.now(); // Add the last updated timestamp.\n\n    await user.save(); // Upon successfully saving, the updated user is\n\n    user.hashed_password = undefined; // cleaned by removing hashed_password\n\n    user.salt = undefined; // & slat before\n\n    res.json(user); // sending the user object in response to the request.\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n}; // The remove function retrieves the user from req.profile and uses the remove() query to delete the user from the database. On successful deletion, the requesting client is returned the deleted user object in the response.\n\n\nconst remove = async (req, res) => {\n  try {\n    let user = req.profile;\n    let deletedUser = await user.remove();\n    deletedUser.hashed_password = undefined;\n    deletedUser.salt = undefined;\n    res.json(deletedUser);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  list,\n  userById,\n  read,\n  update,\n  remove\n});\n\n//# sourceURL=webpack://mern-simplesetup/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../template */ \"./template.js\");\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n/*... CONFIGURE [express]... */\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json()); // body-parsing middleware\n// app.use(express.urlencoded({ extended: true })); // FIXME:\n\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_1___default()()); // parse and set cookies in request objects.\n\napp.use(compression__WEBPACK_IMPORTED_MODULE_2___default()()); // compress response bodies for all requests\n\napp.use(helmet__WEBPACK_IMPORTED_MODULE_4___default()()); // help secure Express apps by setting various HTTP headers.\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_3___default()()); // enable cross-origin resource sharing (CORS)\n\napp.use(\"/\", _routes_user_routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\napp.use(\"/\", _routes_auth_routes__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\napp.get(\"/\", (req, res) => {\n  res.status(200).send((0,_template__WEBPACK_IMPORTED_MODULE_7__[\"default\"])());\n});\n/* ... AUTH ERROR HANDLING FOR [express-jwt] ... \n\nTo handle auth-related errors thrown by express-jwt when it tries to validate JWT tokens in incoming requests, we need to add the following error-catching code \n*/\n\napp.use((err, req, res, next) => {\n  // express-jwt throws an error named UnauthorizedError when a token cannot be validated for some reason.\n  if (err.name === \"UnauthorizedError\") {\n    // We catch this error here to return a 401 status back to the requesting client.\n    res.status(401).json({\n      error: err.name + \": \" + err.message\n    });\n  } else if (err) {\n    // We also add a response to be sent if other server-side errors are generated and caught here.\n    res.status(400).json({\n      error: err.name + \": \" + err.message\n    });\n    console.log(err);\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://mern-simplesetup/./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getErrorMessage = err => {\n  let message = \"\";\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = \"Something went wrong\";\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) message = err.errors[errName].message;\n    }\n  }\n\n  return message;\n};\n/* Errors that are not thrown because of a Mongoose validator violation will contain an associated error code. In some cases, these errors need to be handled differently. For example, errors caused due to a violation of the unique constraint will return an error object that is different from Mongoose validation errors. The unique option is not a validator but a convenient helper for building MongoDB unique indexes, so we will add another getUniqueErrorMessage method to parse the unique constraint-related error object and construct an appropriate error message. */\n\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf(\".$\") + 2, err.message.lastIndexOf(\"_1\"));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + \" already exists\";\n  } catch (ex) {\n    output = \"Unique field already exists\";\n  }\n\n  return output;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getErrorMessage\n});\n\n//# sourceURL=webpack://mern-simplesetup/./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n // specify the properties or structure of each document in a collection.\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: {\n    type: String,\n    trim: true,\n    required: \"Name is required\"\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: \"Email already exists\",\n    match: [/.+\\@.+\\..+/, \"Please fill a valid email address\"],\n    required: \"Email is required\"\n  },\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date,\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String\n});\n/* \nThe password string that's provided by the user is not stored directly in the user document. Instead, it is handled as a virtual field.\n\nWhen the password value is received on user creation or update, it is encrypted into a new hashed value and set to the hashed_password field, along with the\nunique salt value in the salt field.*/\n\nUserSchema.virtual(\"password\") // TODO: EXPLORE FURTHER\n.set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n});\n/* The encryption logic and salt generation logic, which are used to generate the hashed_password and salt values representing the password value, are defined as UserSchema methods.*/\n\nUserSchema.methods = {\n  // verify sign-in attempts by matching the user-provided password text with the hashed_password stored in the database\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  // used to generate an encrypted hash from the plain-text password and a unique salt value using the crypto module from Node.\n  encryptPassword: function (password) {\n    if (!password) return \"\";\n\n    try {\n      // use the SHA1 hashing algorithm and createHmac from crypto to generate the cryptographic HMAC hash from the password text and salt pair.\n      return (// to ensure two users don't end up with the same hashed password if they happen to use the same password text, we pair each password with a unique salt value. Also makes it difficult to guess.\n        crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac(\"sha1\", this.salt).update(password).digest(\"hex\")\n      );\n    } catch (err) {\n      return \"\";\n    }\n  },\n  // generates a unique and random salt value using the current timestamp at execution and Math.random().\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + \"\";\n  }\n};\n/* adding custom validation to check the password value before Mongoose attempts to store the hashed_password value. */\n\nUserSchema.path(\"hashed_password\").validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate(\"password\", \"Password must be at least 6 characters.\");\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate(\"password\", \"Password id required\");\n  }\n}, null);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema));\n\n//# sourceURL=webpack://mern-simplesetup/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router(); //  POST request to authenticate the user with their email and password.\n\nrouter.route(\"/auth/signin\").post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route(\"/auth/signout\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout); // GET request to clear the cookie containing a JWT that was set on the response object after sign-in.\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://mern-simplesetup/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\n // declaring API endpoints that correspond to user CRUD operations.\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/api/users\").get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create); // The route to read a user's information only needs authentication verification, whereas the update and delete routes should check for both authentication and authorization before these CRUD operations are executed.\n\nrouter.route(\"/api/users/:userId\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove); // configure the Express router so that it handles the userId parameter in a requested route by executing the userByID controller function.\n\nrouter.param(\"userId\", _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userById);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://mern-simplesetup/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n\n\n\n(mongoose__WEBPACK_IMPORTED_MODULE_0___default().Promise) = global.Promise;\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mongoUri);\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on(\"error\", () => {\n  throw new Error(`unable to connect to database: ${_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mongoUri}`);\n});\n_express__WEBPACK_IMPORTED_MODULE_2__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info(\"Server started on port %s.\", _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port);\n});\n\n//# sourceURL=webpack://mern-simplesetup/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  return `<!doctype html>\n<html lang=\"en\"> \n    <head>\n        <meta charset=\"utf-8\">\n        <title>MERN Skeleton</title>\n    </head>\n    <body>\n        <div id=\"root\">Hello World</div>\n    </body> \n</html>`;\n});\n\n//# sourceURL=webpack://mern-simplesetup/./template.js?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;