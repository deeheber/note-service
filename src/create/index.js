const { randomUUID } = require('crypto');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);
  const input = {
    id: randomUUID(),
    content: data.content,
    author: data.author,
    createdAt: new Date().getTime().toString()
  };

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: input
  };

  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  console.log(`Adding note to table ${process.env.TABLE_NAME}`);
  await ddbDocClient.send(new PutCommand(params));
  console.log('Note added to table, done');

  return {
    statusCode: 200,
    body: JSON.stringify(input)
  };
};
