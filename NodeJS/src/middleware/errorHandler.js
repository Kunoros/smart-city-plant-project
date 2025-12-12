const errorHandler = (err, req, res, next) => {
    console.error('[Global Error Handler]', err);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

export default errorHandler;