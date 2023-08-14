# Wallet Guard Snap

<img src='https://cdn.walletguard.app/extension-assets/snap/snap-preview.png' height='300px' align='right' >

<br>
<br>
Protect your crypto. This Snap supports transaction simulation and automated approval revoking reminders for the user. Stop guessing about your transactions when performing swaps, claims, and mints!

<br clear="all">

## Installation Guide

### Published build *(recommended)*

Please visit https://walletguard.app/snap for everything you need to get started using this Snap.

All latest releases are deployed to [NPM](https://www.npmjs.com/package/wallet-guard-snap)

### Local Usage (Developer contributions welcome)

1. Install MetaMask Flask https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk
2. Setup wallet
3. Install Snap - Run `yarn start` in the root directory
4. Follow install process at `http://localhost:8000`
5. Installation complete! You may now go test transactions on OpenSea, Uniswap, etc.

## Features

### ⚡️Transaction insights

Get advanced insights on your transactions, including built-in security measures. Our transaction insights are powered by the same security engine that keeps
our [25,000+ Chrome Extension users safe!](https://chrome.google.com/webstore/detail/wallet-guard-protect-your/pdgbckgdncnhihllonhnjbdoighgpimk)

Note- At this time signatures are not yet supported by MetaMask Snaps, only transactions. We will add this feature immediately once it is supported!

<img src='https://cdn.walletguard.app/extension-assets/snap/txn_with_warnings.png' height='450px' >

### ✅ Automated security notifications

Get notifications about revoking your assets, directly in MetaMask. This feature is optional.

Automated approval revoking is setup from `dashboard.walletguard.app` by connecting your wallet or inputting your wallet address, no signature necessary.

<img src='https://cdn.walletguard.app/extension-assets/snap/notifications.png' height='300px' >

## Audit

The `snap` package has been audited by [Consensys Diligence.](https://consensys.io/diligence/)

You can view the [full audit report findings here.](https://consensys.io/diligence/audits/2023/07/wallet-guard/)

## Permissions

This Snap requires several permissions in order to access the necessary APIs for functionality. To view the entire list of permissions, view the [manifest.json.](https://github.com/wallet-guard/wallet-guard-snap/blob/main/packages/snap/snap.manifest.json)

<img src='https://cdn.walletguard.app/extension-assets/snap/snap-permissions.png' height='300px'  >

## Testing

### Usage

Tests are run against the Snap build located in the `dist/` folder. To run the tests follow these instructions:

1. `yarn build:clean`
2. `yarn test`
3. (optional) `yarn test:coverage`

The project must be re-built in order re-test changes of the Snap build.

### Description

1. Unit tests: Tests of individual components and their input/outputs (e.g- `RevertComponent.test.ts`)
2. Integration Tests: Testing the end-to-end integrations and external dependencies. For example the Wallet Guard transaction simulation API and it's responses are mocked out in `index.test.ts`. Assertions are made on the outcome and sum of the components, rather than logic within those components.

## Dev Standards / Best Practices

### Components

UI elements must be organized by components. Ideally we should unit test the component itself along with the
e2e functionality where that component is being used.

Components must have the name `Component` in the filename and function name for clarity. Components should be functions so that we have the option to pass in parameters.

### Well-tested code

This project uses the Metamask Snaps Testing SDK and Jest for testing. We also use SonarCloud to manage code coverage and quality. (60% minimum on PRs)

Right the Metamask Snaps Testing SDK does not include code coverage for certain files/APIs such as `index.ts` but we have made sure to build strong test cases here.
