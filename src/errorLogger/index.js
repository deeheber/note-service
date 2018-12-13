exports.handler = async message => {
  console.log(`ERROR: ${message}`);

  return {
    statusCode: 500,
    headers: {},
    body: JSON.stringify({
      message: 'There was an internal server error'
    })
  };
};
