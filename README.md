# Wallet Guard Snap

This Snap supports transaction simulation and automated approval revoking reminders for the user. At this time signatures are not yet supported by Snaps, so it is only transactions. Automated approval revoking is setup from `dashboard.walletguard.app` by connecting your wallet or inputting your wallet address, no signature necesary.


## Monorepo
This repository contains 2 applications, listed under `projects`.

1. Site
2. Snap

## Installation

### MetaMask (recommended)

Snaps are not yet live within the MetaMask extension, but they are expected to launch in September 2023. You can join the email waitlist for our snap from the below landing page.

Snaps Page: https://walletguard.app/snap

### Local Install

Please follow the steps listed in the [Snap package](https://github.com/wallet-guard/wallet-guard-snap/tree/main/packages/snap) for a guide on installing the Snap locally within MetaMask Flask, which is the canary/development build of MetaMask.

## Usage

Running both projects is only necessary for development purposes. Running `yarn` and `yarn start` is how you run both.

For more information about installation and testing of the snap, visit the [Snap package](https://github.com/wallet-guard/wallet-guard-snap/tree/main/packages/snap) 

## Features
todo - add screenshots

issue 4.5 from audit

## Permissions

## Audit

The `snap` package has been audited by [Consensys Diligence.](https://consensys.io/diligence/)

You can view the full audit report findings here. (TODO)
