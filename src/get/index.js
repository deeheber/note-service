const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(event);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: event.pathParameters.id
  };

  const result = await dynamodb.get(params).promise();

  // TODO add in error handling
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Item)
  };
};
