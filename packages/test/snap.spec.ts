/* eslint-disable jsdoc/require-jsdoc */
import { exec } from 'child_process';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const dappeteer = require('@chainsafe/dappeteer');
// import dappeteer from '@chainsafe/dappeteer';

async function buildSnap(): Promise<string> {
  console.log(`Building my-snap...`);

  await new Promise((resolve, reject) => {
    exec(`cd ../../ && yarn build`, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout);
    });
  });

  return '../../dist';
}

async function main() {
  // build your local snap
  const builtSnapDir = await buildSnap();

  console.log('Build successful', builtSnapDir);

  // setup dappateer and install your snap
  // dappeteer.initSnapEnv({
  //   installationSnapUrl
  // })
  const { metaMask, snapId, browser } = await dappeteer.initSnapEnv({
    // installationSnapUrl: 'https://www.npmjs.com/package/wallet-guard-snap',
    snapIdOrLocation: 'wallet-guard-snap',
  });

  console.log('Snap env initialized');

  // you need to have a webpage open to interact with MetaMask, you can also visit a dApp page
  const dappPage = await browser.newPage();
  await dappPage.goto('http://example.org/');

  console.log('Invoking snap');

  // invoke a method from your snap that prompts users with approve/reject dialog
  await metaMask.snaps.invokeSnap(dappPage, snapId, 'my-method');

  // instruct MetaMask to accept this request
  await metaMask.snaps.dialog.accept();

  // get the notification emitter and the promise that will receive the notifications
  const emitter = await metaMask.snaps.getNotificationEmitter();
  const notificationPromise = emitter.waitForNotification();

  // do something that prompts your snap to emit notifications
  await metaMask.snaps.invokeSnap(dappPage, snapId, 'notify');

  // Make sure the notification promise has resolved
  await notificationPromise;

  // You can now read the snap notifications and run tests against them
  const notifications = await metaMask.snaps.getAllNotifications();

  expect(notifications.length).toEqual(1);
}

main();
