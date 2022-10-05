# ConvoCode

## Tech Stack
- [React v17](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [eslint v7](https://eslint.org/)
- [axios](https://github.com/axios/axios)
- [React Router](https://reactrouter.com/)
- [Babel](https://babeljs.io/)

## Directory Structure
The included directory structure is a **template only** – feel free to adapt accordingly for your project.

    .
    ├── ...         
    ├── src                    
    │   └── components         # reusable components across several screens
    │   └── containers         # individual pages
    │   └── hocs               # contains React higher-order components
    │   └── store              # Redux store and setup
    |     └── actionCreators   # actions
    |     └── reducers         # reducers
    |     └── requests         # backend server API calls
    │   └── utils              # utility folder containing helper files
    ├── .eslintrc.json         # eslint setup
    ├── webpack.config.js      # webpack setup
    ├── package.json           # npm config
    └── ...

## Setup
1. Install [Homebrew](https://brew.sh/) if you don't already have Homebrew installed.
2. `brew install node` if you don't already have node.
3. `brew install watchman` if you don't already have watchman.
4. `yarn install` to install the dependencies.
5. `yarn dev` to start the development environment.