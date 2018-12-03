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

  console.log(`Adding user to table ${process.env.TABLE_NAME}`);

  try {
    await dynamodb.put(params).promise();
    console.log(`User added to table, done`);
    return {
      statusCode: 200,
      headers: {},
      body: params.Item
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {},
      body: err
    };
  }
};
