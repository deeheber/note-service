# note-service

A serverless demo CRUD API microservice powered by AWS SAM, API Gateway (HTTP API), Lambda Functions, and DynamoDB

`template.yaml` generated with the help of [Stackery](https://www.stackery.io/)

## Architecture
![note-api](https://user-images.githubusercontent.com/12616554/106798492-e6a5c480-6612-11eb-8be9-bdebc4ee5a73.png)

## Routes
- GET /note/ (list all notes)
- GET /note/{ id } (get a single note)
- POST /note (create note)
- PUT /note/{ id } (update a note)
- DELETE /note/{ id } (delete a note)

## Additional
- This is using the HTTP protocol of API Gateway, the `statusCode` and `headers` are optional in the Lambda responses.
