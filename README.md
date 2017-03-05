# Re-Start React Starter
## React Starter/Boilerplate for Scaffolding apps


## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── config                          # Project and build configurations
│   ├── webpack.build.prod.js       # Server application entry point
│   ├── webpack.js                  # Server application entry point
│   ├── webpack.serve.dev.js        # Server application entry point
│   ├── webpack.serve.prod.js       # Server application entry point
│   └── mocha-multi-reporters.json  # 
├── src                             # Application source code
│   ├── index.html                  # Main HTML page container for app
│   ├── index.js                    # Application Entry Point and Route Definition
│   ├── index.css                   # Main CSS for the app
│   ├── app                         # Components that dictate major page structure
│   │   ├── Dashboard               # Dashboard Page
│   │   ├── Home                    # Home Page
│   │   ├── MainLayout              # Main Template for layout
│   │   └── NotFound                # Not Found Page
│   │   └── Shared                  # Shared Re-usable Components
│   ├── static                      # Main route definitions and async split points
│   │   └── images                  # Images for the app
│   │   │   └── favicon.ico         # Favicon for the app
│   │   ├── theme                   # Assets for the app
│   │   │   ├── fonts               # Assets required to render components
│   │   │   ├── index.js   # Presentational React Components
│   │   │   └── variables.js        # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── Theme                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```
