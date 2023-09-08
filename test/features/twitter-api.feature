Feature: Twitter Profile and Posting

  @TWITTERAPI @Common @common_twitter
  Scenario: Accessing and Posting on Twitter
    Given user has a Twitter access token
    When user put a new 2 post in twitter
    