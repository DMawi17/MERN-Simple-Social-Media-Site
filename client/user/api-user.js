// CREATING A USER:
const create = async (user) => {
    try {
        let response = await fetch("/api/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        // Return the response from the server as a promise.
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// LISTING USERS:
const list = async (signal) => {
    try {
        let response = await fetch("/api/users", {
            method: "GET",
            signal: signal,
        });
        // if it resolve successfully will give the component an array of user objects that was retrieved from the db.
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// READING A USER PROFILE:
const read = async (params, credentials, signal) => {
    try {
        let response = await fetch("/api/users/" + params.userId, {
            method: "GET",
            signal: signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
                // The JWT is attached to the GET fetch call in the Authorization header using the Bearer scheme.
            },
        });
        return await response.json();
        // When resolves will either give the component the user details or notify that access is restricted to authenticated user.
    } catch (err) {
        console.log(err);
    }
};

// UPDATING A USER'S DATA:
const update = async (params, credentials, user) => {
    // will take changed user data from the view component for a specific user, then use fetch to make a PUT call to update the existing user in the backend.
    try {
        let response = await fetch("/api/users" + params.userId, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
                // This is also a protected route that will require a valid JWT as the credential.
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// DELETING A USER:
const remove = async (params, credentials) => {
    try {
        let response = await fetch("/api/users" + params.userId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials.t,
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { create, list, read, update, remove };
