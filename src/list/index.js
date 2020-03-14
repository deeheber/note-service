const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Select: 'ALL_ATTRIBUTES'
  };

  let response;
  let statusCode;
  try {
    const { Items } = await dynamodb.scan(params).promise();
    response = Items;
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err.message, undefined, 2)}`);
    response = err.message;
    statusCode = err.statusCode || 500;
  }

  return {
    statusCode,
    headers: {},
    body: JSON.stringify(response)
  };
};
