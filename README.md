# Unravl
Front-End client for Unravl

# Machine Requirements
- yarn@latest (optional but preferred)
- ^ otherwise, npm 

# Setup Instructions
1. yarn | npm install
2. yarn start | npm start to spinup webpack dev server/live reloading/etc
3. yarn build | npm build to create production bundle

# Styling 
We use `emotion` & `react-emotion` for styling
Flex Grid components are taken from `grid-styled/emotion`

App-wide emotion components (buttons, input, cards, etc) are located in `styled/_system/.`
Component specific *emotion components* are located in `styled/.` where the filename corresponds with the component file name 

# Project Structure
---
`[dir] assets`: Folder for fonts, pictures, etc

`[dir] components`: Reusable components here

`[dir] hoc`: Folder for higher-order-components

`[dir] mutations`: GraphQL mutations folder

`[dir] pages`: Think of this as a url specific page, we are Presenting the components here

`[dir] queries`: GraphQL queries folder

`[dir] services`: Folder for things like the Apollo Client

`[dir] stores`: Folder for all MST stores

`[dir] styled`: Folder for all app styling

`[file] src/index.js`: The project root, import the root-most component from Components/App.js

`[file] src/components/App.js`: The root-most component. This will hold the routing, presentational components, store init, etc

# Commit Structure (Prepending commit message)
`Feat: [desc]` If commit contains a new feature or addition

`Fix: [desc]` If commit fixes something

`Chore: [desc]` If it is something small that feels like a chore to do

`Change: [desc]` If the commit is nothing major, to a number of files, you could probably do this