const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':content': data.content,
      ':updatedAt': new Date().getTime().toString(),
      ':id': id
    },
    ConditionExpression: 'id = :id',
    ReturnValues: 'ALL_NEW'
  };

  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  let response;
  let statusCode;
  try {
    const { Attributes } = await ddbDocClient.send(new UpdateCommand(params));

    response = Attributes;
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err, undefined, 2)}`);
    response = { message: err.message };

    if (err.name === 'ConditionalCheckFailedException') {
      response = { message: 'Item not found in the db, unable to update' };
    }

    statusCode = err.$metadata ? err.$metadata.httpStatusCode : 500;;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
