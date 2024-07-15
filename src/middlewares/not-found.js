const notFoundMiddleware = (req,res,next) => {
    res
        .status(400)
        .json({
            message: `requested url: ${req.method} ${req.url} was not fpund on this server`
        })
}

module.exports = notFoundMiddleware