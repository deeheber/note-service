const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    ExpressionAttributeValues: {
      ':id': id
    },
    ConditionExpression: 'id = :id'
  };

  let response;
  let statusCode;
  try {
    await dynamodb.delete(params).promise();
    response = { id };
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err.message, undefined, 2)}`);
    response = err.message;
    if (err.code === 'ConditionalCheckFailedException') {
      response = { message: 'Item not found, unable to delete' };
    }
    statusCode = err.statusCode || 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
