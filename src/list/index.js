const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Select: 'ALL_ATTRIBUTES'
  };

  const result = await dynamodb.scan(params).promise();

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Items)
  };
};
