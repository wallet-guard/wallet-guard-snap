# Wallet Guard Snap

This Snap supports transaction simulation and automated approval revoking reminders for the user. At this time signatures are not yet supported by Snaps, so it is only transactions. Automated approval revoking is setup from `walletguard.app/onboarding` (not yet public) by connecting your wallet or inputting your wallet address, no signature necesary.

# Installation Guide

TODO

# Dev Standards

## Components

UI elements must be organized by components. Ideally we should unit test the component itself along with the
e2e functionality where that component is being used.

Components must have the name `Component` in the filename and function name for clarity. Components should be functions so that we have the option to pass in parameters.
