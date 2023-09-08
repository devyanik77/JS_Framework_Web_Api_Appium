const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  Builder,
  By,
  Key,
  Options,
  Capabilities,
  until,
} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
// const { setDefaultTimeout } = require("@cucumber/cucumber");
// setDefaultTimeout(300 * 1000);
const { implicitWait } = require("../supports/utils/wait");
const axios = require('axios');
const chai = require('chai');
const fs = require('fs');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


const {
  ONE_SECOND,
  TWO_SECOND,
  ONE_MIN,
  THIRTY,
  TEN,
} = require("../supports/utils/timeunit");

var driver;
var options;

// -------api
Given('user has a Twitter access token', function () {
    console.log("My Access token stored in json with GET method")
  });

  When('user put a new 2 post in twitter', async function () {
    
    const Oauth1 = (input) => {

      const OAuth = require('oauth-1.0a')
  
      const crypto = require('crypto')
  
      const { default: axios } = require('axios');
  
      const _ = require('lodash');
  
      const oauth = OAuth({
  
          consumer: input.oauth1.consumer,
  
          signature_method: input.oauth1.signature_method,
  
          hash_function(base_string, key) {
  
              return crypto
  
                  .createHmac(input.oauth1.signature_algorithm, key)
  
                  .update(base_string)
  
                  .digest('base64')
  
          },
  
      })
  
      _.invoke(axios, input.method,
  
          input.url,
  
          input.data,
  
          {
  
              headers: {
  
                  ...input.headers || {},
  
                  ...oauth.toHeader(
  
                      oauth.authorize(
  
                          {
  
                              url: input.url,
  
                              method: input.method
  
                          },
  
                          input.oauth1.token
  
                      )
  
                  )
  
              },
  
              maxBodyLength: Infinity
  
          }
  
      ).then((res) => {
  
          console.log('success', res.data)
  
      }).catch((res) => {
  
          console.log(res.message);
  
          console.error('response data->', res?.response?.data)
  
      })
  
  }
  
  Oauth1({
  
      method: 'post',
  
      url: 'https://api.twitter.com/2/tweets',
  
      oauth1: {
  
          consumer: {
  
              key: 'BCPzrI2yaAEkr78wBBE9jbHph',
  
              secret: 'OIUZ0QL8R6njB1uHSZ7svDclhNYdsr8XEE3wmKW9FSYhoyHTrc'
  
          },
  
          token: {
  
              key: '1694209710604328960-imvrq4xXxE0ukGmwUfUkNRIf7VJc4a',
  
              secret: 'DnR6RYTAzadbztPjXh5wth876NFM1Ybq1kKCmcTbJO3RV',
  
          },
  
          signature_method: 'HMAC-SHA1',
  
          signature_algorithm: 'sha1'
  
      },
  
      data: JSON.stringify({
  
          "text": "Hello twitter API"
  
      }),
  
      headers: { 'Content-Type': 'application/json' }
  
   
  
  })
    });
