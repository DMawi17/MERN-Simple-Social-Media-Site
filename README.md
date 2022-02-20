```sh
    $ yarn development # This command will get Nodemon, Webpack, and the server started for development.
``` 

```sh
    $ yarn build  # This will generate the client and server code bundles for production mode (before running this script, make sure to remove the devBundle.compile code from server.js).
```

```sh
    $ yarn start # This command will run the bundled code in production.
```


# Summary

In this chapter, we discussed development tool options and how to install MERN technologies, and then we wrote code to check whether the development environment is set up correctly.

We began by looking at the recommended workspace, IDE, version control software, and browser options suitable for web development. You can select from these options based on your preferences as a developer.

Next, we set up the MERN stack technologies by first installing MongoDB, Node, and Yarn, and then adding the remaining required libraries using Yarn.

Before moving on to writing code to check this setup, we configured Webpack and Babel to compile and bundle code during development, and to build production- ready code. We learned that it is necessary to compile the ES6 and JSX code that is used for developing a MERN application before opening the application on browsers.

Additionally, we made the development flow efficient by including React Hot Loader for frontend development, configuring Nodemon for backend development, and compiling both the client and server code in one command when the server is run during development.

In the next chapter, we will use this setup to start building a skeleton MERN application that will function as a base for full-featured applications.