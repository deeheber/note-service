const AWS = require('aws-sdk');
const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: marshall({ id }),
    UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
    ExpressionAttributeValues: marshall({
      ':content': data.content,
      ':updatedAt': new Date().getTime().toString(),
      ':id': id
    }),
    ConditionExpression: 'id = :id',
    ReturnValues: 'ALL_NEW'
  };

  let response;
  let statusCode;
  try {
    const { Attributes } = await dbclient.send(new UpdateItemCommand(params));
    response = unmarshall(Attributes);
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
