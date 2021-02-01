const { v4: uuidv4 } = require('uuid');
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: { S: uuidv4() },
      content: { S: data.content },
      author: { S: data.author },
      createdAt: { S: new Date().getTime().toString() }
    }
  };

  console.log(`Adding note to table ${process.env.TABLE_NAME}`);
  await dbclient.send(new PutItemCommand(params));
  console.log('Note added to table, done');

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };
};
