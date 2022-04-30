const auth = {
	// SAVING CREDENTIALS:
	authenticate(jwt, cb) {
		if (typeof window !== "undefined")
			sessionStorage.setItem("jwt", JSON.stringify(jwt));
		cb();

		// It stores the credentials in sessionStorage after ensuring window is defined, in other words ensuring this code is running in a browser and hence has access to sessionStorage. Then, it executes the callback function that is passed in.

		// This callback will allow the component – in our case, the component where sign-in is called – to define actions that should take place after successfully signing in and storing credentials.
	},

	// RETRIEVING CREDENTIALS:
	isAuthenticated() {
		if (typeof window == "undefined") return false;

		if (sessionStorage.getItem("jwt"))
			return JSON.parse(sessionStorage.getItem("jwt"));
		else return false;

		// A call to isAuthenticated() will return either the stored credentials or false, depending on whether credentials were found in sessionStorage.
	},

	// DELETING CREDENTIALS:
	clearJWT(cb) {
		if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
		cb();

		signout().then((data) => {
			document.cookie =
				"t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		});

		// This clearJWT method takes a callback function as an argument, and it removes the JWT credential from sessionStorage. The passed in cb() function allows the component initiating the signout functionality to dictate what should happen after a successful sign-out.
	},

	// With these three methods, we now have ways of storing, retrieving, and deleting JWT credentials on the client-side.
};
