# Webpack Universal React

[![Dependency Status](https://img.shields.io/david/speziicoz/webpack-universal-react.svg)](https://github.com/speziicoz/webpack-universal-react)
[![devDependency Status](https://img.shields.io/david/dev/speziicoz/webpack-universal-react.svg)](https://github.com/speziicoz/webpack-universal-react)

> React on the Server for Beginners: Build a Universal React and Node App

Install all dependencies & Run the app
```bash
$ npm install
$ npm start

This will install the dependecies and listening on port 3000.
```

Launch your favorite web browser and go to http://localhost:3000

## Deployment

#### Heroku
Before getting started, make sure you already installed the [Heroku Toolbelt](https://toolbelt.heroku.com), which is a command-line tooling for managing Heroku applications that makes it easy to deploy an application in a few steps:

```bash
$ heroku create                     # Create a new Heroku application
$ git push heroku master            # Push your code into the created Heroku repository
$ heroku ps:scale web=1             # Run the deployed application
````

That is it! Now, open the application on your default browser using `heroku open`.