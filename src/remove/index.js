const AWS = require('aws-sdk');
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: id }
    },
    ExpressionAttributeValues: {
      ':id': { S: id }
    },
    ConditionExpression: 'id = :id'
  };

  let response;
  let statusCode;
  try {
    await dbclient.send(new DeleteItemCommand(params));
    response = { id };
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err, undefined, 2)}`);
    response = { message: err.message };
    if (err.name === 'ConditionalCheckFailedException') {
      response = { message: 'Item not found, unable to delete' };
    }
    statusCode = err.$metadata.httpStatusCode || 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
