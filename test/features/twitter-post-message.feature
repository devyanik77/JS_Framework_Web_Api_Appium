Feature: Twitter post Functionality

    # @TWITTER_TC001 @common_twitter @common
    # Scenario Outline: Twitter post Functionality for one post

    #     Then user clicks on sign in button
    #     When user enters username as "VALID_UNAME"
    #     Then user clicks on next button in login page
    #     When user enters username again as "PHONE_NUMBER"
    #     Then user clicks on next button
    #     Then user enters password as "VALID_PWD"
    #     Then user clicks on log in
    #     Then verify user is on home
    #     Then user clicks on post option
    #     Then user posts "<message1>" in post option
    #     Then user clicks on post in post option
    #     Then user clicks on profile
    #     When clicks on logout

    #     Examples:
    #         | message1                                                                                                                                                                                   |
    #         | Supper happy to participate in  #TESTAUTOTHON2023 organised by @stepin_forun in partnership with @verify_software. This event is running in paraller with #stepinsummit2023 - DEVYANI_TEST |


    @TWITTER_TC002 @common_twitter @common
    Scenario Outline: Twitter post Functionality
        Given user launch the application
        Then user clicks on sign in button
        When user enters username as "VALID_UNAME"
        Then user clicks on next button in login page
        When user enters username again as "PHONE_NUMBER"
        Then user clicks on next button
        Then user enters password as "VALID_PWD"
        Then user clicks on log in
        Then verify user is on home
        Then user posts "<message1>"
        Then user clicks on post
        Then user posts "<message2>"
        Then user clicks on post
        Then user posts "<message3>"
        Then user clicks on post
        Then user clicks on profile
        When clicks on logout

        Examples:
            | message1                                                                                                                                                                                            | message2                                                                                                                                          | message3                                                                                                               | visibility                        |
            | .Supper happy to participate in  #TESTAUTOTHON2023 organised by @stepin_forun in partnership with @verify_software. This event is running in paraller with #stepinsummit2023 - DEVYANI1_AUTO1_TEST1 | .The participation is amazing and about 35 teams are participating in this #TESTAUTOTHON2023 DEVYANI2_AUTO2_TEST2 @stepin_forun @verify_software. | .My team TRISTHA3_DEVYANI3_TEST3 is doing great & we are sure towin the event TRISTHA @stepin_forun @verify_software . | Only people you mention can reply |

    @TWITTER_TC003 @common_twitter @common
    Scenario Outline: search functionality
        Given user launch the application
        Then user clicks on sign in button
        When user enters username as "VALID_UNAME"
        Then user clicks on next button in login page
        When user enters username again as "PHONE_NUMBER"
        Then user clicks on next button
        Then user enters password as "VALID_PWD"
        Then user clicks on log in
        Then verify user is on home
        Then user click on explore option
        Then user search "<message1>"
        Then take the screenshot of the post and save it
        Then user click on explore option
        Then user search "<message2>"
        Then take the screenshot of the post and save it
        Then user click on explore option
        Then user search "<message3>"
        Then take the screenshot of the post and save it
        Then user clicks on profile
        When clicks on logout

        Examples:
            | message1             | message2                     | message3             |
            | DEVYANI1_AUTO1_TEST1 | DEVYANI2_AUTO2_TEST2 DEVYANI | DEVYANI3_AUTO3_TEST3 |