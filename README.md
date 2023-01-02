# note-service

A serverless CRUD REST API for demo purposes powered by AWS SAM, API Gateway (HTTP API), Lambda Functions (node runtime), and DynamoDB

## Architecture
![note-api](https://user-images.githubusercontent.com/12616554/106798492-e6a5c480-6612-11eb-8be9-bdebc4ee5a73.png)

## Routes
- GET /note - list all notes (using DDB `scan` for demo purposes, but you'd probably want to use `query` and paginate the results as this can be costly with a large table)
- GET /note/{ id } - get a single note by `id`
- POST /note - create note with `author` and `content`
- PUT /note/{ id } - update a note's `content`
- DELETE /note/{ id } - delete a note by `id`

## Additional
- Deploy this stack to your AWS account using the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)
  - `sam build`
  - `sam deploy --guided`
- This is using the HTTP protocol of API Gateway, the `statusCode` and `headers` are optional in the Lambda responses.
- Make sure to configure your CORS settings in `template.yaml` if you want this to interact with a web frontend. It should work out of the box with [curl](https://curl.se/docs/) or [Postman](https://www.postman.com/)
- Be careful keeping this deployed on the wide open internet since the API is not secured. I.e. someone could find this URL and hit it a lot of times resulting in a large AWS bill for you. See [this guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html) for more info on securing an API. I'd think the IAM authorizer is probably easiest for dev purposes if this is a concern for you.
- There are ways to do a direct http api <=> dynamoDB integration, but I wanted to show how to use Lambda functions to interact with DynamoDB. For minimal CRUD operations like this, you'd probably want go the direct integration path to save some money.
