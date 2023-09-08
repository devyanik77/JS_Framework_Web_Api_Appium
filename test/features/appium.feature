Feature: APPIU

  @APPIUM @common
  Scenario Outline: Scenario Outline name: Fetch profile information
    Given mobile is connected with local System
    When user play the "<Song_Name>" song

    Examples:
      | Song_Name |
      | heeriyee  |


