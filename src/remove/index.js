const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb')

exports.handler = async (event) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2))

  const id = event.pathParameters.id

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id },
    ExpressionAttributeValues: {
      ':id': id,
    },
    ConditionExpression: 'id = :id',
  }

  const client = new DynamoDBClient({ region: process.env.AWS_REGION })
  const ddbDocClient = DynamoDBDocumentClient.from(client)

  let response
  let statusCode
  try {
    await ddbDocClient.send(new DeleteCommand(params))

    response = { id }
    statusCode = 200
  } catch (err) {
    console.log(`ERROR: ${JSON.stringify(err, undefined, 2)}`)
    response = { message: err.message }

    if (err.name === 'ConditionalCheckFailedException') {
      response = { message: 'Item not found, unable to delete' }
    }

    statusCode = err.$metadata ? err.$metadata.httpStatusCode : 500
  }

  return {
    statusCode,
    body: JSON.stringify(response),
  }
}
