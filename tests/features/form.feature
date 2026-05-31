Feature: Book search
  As a user
  I want to search books from the form
  So I can see results or errors based on the system rules

  Background:
    Given I open the application

  Scenario: Search from the form
    When I fill the form with title "The Lord of the Rings" and author "Tolkien"
    And I submit the search
    Then the search request runs successfully

  Scenario: Results visualization
    When I fill the form with title "The Lord of the Rings" and author "Tolkien"
    And I submit the search
    Then I should see three book cards

  Scenario: Error for required parameters
    When I submit the search without title or author
    Then I should see a required parameters error message

  Scenario: Error for insufficient matches
    When I fill the form with title "qwertyuiopasdf" and author ""
    And I submit the search
    Then I should see an insufficient results error message
