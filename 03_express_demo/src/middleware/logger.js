function loggin(req, res, next) {
    console.log('Logging. . .');
    next();
}

export default loggin;