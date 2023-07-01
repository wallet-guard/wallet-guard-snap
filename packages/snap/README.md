# Wallet Guard Snap

This Snap supports transaction simulation and automated approval revoking reminders for the user. At this time signatures are not yet supported by Snaps, so it is only transactions. Automated approval revoking is setup from `walletguard.app/onboarding` (not yet public) by connecting your wallet or inputting your wallet address, no signature necesary.

## Installation Guide

TODO

## Testing

### Usage

Tests are run against the Snap build located in the `dist/` folder. To run the tests follow these instructions:

1. `yarn build`
2. `yarn test`
3. (optional) `yarn test:coverage`

The project must be re-built in order re-test changes of the Snap build.

### Description

1. Unit tests: Tests of individual components and their input/outputs (e.g- `RevertComponent.test.ts`)
2. E2E Tests: Testing the end-to-end integrations and external dependencies. For example the Wallet Guard transaction simulation API and it's responses are mocked out in `index.test.ts` and assertions are made on which UI is shown to the user.

## Dev Standards

## Components

UI elements must be organized by components. Ideally we should unit test the component itself along with the
e2e functionality where that component is being used.

Components must have the name `Component` in the filename and function name for clarity. Components should be functions so that we have the option to pass in parameters.
