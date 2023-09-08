const { By, until, Key, Builder } = require('selenium-webdriver');
const assert = require('assert');
const driver = require('../driver').getDriver();
const func = require('../driver');
const { Select } = require('selenium-webdriver');
const LONG_TIME_OUT = 50 * 1000;
const EODSTAGE_TIME_OUT = 300 * 1000;
// ----------------------------------------------------------------------------------------------------------------------------
var common = {

}

// ----------------------------------------------------------------------------------------------------------------------------
var sendValue = async function (id, value) {
    var elm = checkVisible(id);
    var valueToSend = value;
    if (value == null) {
        valueToSend = '';
    }
    await elm.clear();
    await elm.sendKeys(valueToSend);
}

var checkVisible = function (id) {
    var elm = getElement(id);
    return driver.wait(until.elementIsVisible(elm), LONG_TIME_OUT);
}


var clickElement = function (id) {
    var elm = checkVisible(id);
    return elm.click();
}

var getElementText = function (path) {
    var elm = checkVisible(path);
    return elm.getText();
}

var getElementInnerText = function (path) {
    var elm = checkVisible(path);
    return elm.innerText();
}

var getElementAttribute = function (path, attribute) {
    var elm = checkVisible(path);
    return elm.getAttribute(attribute);
}

var getElementValue = function (path) {
    var elm = checkVisible(path);
    return elm.value;
}

var getElement = function (elementId) {
    if (elementId.startsWith("id=")) {
        var elm = elementId.replace("id=", "");
        return driver.wait(until.elementLocated(By.id(elm)), LONG_TIME_OUT);
    }
    if (elementId.startsWith("xpath=")) {
        var elm = elementId.replace("xpath=", "");
        return driver.wait(until.elementLocated(By.xpath(elm)), LONG_TIME_OUT);
    }
    if (elementId.startsWith("css=")) {
        var elm = elementId.replace("css=", "");
        return driver.wait(until.elementLocated(By.css(elm)), LONG_TIME_OUT);
    }
}

var findEle = async function (elementId) {
    if (elementId.startsWith("id=")) {
        var elm = elementId.replace("id=", "");
        return driver.findElement(By.id(elm));
    }
    if (elementId.startsWith("xpath=")) {
        var elm = elementId.replace("xpath=", "");
        console.log("print xpath here " + elm);
        return driver.findElement(By.xpath(elm));
    }
}

var setDropDownListID = async function (dropDownListId, itemValue, item, resultItems) {
    var myfunction = function (resultItems) {
        var elm = resultItems.replace("id=", "");
        return document.getElementById(elm).getElementsByTagName("li").length;
    }
    return clickElement(dropDownListId).then(async function () {
        await driver.sleep(2000);
        return driver.executeScript(myfunction, resultItems).then(async function (listLengthValue) {
            for (var i = 1; i <= listLengthValue; i++) {
                var itemToClick = item.replace(/%d/g, i);
                var val = await getElementText(itemToClick);
                if (itemValue == val) {
                    await driver.sleep(1000);
                    return clickElement(itemToClick);
                }
            }
        });
    });
}

var setDropDownListcss = async function (dropDownListId, itemValue, item, resultItems) {
    var myfunction = function (resultItems) {
        console.log("inside myfunction ")
        var elm = resultItems.replace("css=", "");
        var length = document.querySelectorAll(elm).length;
        console.log("length " + length)
        return length;
    }
    return clickElement(dropDownListId).then(async function () {
        await driver.sleep(2000);
        return driver.executeScript(myfunction, resultItems).then(async function (listLengthValue) {
            console.log("lenlistLengthValuegth " + listLengthValue)
            for (var i = 1; i <= listLengthValue; i++) {
                var itemToClick = item.replace(/%d/g, i);
                var val = await getElementText(itemToClick);
                if (itemValue == val) {
                    await driver.sleep(1000);
                    console.log("itemToClick " + itemToClick)
                    return clickElement(itemToClick);
                }
            }
        });
    });
}

var setDropDownListClass = async function (dropDownListId, itemValue, item, resultItems) {
    var myfunction = function (resultItems) {
        console.log("resultItems " + resultItems)
        // var elm = resultItems.replace("xpath=", "");
        var length = document.getElementsByClassName('dropdown1 dropdown-menu').length;
        console.log("length " + length)
        return document.getElementsByClassName('dropdown1 dropdown-menu').length;

    }
    return clickElement(dropDownListId).then(async function () {
        await driver.sleep(1500);
        return driver.executeScript(myfunction, resultItems).then(async function (listLengthValue) {
            console.log("lenlistLengthValuegth " + listLengthValue)
            for (var i = 1; i <= listLengthValue; i++) {
                var itemToClick = item.replace(/%d/g, i);
                itemToClick = itemToClick.replace("xpath=", "");
                var val = await getElementText(itemToClick);
                if (itemValue == val) {
                    await driver.sleep(1200);
                    console.log("itemToClick " + itemToClick)
                    return clickElement(itemToClick);
                }
            }
        });
    });
}



var selectDropdownOption = async function (optionText) {
    const selectElement = driver.findElement(By.xpath("//select[@data-test='product_sort_container']"))
    const select = await new Select(selectElement);
    await select.selectByVisibleText(optionText);
}


var selectDropdownByVisibleText = async function (dropdownElement, optionText) {
    await clickElement(dropdownElement);
    // const select = await new Select(dropdownElement);
    // await select.selectByVisibleText(visibleText);
    const optionLocator = By.xpath(`//select[@data-test='product_sort_container']/option[text()='${optionText}']`);
    const optionElement = await driver.findElement(optionLocator);
    await optionElement.click(); // Click the desired option

}

// / Function to select an option from a dropdown by its visible text
async function selectDropdownOptionByText(driver, dropdownLocator, optionText) {
    const dropdown = await driver.findElement(dropdownLocator);
    await dropdown.click();
    const optionLocator = By.xpath(`//option[text()="${optionText}"]`);
    const option = await dropdown.findElement(optionLocator);
    await option.click();
}

// Function to select an option from a dropdown by its value attribute
async function selectDropdownOptionByValue(driver, dropdownLocator, optionValue) {
    const dropdown = await driver.findElement(dropdownLocator);
    await dropdown.click();
    const optionLocator = By.xpath(`//option[@value="${optionValue}"]`);
    const option = await dropdown.findElement(optionLocator);
    await option.click();
}


var setDropDownCyclos = async function (driver, dropdownButton, itemValue, item, dropdownOptionsXPath) {
    await driver.findElement(By.xpath(dropdownButton)).click()
    await driver.sleep(3000);
    // console.log("dropdownOptionsXPath: " + dropdownOptionsXPath);
    const dropdownOptions = await driver.findElements(By.xpath(dropdownOptionsXPath));
    var length = dropdownOptions.length;
    // console.log("dropdownOptions.length: " + length)
    for (var i = 1; i < length; i++) {
        // console.log("Generated XPath: " + item.replace(/%d/g, i));
        var ITEMTOCLICK = item.replace(/%d/g, i)
        const itemToClick = await driver.findElement(By.xpath(ITEMTOCLICK));
        // console.log("itemToClick: " + itemToClick)
        var val = await itemToClick.getText();
        console.log("val: " + val)
        if (itemValue == val) {
            // console.log("itemToClick: " + val)
            await driver.sleep(2000);
            await itemToClick.click();
            await driver.sleep(2000);
            // console.log("itemToClick: CLICKED")
            break;
        }
    }
};



module.exports = {
    'common': common,
    'sendValue': sendValue,
    'checkVisible': checkVisible,
    'clickElement': clickElement,
    'getElementText': getElementText,
    'getElementInnerText': getElementInnerText,
    'getElementAttribute': getElementAttribute,
    'getElementValue': getElementValue,
    'getElement': getElement,
    'findEle': findEle,
    'setDropDownListID': setDropDownListID,
    'setDropDownListClass': setDropDownListClass,
    'setDropDownListcss': setDropDownListcss,
    'selectDropdownOption': selectDropdownOption,
    'selectDropdownByVisibleText': selectDropdownByVisibleText,
    'selectDropdownOptionByText': selectDropdownOptionByText,
    'selectDropdownOptionByValue': selectDropdownOptionByValue,
    'setDropDownCyclos': setDropDownCyclos,
}