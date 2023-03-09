# ConvoCode
![Team Picture](https://user-images.githubusercontent.com/62563421/223548294-635764a2-0834-4abe-873c-dfdc268417ff.jpg)

## About the Site
ConvoCode is a community hub to ignite curiosity and conversation around AI coding possibilities. Whether you're a software developer, a researcher, an entrepreneur, or simply interested in the future of technology, we invite you to join the #ConvoCode community in exploring this fascinating topic.
View our mockups below and read more about ConvoCode in our [medium article](https://medium.com/@will.perez2026/94ba8195c8cc).

<img width="1668" alt="Screenshot 2023-03-07 at 3 51 08 PM" src="https://user-images.githubusercontent.com/62563421/223549912-97be5043-52cd-4e5d-a436-617812c7a723.png">
<img width="1792" alt="Screenshot 2023-03-07 at 3 52 52 PM" src="https://user-images.githubusercontent.com/62563421/223549923-2f9a40d9-852e-49d0-9ace-fd632bfe612f.png">
<img width="1478" alt="Screenshot 2023-03-07 at 3 53 31 PM" src="https://user-images.githubusercontent.com/62563421/223549999-727a7b06-4347-4c15-b67e-57942ea74837.png">

## Setup

You must have [Node](https://nodejs.org) and [yarn](https://yarnpkg.com/) installed to run this project.

1. Clone the repository
2. `yarn install`
3. `yarn start` to run in the local development environment

## Architecture

This web site uses [React.js](https://reactjs.org/) bundled with [webpack](https://webpack.js.org/). We use [react-redux](https://react-redux.js.org/) for persistent state management, and [react-router](https://reactrouter.com/) for internal routing.

### Stack
* React.js frontend
* Node.js backend

### Packages
* `create-react-app` -> used to generate scaffolding for React.js frontend 
* `redux` -> JavaScript library for managing and centralizing application state
* `axios` -> Promise based HTTP client for the browser and node.js
* `@monaco-editor/react` -> Monaco package for code editor component
* `formik`-> a small group of React components and hooks for building forms in React
* `yup`-> Object schema validation
* `react-iframe`-> Simple React component for including an iframed page

### APIs
* `Judge0 CE` -> compiler API for running code in the IDE 
    * Documentation: https://ce.judge0.com/
* `OpenAI Codex` -> text to code AI generation model
   * Documentation: https://openai.com/blog/openai-codex

## Repository Structure

```
src/
	components/		[reusable components across several screens]
   	resources/              [image files]
	services/		[service files for sending server requests]
	state/			[all redux interactions]
	utils/			[utility functions]
   App.js                     	[main routing file]
   index.js                   	[initialize the redux store and app]
package.json			[package]
```

### Data Flow

Our data flow uses a combination of service files and redux actions. Each request to one of our servers is encapsulated in a function that is stored in a file in the `services/` directory. We use `axios` for sending all server requests. Most service functions are then imported into action files in the `state/actions/` directory. Within an action, we call the service function to fetch data or perform an action, then dispatch actions with the resulting data. The reducers in the `state/reducers/` directory then are invoked when the actions are dispatched, and they update the relevant state.

### Code Style

We use React functional components and hooks in all of our components. We leverage the `useState`, `useEffect`, and `useRef` hooks throughout each of our components. We use async/await for all asynchronous functions.

## Deployment

* The application is deployed frontend and backend on `render`. To view our deployed site, visit [ConvoCode](www.convocode.org). Merging a PR to the `main` branch will trigger an update on the deployed site.

## Authors
![team_bio](https://user-images.githubusercontent.com/62563421/223548865-b1db9d99-50f2-43cd-85d1-d025d7951a0b.jpg)

- Dylan Bienstock
- Lily Maechling
- William Perez
- Abby Owen
- Annie Revers
- Melissa Valencia

## Acknowledgments
CS 98 
Tim Tregubov and Natalie Svoboda
