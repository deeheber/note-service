const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
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
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.strinfigy(params.Item)
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(err)
    });
  }
};
