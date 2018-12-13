const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(event);

  const params = {
    TableName: process.env.TABLE_NAME,
    Select: 'ALL_ATTRIBUTES'
  };

  const result = await dynamodb.scan(params).promise();

  throw new Error('This is an error message');

  // TODO add in error handling
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Items)
  };
};
