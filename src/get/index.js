const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: event.pathParameters.id }
    }
  };

  let response;
  let statusCode;
  try {
    const { Item } = await dbclient.send(new GetItemCommand(params));

    if (!Item) {
      statusCode = 404;
      response = { message: 'Item not found' };
    } else {
      response = Item;
      statusCode = 200;
      console.log(`SUCCESS GETTING ITEM: ${event.pathParameters.id}`);
    }
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err, undefined, 2)}`);
    response = { message: err.message };
    statusCode = err.$metadata.httpStatusCode || 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
