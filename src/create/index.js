const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(event);
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuid.v1(),
      content: data.content,
      author: data.author,
      createdAt: new Date().getTime()
    }
  };

  console.log(`Adding note to table ${process.env.TABLE_NAME}`);
  await dynamodb.put(params).promise();
  console.log(`Note added to table, done`);

  // TODO: add in error handling
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(params.Item)
  };
};
