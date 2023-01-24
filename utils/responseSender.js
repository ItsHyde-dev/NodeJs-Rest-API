module.exports.send = (param) => {
    const {
        err, data, message, statusCode, httpStatusCode, extras, req, res
    } = param

    const result = {
        message: message || 'Success',
        data: data || [],
        statusCode: statusCode || httpStatusCode,
        ...extras
    }

    if (err) {
        result.message = err
        result.data = data || []
        res.status(httpStatusCode || statusCode || 500).json(result)
    }
    else {
        res.status(httpStatusCode || statusCode || 200).json(result)
    }
}