# Wallet Guard Snap

<img src='https://cdn.walletguard.app/extension-assets/snap/snap-preview.png' height='300px' align='right' >

<br>
<br>
Protect your crypto. This Snap supports transaction simulation and automated approval revoking reminders for the user. Stop guessing about your transactions when performing swaps, claims, and mints!

<br clear="all">

## Installation

Please visit https://walletguard.app/snap for everything you need to get started using this Snap.

If you are a developer, you can follow the [local installation guide.](https://github.com/wallet-guard/wallet-guard-snap/tree/main/packages/snap#installation-guide)

## Features

### Transaction insights

Get advanced insights on your transactions, including built-in security measures. Our transaction insights are powered by the same security engine that keeps
our [100,000+ Chrome Extension users safe!](https://chrome.google.com/webstore/detail/wallet-guard-protect-your/pdgbckgdncnhihllonhnjbdoighgpimk)

Note- At this time signatures are not yet supported by MetaMask Snaps, only transactions. We will add this feature immediately once it is supported!

<img src='https://cdn.walletguard.app/extension-assets/snap/txn_with_warnings.png' height='450px' >

### Automated security notifications

Get notifications about revoking your assets, directly in MetaMask. This feature is optional.

Automated approval revoking is setup from `dashboard.walletguard.app` by connecting your wallet or inputting your wallet address, no signature necessary.

<img src='https://cdn.walletguard.app/extension-assets/snap/notifications.png' height='300px' >

## Audit

The `snap` package has been audited by [Consensys Diligence.](https://consensys.io/diligence/)

You can view the [full audit report findings here.](https://consensys.io/diligence/audits/2023/07/wallet-guard/)

## Permissions

This Snap requires several permissions in order to access the necessary APIs for functionality. To view the entire list of permissions, view the [manifest.json.](https://github.com/wallet-guard/wallet-guard-snap/blob/main/packages/snap/snap.manifest.json)

<img src='https://cdn.walletguard.app/extension-assets/snap/snap-permissions.png' height='300px' >

## Monorepo

This is a monorepo that contains 2 applications, listed under `projects`.

1. Site - used for local installation / development / testing
2. Snap - deployed to [NPM](https://www.npmjs.com/package/wallet-guard-snap)

## Usage

Running both projects is only necessary for development purposes. Running `yarn` and `yarn start` is how you run both.

For more information about installation and testing of the snap, visit the [Snap package Installation Guide](https://github.com/wallet-guard/wallet-guard-snap/tree/main/packages/snap#installation-guide)
