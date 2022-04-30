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
