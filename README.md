
# Re-Start React Starter
## React Starter/Boilerplate for Scaffolding apps

## Key Features
#### Core
* [react](https://github.com/facebook/react)
* [react-router](https://github.com/rackt/react-router)
* [react-dom](https://facebook.github.io/react/docs/react-dom.html)

#### Packing 
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [eslint](http://eslint.org)

#### Testing
* [mocha](https://mochajs.org/)
* [sinon](http://sinonjs.org/)
* [enzyme](https://github.com/airbnb/enzyme)
* [chai](https://github.com/chaijs/chai)
* [husky](https://github.com/typicode/husky) 

#### CSS
* [reflex](leejordan.github.io/reflex/docs/)
* [santize](https://github.com/jonathantneal/sanitize.css/)
* [postcss](https://github.com/postcss/postcss)
* [stylelint](https://www.npmjs.com/package/stylelint)

#### Requests
* [fetch](https://github.com/github/fetch)

## Requirements
* node `7`

## Getting Started

You can create a new project based on `re-start-react-starter` by doing the following:

### Install from source

First, clone the project:

```bash
$ git clone https://github.com/josephnwachukwu/Re-Start_React_Starter.git <my-project-name>
$ cd <my-project-name>
```

Here are all the scripts that you can run

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:8080`. "webpack-dev-server --config \"config/webpack.serve.dev\" --progress --inline".|
|`test`|Runs unit tests with Karma and generates a coverage report. "mocha --require ignore-styles --reporter mocha-multi-reporters --reporter-options configFile=config/mocha-multi-reporters.json tests/ignore-utils.js tests/helpers/setup.js tests/**/*tests.js src/**/*tests.js"|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`serve-dist`|Serves the production verstion fo the app "webpack-dev-server --config \"config/webpack.serve.prod\""|
|`prestart`|Removes Unecessary packages and runs tests "npm run lint && npm run test"|
|`clean`|remove the dist folder "rimraf dist"|
|`build`|Builds the Production version of the app "webpack --config \"config/webpack.build.prod\" --optimize-minimize --progress -p"|
|`lint:js`|Lint all `.js` files. "eslint \"./src\"", [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix). |
|`lint`|Lint all `.js` and `.css` files. "npm run lint:js && npm run lint:css" |
|`lint:css`|Lint and fix all `.css` files. "stylelint \"./src/**/*.css\"", |

### Application Structure

This application strcuture here as a suggestion and can be changed to fit your needs. It is meant to be a guideline.

```
.
├── config                          # Project and build configurations
│   ├── webpack.build.prod.js       # Build for Production
│   ├── webpack.js                  # Main Build for development
│   ├── webpack.serve.dev.js        # Build for dev server
│   ├── webpack.serve.prod.js       # Build for production
│   └── mocha-multi-reporters.json  # 
├── src                             # Application source code
│   ├── index.html                  # Main HTML page container for app
│   ├── index.js                    # Application Entry Point and Route Definition
│   ├── index.css                   # Application-wide styles (generally settings)
│   ├── app                         # Components that dictate major page structure
│   │   ├── Dashboard               # Dashboard Page
│   │   ├── Home                    # Home Page
│   │   ├── MainLayout              # Main Template for layout
│   │   ├── NotFound                # Not Found Page
│   │   └── Shared                  # Shared Re-usable Components
│   └── static                      # Main route definitions and async split points
│       ├── images                  # Images for the app
│       │   └── favicon.ico         # Favicon for the app
│       └── theme                   # Assets for the app
│           ├── fonts               # Fonts for the app
│           ├── index.js            # Setup for the Theme
│           └── variables.js        # CSS variables for colors and Sizes
└── tests                           # Unit tests
```
