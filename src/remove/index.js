const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: event.pathParameters.id }
  };

  console.log(`Deleting note in table ${process.env.TABLE_NAME}`);
  const result = await dynamodb.delete(params).promise();
  console.log(`Note deleted in table, done`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result)
  };
};
