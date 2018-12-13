const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(event);
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

  // TODO: add in error handling
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(result.Attributes)
  };
};