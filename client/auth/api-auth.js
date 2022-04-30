// SING-IN:

// The component invoking this method needs to handle the response appropriately, such as storing the received JWT locally so it can be used when making calls to other protected API routes from the frontend.

const signin = async (user) => {
    try {
        let response = await fetch("/auth/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
        return await response.json();
        // may provide the JWT if sign-in was successful.
    } catch (err) {
        console.log(err);
    }
};

// SING-OUT

// Use fetch to make a GET call to signout API endpoint on the server.
const signout = async () => {
    try {
        let response = await fetch("/auth/signout", {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { signin, signout };
