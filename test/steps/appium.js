const { Given, When, Then } = require("@cucumber/cucumber");
const { remote } = require('webdriverio');


// Sowmi mobile capabilities
const appiumCapabilities = {
    platformName: 'Android',
    'appium:platformVersion': '7',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Redmi', // Use the appropriate device name
    'appium:udid': '22bbb48b7d84', // Use the appropriate UDID if needed
    'appium:appPackage': 'org.cyclos.mobile', // Just the package name
    'appium:appActivity': 'org.cyclos.mobile.MainActivity', // Just the activity name
    // 'appium:noReset': true, // Consider using noReset if the app is preinstalled
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || '192.168.10.37',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities: appiumCapabilities,
};

Given('mobile is connected with local System', { timeout: 2 * 5000 }, async () => {
    console.log("Mobile is connected with local System: APPIUM ")
});

When('user play the {string} song', { timeout: 2 * 60000 }, async (Song_Name) => {
    const driver = await remote(wdOpts);
    try {
        await driver.waitUntil(async () => {
            const searchBox = await driver.$('accessibility id:Search');
            await searchBox.click();

            const searchBoxText = await driver.$('id:com.google.android.youtube:id/search_edit_text');
            await searchBoxText.setValue(Song_Name);
            console.log('Search text set to:', Song_Name);
            // await driver.waitUntil(async () => {
            //     return await driver.isKeyboardShown();
            // }, 5000, 'Keyboard did not appear within 5 seconds');

            if (await driver.isKeyboardShown()) {
                await driver.pressKeyCode(66);
            }
            console.log('Keyboard used');

            const songselect = await driver.$('xpath://android.view.ViewGroup[@content-desc="Heeriye (Official Video) Jasleen Royal ft Arijit Singh| Dulquer Salmaan| Aditya Sharma |Taani Tanvir – 3 minutes, 19 seconds – Go to channel – Jasleen Royal - 6.5 crore views - 1 month ago – play video"]');

            await songselect.click();
            console.log('Song selected');
        }, 
        10000); // Increase the timeout to 10 seconds
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // await driver.deleteSession();
    }
})
