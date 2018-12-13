const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(event);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: event.pathParameters.id }
  };

  console.log(`Deleting note in table ${process.env.TABLE_NAME}`);
  const result = await dynamodb.delete(params).promise();
  console.log(`Note deleted in table, done`);

  // TODO: add in error handling
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result)
  };
};
