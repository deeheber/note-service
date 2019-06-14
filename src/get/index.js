const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: event.pathParameters.id }
  };

  const result = await dynamodb.get(params).promise();

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Item)
  };
};
