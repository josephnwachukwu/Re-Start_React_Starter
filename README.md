# OCCM PolarisUI

## Deployed Demo

This repository is continuously integrated and deployed

http://devopspolarisui.azurewebsites.net

## Local Setup Instructions

### Prerequisites

The following items are necessary in order run the code in this repository
- [Git](http://git-scm.com) installed on your computer
- [Node & NPM](http://nodejs.org) installed on your computer

### Clone Repository
```
git clone https://occm.visualstudio.com/_git/PolarisUI
```

### Navigate into PolarisUI

```
cd PolarisUI
```

### Install Dependencies
```
npm install
```

### Start Development Server
```
npm run start
```

*Devlopment build viewable at [http://localhost:8080](http://localhost:8080)*

### Generate Production Build
```
npm run build
```

Generates a production build of the source code in the `dist/` folder

### Serve Production Build

You can view the production build locally by running the distribution server

```
npm run serve-dist
```

*Production build viewable at [http://localhost:3000](http://localhost:3000)*

### Run Unit Tests
```
npm run test
```

### Run linters
```
npm run lint
```

### Using SVG's in the code

This article gives a good explanation of how to incorporate SVGs into your code and it's what we followed.
https://diessi.ca/blog/svg-images-as-react-components-with-webpack/

### Unit testing resources

#### Mocha - unit test runner
https://mochajs.org

#### Assertions - BDD style
http://chaijs.com/api/bdd

#### Spies and Stubs - for mocking functions
http://sinonjs.org

#### Proxyquire - injecting mock modules
https://github.com/thlorenz/proxyquire
https://engineering.thetrainline.com/2016/07/22/use-proxyquire-to-mock-your-react-components

#### Enzyme - React testing utils
http://airbnb.io/enzyme

