// These variables will give us the flexibility to change values from a single file and use it across the backend code.

const config = {
    env: process.env.NODE_ENV || 'development', // differentiate b/n dev & prod
    port: process.env.PORT || 3000, // define the listening port for the server
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key', // used to sign JWT
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGODB_PORT || '27017') + '/mernproject' // location of the MongoDB database instance
}

export default config