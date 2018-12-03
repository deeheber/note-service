const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async message => {
  console.log(message);
  const data = JSON.parse(message.body);

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
  const result = await dynamodb.put(params).promise();
  console.log(`User added to table, done`);
  console.log(`RESULT: ${result}`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ it: 'works --- create function' })
  };
};
