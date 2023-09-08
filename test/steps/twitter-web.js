const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, Options, Capabilities, until, WebDriver, } = require("selenium-webdriver");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(300 * 1000);
const { implicitWait } = require("../supports/utils/wait");
const { ONE_SECOND, TWO_SECOND, ONE_MIN, THIRTY, TEN, } = require("../supports/utils/timeunit");
const assert = require('assert');
const fs = require('fs');
const path = require('path');
// let driver;
var options;
let nextPort; //for example
const driver = require('../supports/driver').getDriver();
const commonFunctions = require('../supports/utils/commonFunctions');
const Twitterproperties = require('../supports/Twitterproperties')
const twitterapplication = Twitterproperties.TwitterBasicData;
const twitterlocators = require('../page_Locators/twiiterPage')
const twitterlocator = require('../page_Locators/twitter-post-messagePage');
const twitterScreen = twitterlocator.twitter;

// ------------Twitter------------------//

Given('user launch the Twitter application', async function () {
  await driver.get(twitterapplication.Url);
});

When('usre enter the username', async function () {
  await commonFunctions.sendValue(twitterlocators.Username, twitterapplication.username);

});

Then('user click on the next button', async function () {

  await commonFunctions.clickElement(twitterlocators.Button);
});

Then('user enter the password', async function () {

  await commonFunctions.sendValue(twitterlocators.Password, twitterapplication.password);
  await commonFunctions.clickElement(twitterlocators.Login);
});

Then('user click on the post', async function () {
  await driver.sleep(2000);
  await commonFunctions.clickElement(twitterlocators.posticon)
});

Then('user enter the our own text {string}', async function (Text) {
  var elm = commonFunctions.checkVisible(twitterlocators.textbox);
  await elm.clear();
  await commonFunctions.sendValue(twitterlocators.textbox, Text)
    .then(async function () {
      await driver.sleep(2000);
    });
});

Then('user select on who can reply our post {string}', async function (post) {
  await commonFunctions.clickElement(twitterlocators.reply);
  await commonFunctions.selectDropdownOptionByText(driver, By.xpath('//div[@aria-labelledby="conversation-controls-title"]'), post)
});

Then('user click the postbutton', async function () {
  await commonFunctions.clickElement(twitterlocators.postbutton)
  await driver.sleep(5000);
  console.log('Tweet posted successfully!');
});

Then('user clicks on add another tweet button', async function () {
  await commonFunctions.clickElement(twitterScreen.ADD_POST_BUTTON)
    .then(async function () {
      await driver.sleep(5000);
    });
});

// Then('user click on explore option', async function () {
//   await commonFunctions.clickElement(twitterScreen.EXPLORE_OPTION)
//     .then(async function () {
//       await driver.sleep(3000);
//     });
// });
// Then('user search {string}', async function (message) {
//   await commonFunctions.sendValue(twitterScreen.SEARCH_QUERY_FIELD, message)
//     .then(async function () {
//       await driver.sleep(5000);
//     });
//   await commonFunctions.clickElement(twitterScreen.SEARCH_FOR_OPTION)
//     .then(async function () {
//       await driver.sleep(5000);
//     });
// });

// Then('take the screenshot of the post and save it', async function () {
//   await driver.sleep(5000);
//   const currentDir = __dirname;
//   const parentDir = path.dirname(currentDir);

//   const directoryPath = path.join(parentDir, 'screenshots');
//   if (!fs.existsSync(directoryPath)) {
//     fs.mkdirSync(directoryPath, { recursive: true });
//   }
//   const screenshot = await driver.takeScreenshot();
//   const image = Buffer.from(screenshot, 'base64');
//   const timestamp = new Date().toISOString().replace(/:/g, '-');
//   const fileName = `screenshot_${timestamp}.png`;
//   const filePath = path.join(directoryPath, fileName);
//   fs.writeFileSync(filePath, image);
// });

// Then('user clicks on profile', async function () {
//     await commonFunctions.clickElement(twitterScreen.PROFILE_BUTTON)
//         .then(async function () {
//             await driver.sleep(10000);
//         });
// });