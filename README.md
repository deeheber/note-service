# note-service

A serverless demo CRUD API microservice powered by AWS SAM, API Gateway (HTTP API), Lambda Functions, and DynamoDB

## Architecture
![note-api](https://user-images.githubusercontent.com/12616554/106798492-e6a5c480-6612-11eb-8be9-bdebc4ee5a73.png)

## Routes
- GET /note (list all notes)
- GET /note/{ id } (get a single note)
- POST /note (create note)
- PUT /note/{ id } (update a note)
- DELETE /note/{ id } (delete a note)

## Additional
- Deploy this stack to your AWS account using the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)
- This is using the HTTP protocol of API Gateway, the `statusCode` and `headers` are optional in the Lambda responses.
- Make sure to enable CORS in `template.yaml` if you want this to interact with a frontend. It should work out of the box with [curl](https://curl.se/docs/) or [Postman](https://www.postman.com/).
