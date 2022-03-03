# Interview Scheduler

A single-page web app that allows the user to book, edit, or cancel appointments for students with a given list of interviewers.

Multiples slots are available for each workday of the week.

A deployed version can be found Netflify [**HERE**](https://condescending-mirzakhani-923f54.netlify.app/).

_Note: The deployed version make take a few seconds to load since the Heroku-hosted server takes some time to initialize if it's been left dormant._

## Features

### Appointment Slots

Five appointments per day are available Monday through Friday.

!["Main app"](https://github.com/leepavelich/scheduler/blob/master/docs/main-app.png?raw=true)

### Booking an Appointment

The user selects an available slot and can enter the student's name and select an interviewer.

![Booking an appointment](https://github.com/leepavelich/scheduler/blob/master/docs/book-appointment.png?raw=true)

![Booking an appointment - completed](https://github.com/leepavelich/scheduler/blob/master/docs/book-appointment-complete.png?raw=true)

### Editing an Appointment

Clicking on an existing appointment allows the student's name and interviewer to be updated.

![Editing an appointment](https://github.com/leepavelich/scheduler/blob/master/docs/edit-appointment.png?raw=true)

![Editing an appointment - active](https://github.com/leepavelich/scheduler/blob/master/docs/edit-appointment-editing.png?raw=true)

### Canceling an Appointment

The user can also cancel an appointment by clicking on the trash can icon next to the edit icon.

![Canceling an appointment](https://github.com/leepavelich/scheduler/blob/master/docs/cancel-appointment.png?raw=true)

## Testing

End-to-end testing with Cypress

![Cypress Testing](https://github.com/leepavelich/scheduler/blob/master/docs/cypress-testing.png?raw=true)

Unit and integration testing with Jest

![Jest Testing](https://github.com/leepavelich/scheduler/blob/master/docs/jest-coverage.png?raw=true)

UI testing with Storybook

![Storybook testing](https://github.com/leepavelich/scheduler/blob/master/docs/storybook.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Cypress Test Framework

```sh
npm run cypress
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Tech Stack

### Front-end

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/docs/intro)

### Back-end

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostreSQL](https://www.postgresql.org/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - Optional (interferes with testing, set with `TESTING_MODE` flag set to `false` in `/src/hooks/useApplicationData.jsx`)

### Testing

- [Cypress](https://www.cypress.io/) - End-to-end
- [Jest](https://jestjs.io/) - Unit and integration
- [Storybook](https://storybook.js.org/docs/react/writing-tests/introduction) - UI

### Cloud Services

- [CircleCI](https://circleci.com/) - Continuous integration
- [Heroku](https://www.heroku.com/) - Database API hosting
- [Netlify](https://www.netlify.com/) - Serverless backend
