# Wallet Guard Snap

This Snap supports transaction simulation and automated approval revoking reminders for the user. At this time signatures are not yet supported by Snaps, so it is only transactions. Automated approval revoking is setup from `dashboard.walletguard.app` (not yet public) by connecting your wallet or inputting your wallet address, no signature necesary.

## Installation Guide

1. Install MetaMask Flask https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk
2. Setup wallet.
   a. For Wallet Guard internal use - use the `Create a New Wallet` flow
   b. Go through normal onboarding flow, don't worry about backing up the keys
   c. Import the private key of our test wallet
3. Install Snap - 2 options here
   a. By running this project locally (`yarn start` in the root directory)
   b. `https://walletguard.app/snap`
4. Installation complete! You may now go test on Revoke's extension tests, OpenSea, Uniswap, etc.

## Testing

### Usage

Tests are run against the Snap build located in the `dist/` folder. To run the tests follow these instructions:

1. `yarn build`
2. `yarn test`
3. (optional) `yarn test:coverage`

The project must be re-built in order re-test changes of the Snap build.

### Description

1. Unit tests: Tests of individual components and their input/outputs (e.g- `RevertComponent.test.ts`)
2. Integration Tests: Testing the end-to-end integrations and external dependencies. For example the Wallet Guard transaction simulation API and it's responses are mocked out in `index.test.ts`. Assertions are made on the outcome and sum of the components, rather than logic within those components.

## Dev Standards

## Components

UI elements must be organized by components. Ideally we should unit test the component itself along with the
e2e functionality where that component is being used.

Components must have the name `Component` in the filename and function name for clarity. Components should be functions so that we have the option to pass in parameters.
