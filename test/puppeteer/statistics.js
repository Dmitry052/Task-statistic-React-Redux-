/* eslint-disable function-paren-newline */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const puppeteer = require('puppeteer');
const test = require('ava');
const users = require('./../../configTemp/users');
const conf = require('./../../configTemp/config');

// User data
const userlogin = Object.keys(users)[0];
const userPass = users[userlogin].pass;

// For utils
const browserPage = async function getPage() {
  const { url } = conf.development.test;
  const browser = await puppeteer.launch({
    // args: ['--disable-gpu'],
    headless: true
    // devtools: true
  });
  const page = await browser.newPage();
  await page.goto(url, {
    timeout: 10000,
    waitUntil: 'load'
  });

  return page;
};

async function signIn(page, login, pass) {
  await page.type('#login', login);
  await page.type('#password', pass);
  await page.click('#submit');
  // await loading page
  await page.waitForNavigation();
}
// End utils

test('Render authorization form', async t => {
  const page = await browserPage();
  const loginRender = await page.$('#login');
  const PassRender = await page.$('#password');

  if (loginRender && PassRender) {
    t.pass();
  } else {
    t.fail('Error authorization form. Login or Pass field not rendered');
  }
});

test('SignIn', async t => {
  const page = await browserPage();
  const authHtml = await page.evaluate(() => window.document.body.innerHTML);
  await signIn(page, userlogin, userPass);
  const authorizedHtml = await page.evaluate(
    () => window.document.body.innerHTML
  );

  if (authHtml.length * 2 < authorizedHtml.length) {
    t.pass();
  } else {
    t.fail(
      'Error: after click "Enter" page not rendered. Check login or pass.'
    );
  }
});

test('Sheets render', async t => {
  const page = await browserPage();
  await signIn(page, userlogin, userPass);
  const config = require(`./../../configTemp/cabinets/tables/${userlogin}.json`);
  const authorizedHtml = await page.evaluate(
    () => window.document.body.innerHTML
  );

  if (config.sheets.length > 0) {
    const { sheets } = config;
    let counter = 0;

    sheets.forEach((sheet, i) => {
      if (
        authorizedHtml.indexOf(sheet.displayName) !== -1 &&
        authorizedHtml.indexOf(`table-tab-${i + 1}`) !== -1
      ) {
        counter += 1;
      } else {
        t.fail(`-> Error: ${sheet.displayName} not rendered`);
      }
    });

    if (counter === sheets.length) {
      t.pass();
    }
  } else {
    t.fail('-> Error: Config file is empty');
  }
});

test('Logout', async t => {
  const page = await browserPage();
  await signIn(page, userlogin, userPass);
  const authorizedHtml = await page.evaluate(
    () => window.document.body.innerHTML
  );
  await page.click('#logout');

  const logoutHtml = await page.evaluate(() => window.document.body.innerHTML);

  if (logoutHtml.length < 2000 && authorizedHtml.length > 2000) {
    t.pass();
  } else {
    t.fail('logout');
  }
});
