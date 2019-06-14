const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: event.pathParameters.id },
    UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':content': data.content ? data.content : null,
      ':updatedAt': new Date().getTime()
    },
    ReturnValues: 'ALL_NEW'
  };

  console.log(`Updating note in table ${process.env.TABLE_NAME}`);
  const result = await dynamodb.update(params).promise();
  console.log(`Note updated in table, done`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Attributes)
  };
};
