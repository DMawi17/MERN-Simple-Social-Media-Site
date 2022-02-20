import mongoose from "mongoose";

// specify the properties or structure of each document in a collection.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    email: {
        type: String,
        trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required",
    },
    salt: String,
});

/* 
The password string that's provided by the user is not stored directly in the user document. Instead, it is handled as a virtual field.

When the password value is received on user creation or update, it is encrypted into a new hashed value and set to the hashed_password field, along with the
unique salt value in the salt field.*/
UserSchema.virtual("password") // TODO: EXPLORE FURTHER
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/* The encryption logic and salt generation logic, which are used to generate the hashed_password and salt values representing the password value, are defined as UserSchema methods.*/
UserSchema.methods = {
    // verify sign-in attempts by matching the user-provided password text with the hashed_password stored in the database
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    // used to generate an encrypted hash from the plain-text password and a unique salt value using the crypto module from Node.
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            // use the SHA1 hashing algorithm and createHmac from crypto to generate the cryptographic HMAC hash from the password text and salt pair.
            return (
                // to ensure two users don't end up with the same hashed password if they happen to use the same password text, we pair each password with a unique salt value. Also makes it difficult to guess.
                crypto
                    .createHmac("sha1", this.salt)
                    .update(password)
                    .digest("hex")
            );
        } catch (err) {
            return "";
        }
    },

    // generates a unique and random salt value using the current timestamp at execution and Math.random().
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};

/* adding custom validation to check the password value before Mongoose attempts to store the hashed_password value. */
UserSchema.path("hashed_password").validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password id required");
    }
}, null);

export default mongoose.model("User", UserSchema);
