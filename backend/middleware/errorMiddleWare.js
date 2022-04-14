const notFoundPage = (req, res, next) => {
    const error = new Error(`Not Found - ${req.path}`)
    res.status(404)
    next(error);
}


const errorHandler = (err, req, res, next) => {
    //sometimes we get 200 response even its an error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV==='production' ?null:err.stack})
}

export {notFoundPage,errorHandler}