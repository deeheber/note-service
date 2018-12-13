exports.handler = async message => {
  console.log(`ERROR: ${JSON.stringify(message)}`);

  return {
    statusCode: 500,
    headers: {},
    body: JSON.stringify({
      message: 'There was an internal server error. Please check your logs to debug.'
    })
  };
};
