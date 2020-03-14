const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: event.pathParameters.id }
  };

  let response;
  let statusCode;
  try {
    const { Item } = await dynamodb.get(params).promise();

    if (!Item) {
      statusCode = 404;
      response = 'Item not found';
    } else {
      response = Item;
      statusCode = 200;
      console.log(`SUCCESS GETTING ITEM: ${event.pathParameters.id}`);
    }
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
