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
