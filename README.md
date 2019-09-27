<h1 align="right">
  <img height=75 src="./docs/assets/readme-header.png" alt="D3 data visualizations">
</h1>

<p align="center">
  <em>D3 data visualizations sandbox application</em>
</p>

## ⚙️ Setup

```
npm install
npm start
```

## Testing workflows

The project includes 3 types of testing: static linting, unit testing and
acceptance testing.

- _Static linting_ uses ESLint with the `eslint-config-eloquence` ruleset.
  - `npm run test:lint`
- _Unit testing_ uses Jest with `@testing-library/react` and is configured in
  `jest.config.js`
  - `npm run test:unit`
  - `npm run test:watch`
- _Acceptance testing_ uses Cypress inside of a Docker Compose environment
  - `npm run test:acceptance`

## Development workflows

Start the webpack development server

```
npm start
```

## Formatting

All JS, JSON, SCSS and markdown files are required to be formatted by Prettier
and can be formatted using the `format` npm command.
