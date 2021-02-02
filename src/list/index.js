// Scaning an entire table can be slow and expensive on larger tables
// This is just a sandbox experiment with a smaller table
// If you have a larger table, use Query and paginate the responses
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const dbclient = new DynamoDBClient({ region: process.env.AWS_REGION });

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
    const { Count, Items } = await dbclient.send(new ScanCommand(params));
    response = {
      total: Count,
      items: Items.map(item => unmarshall(item))
    };
    statusCode = 200;
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err, undefined, 2)}`);
    response = err.message;
    statusCode = err.$metadata ? err.$metadata.httpStatusCode : 500;
  }

  return {
    statusCode,
    body: JSON.stringify(response)
  };
};
