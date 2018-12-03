exports.handler = async message => {
  console.log(message);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ it: 'works --- create function' })
  };
};
