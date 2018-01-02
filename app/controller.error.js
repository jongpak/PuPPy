function error (err, req, res, next) {
    res.status(500).render('error', {
        errorTitle: 'ERROR',
        errorBody: err
    });
}

module.exports = {
    error: error
}