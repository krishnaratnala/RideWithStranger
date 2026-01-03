module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.message.includes('not found')) {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('Invalid') || err.message.includes('exists')) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('Unauthorized')) {
    statusCode = 401;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
