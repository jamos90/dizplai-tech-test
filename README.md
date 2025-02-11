# Dizplai tech test

Introduction

A small Angular, Node and sqlite application designed to allow users to vote on an active poll and see the results.

Front end: Built using `Angular Typescript` standalone components to minimize bundle size as this is a small application modules were not required. It uses `.scss` files for styling. Business is housed in services to be reusable and keep it out of the components. Re-suable components are used for repeating code, for example `poll-options`

Back end: Built using `NodeJs` `JavaScript`, `Express`, `sqlLite DB` and `Objection ORM`. Sqlite and objection where chosen because they are both light weight and perform all necessary operations for the application in it's current state. Objection allows db queries to be easier and safer to write. Express was chosen as it is a well know framework and comes with useful middleware that help efficiently set up an application. Database has the following tables, Polls, Options and Votes. Polls can have many Options and Options can have one Poll (poll_id). Options can have multiple votes and Votes have a single option (option_id).

Assumptions:

1. There can only be one active poll at a time. A user has to manually update a poll to active through the API.
2. Users can vote more than once. Could implement stricter checks in future.
3. Person pulling pull down repository has Angular CLI on local machine.

Known issues / Limitations

1. No security on API, future updates could add JWT token authentication, user authentication (admin only routes) and https endpoints
2. No data duplication checks, future updates could add verification to check a duplicate poll does not exits

Installation

1. Clone the repository from https://github.com/jamos90/dizplai-tech-test
2. At the root of the project there is a run.sh script that will install required dependencies and start both instances.
3. Alternatively you can open two terminal windows or tabs, in one `cd` into the front-end folder, run `npm i` to install dependencies and then `ng serve` to start the front end application. Then in the second window / tab `cd` into backend folder, run `npm i` to install dependencies and `nodemon server.js` to start backend server.
4. On start up the backend will create an sqlite db and seed it with one poll.
5. Once front end has started navigate to `http://localhost:4200/polls/active` to see the current active poll

Use

1. Once at endpoint listed above you will be able to see Poll options and vote,
2. Once voted you will be navigated to the results page and be able to view the % each option has of the total votes
3. A button exits to go back to the Votes view for ease of use in this iteration of the project

Api documentation

Base Url: http://localhost:3100/api/

Get all polls:
Method: GET
Endpoint: `/polls`
Body: na
ReturnValue: `200 [Polls, Polls, ...]`
OnError: `500 [Error details]`

Get active poll:
Method: GET
Endpoint: `/polls/active`
Body: na
ReturnValue: `200 [Poll]`
OnError: `500 [Error details]`

Create a poll:
Method: POST
Endpoint: `/polls`
Body: JSON
Example: `{ "name": "NBA Poll", "totalVotes": 0, "status": "inactive", "description": "Who will win the NBA championship", "options": [ { "name": "Dalas Mavericd", "totalVotes": 0 }, { "name": "Dalas Mavericd", "totalVotes": 0 }, { "name": "Dalas Mavericd", "totalVotes": 0 }, { "name": "Dalas Mavericd", "totalVotes": 0 }, { "name": "Dalas Mavericd", "totalVotes": 0 } ] }`
Validation: Active on endpoint, will return a `422` if validation failed for example:
`{ "errorCode": 422, "reason": "Invalid Request Body", "message": "\"status\" must be [inactive]" }`
ReturnValue: `201 { new Poll }`
validation rules can be found at `./backend/src/validations/poll.validations.js`
OnError: `500 [Error details]`
Sample Body: `./backend/src/data/sample-valid-poll.json`

Vote on a poll:
Method: PUT
Endpoint: `/polls/:pollId/:optionId/vote`
Body: na
Return Value: `{ updated Poll }`
OnError: `500 [Error details]`

Set poll to active
Method: PUT
Endpoint: `/polls/:poolId/activate`
Body: na
Return Value: `{ "status": "active", "id": 1, "name": "Premier League Poll", "totalVotes": 0, "description": "Who will win the Premier League?" }`
OnError: `500 [Error details]`

Get votes poll
Method: GET
Endpoint: `/votes/:pollId`
Body: na
ReturnValue: `{ "pollId": 1, "question": "Premier League Poll", "votes": [ { "voteId": 1, "optionId": 2, "optionName": "Manchester United", "createdAt": "2025-02-10T22:01:43.879Z" }, { "voteId": 2, "optionId": 2, "optionName": "Manchester United", "createdAt": "2025-02-10T22:01:44.958Z" }, { "voteId": 3, "optionId": 2, "optionName": "Manchester United", "createdAt": "2025-02-10T22:01:45.676Z" } ] }`
OnError: `500 [Error details]`
