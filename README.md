# Feature breakdown

In the skeleton application, we will add the following use cases with user CRUD and auth functionality implementations:

## Sign up

    Users can register by creating a new account using an email address.

## User list

    Any visitor can see a list of all registered users. 

## Authentication

    Registered users can sign-in and sign-out.

## Protected user profile

    Only registered users can view individual user details after signing in.

## Authorized user edit and delete

    Only a registered and authenticated user can edit or remove their own user account details.

<hr/>

## User model

- The user model handle user-related business logic such as password encryption and user data validation.
- The user model for this skeletal version will be basic with support for the following attributes:

| Field name | Type | Description |
| --- | --- | --- |
| name | String | Required field to store the user's name. |
| email | String | Required unique field to store the user's email and identify each account (only one account allowed per unique email |
| password | String | A required field for authentication. The database will store the encrypted password and not the actual string for security purposes. |
| created | Date | Automatically generated timestamp when a new user account is created. |
| updated | Date | Automatically generated timestamp when existing user details are updated. |

## API endpoints for user CRUD

To enable and handle user CRUD operations on the user database, the backend will implement and expose API endpoints that the frontend can utilise in the views, as follows:

| Operation | API route | HTTP method |
| --- | --- | --- |
| Create a user | /api/users | POST |
| List all users | /api/users | GET |
| Fetch a user | /api/users/:userId | GET |
| Update a user | /api/users/:userId | PUT |
| Delete a user | /api/users/:userId | DELETE |
| User sign-in | /auth/signin | POST |
| User signout (optional) | /auth/signout | GET |

- Some of these user CRUD operations will have protected access, which will require the requesting client to be authenticated, authorized, or both, as defined by the feature specifications.
- The last two routes in the table are for authentication
- We will use the JWT mechanism to implement these authentication features.

<hr/>

# Summary

In this chapter, we developed a fully functioning standalone server-side application using Node, Express, and MongoDB and covered the first part of the MERN skeleton application. In the backend, we implemented a user model for storing user data, implemented with Mongoose; user API endpoints to perform CRUD operations, which were implemented with Express; and user auth for protected routes, which was implemented with JWT and express-jwt.

We also set up the development flow by configuring Webpack so that it compiles ES6+ code using Babel. We also configured Nodemon so that it restarts the server when the code changes. Finally, we checked the implementation of the APIs using the Advanced Rest API Client extension app for Chrome.

Now, we are ready to extend this backend application code and add the React frontend, which will complete the MERN skeleton application. We will do this in the next chapter.