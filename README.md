<div align="center">

  ### Online writing that just works.

</div>

This is repo for the Front End codebase of Scribe.

## Docs
- [Contributing](#contributing)
  - [Codebase](#codebase)
    - [Technologies](#technologies)
    - [Folder Structure](#folder-structure)
    - [Code Style](#code-style)
  - [First time setup](#first-time-setup)
  - [Running the app locally](#running-the-app-locally)

## Contributing
_this repo is NOT in a position to be contributed too outside of the core team._

Regardless, this codebase is in good working condition. While the project is in its infancy, the folder stucture will most likely change often.

## Codebase

#### Technologies

- **JavaScript**: We use Node.js to power the light express server, and React to power our frontend. All of the code you'll touch in this codebase will be JavaScript.

List of other tech that is used
- **GraphQL/Apollo**: API Client using Apollo
- **React**: Frontend
- **SlateJS**: WSYIWYG Editor
- **emotionJS**: CSS-in-JS
- **Loadable**: Code Splitting
- **offline-plugin**: Service Worker

- **Flow**: Typing (soon)


#### Folder Structure
```
spectrum/
├── __mocks__     # Mock functions (etc) for Testing
├── assets        # Static assets 
├── components    # Reusable Components
├── hoc           # Higher Order Components
├── mutations     # GraphQL Mutations
├── pages         # A View (/[something]) built from components 
├── queries       # GraphQL Queries
├── services      # Utils-Like folder
├── stores        # MST Stories+Models
├── shared        # Shared JavaScript code
├── styled        # CSS-in-JS (emotion) files  
├────── system    # Folder for styling primitives
└──────────────────────────────────────────────────────
```
