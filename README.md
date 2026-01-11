# note-service ✨

A serverless CRUD REST API for demo purposes powered by AWS SAM, API Gateway (HTTP API), Lambda Functions (Node.js runtime), and DynamoDB.

## Architecture 🏗️

![note-api](https://user-images.githubusercontent.com/12616554/106798492-e6a5c480-6612-11eb-8be9-bdebc4ee5a73.png)

## API Routes 🛣️

- **GET** `/note` - List all notes (using DDB `scan` for demo purposes, but you'd probably want to use `query` and paginate the results as this can be costly with a large table)
- **GET** `/note/{id}` - Get a single note by `id`
- **POST** `/note` - Create a note with `author` and `content`
- **PUT** `/note/{id}` - Update a note's `content`
- **DELETE** `/note/{id}` - Delete a note by `id`

## Tech Stack 💻

- **Runtime**: Node.js 24.x
- **AWS Services**: Lambda, API Gateway (HTTP API), DynamoDB
- **Framework**: AWS SAM (Serverless Application Model)
- **SDK**: AWS SDK for JavaScript v3

## Getting Started 🚀

Deploy this stack to your AWS account using the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html):

```bash
sam build
sam deploy --guided
```

## Important Notes 📝

- This API uses the HTTP protocol of API Gateway where `statusCode` and `headers` are optional in Lambda responses.
- **CORS Configuration**: Make sure to configure your CORS settings in `template.yaml` if you want this to interact with a web frontend. It should work out of the box with [curl](https://curl.se/docs/) or [Postman](https://www.postman.com/).
- **Security Warning** ⚠️: Be careful keeping this deployed on the wide open internet since the API is not secured. Someone could find this URL and hit it many times resulting in a large AWS bill. See [this guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html) for more info on securing an API. The IAM authorizer is probably easiest for dev purposes if this is a concern.
- **Cost Optimization** 💰: There are ways to do a direct HTTP API ⟷ DynamoDB integration, but this demo shows how to use Lambda functions to interact with DynamoDB. For minimal CRUD operations like this, you'd probably want to go the direct integration path to save some money. When you're done testing, make sure to delete the stack to avoid incurring charges. You can delete the stack by running `sam delete` from the command line, or alternatively by deleting the stack through the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/).

