const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':content': data.content ? data.content : null,
      ':updatedAt': new Date().getTime(),
      ':id': id
    },
    ConditionExpression: 'id = :id',
    ReturnValues: 'ALL_NEW'
  };

  let response;
  let statusCode;
  try {
    const result = await dynamodb.update(params).promise();
    console.log('result ', result);
    response = result.Attributes;
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err.message, undefined, 2)}`);
    response = { message: err.message };
    if (err.code === 'ConditionalCheckFailedException') {
      response = { message: 'Item not found, unable to update' };
    }
    statusCode = err.statusCode || 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
