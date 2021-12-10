const Sentry = require('@sentry/node');

function responseToMongooseError (res, err) {
    if (err.kind === 'ObjectId') {
		res.status(404).json({
			'message': 'ID no existe'
		});
	} else {
        Sentry.captureException(err);
        res.status(500).json({
            message: 'Error interno de servidor, reintente en unos minutos por favor',
            status: false
        });
    }
}

module.exports = {
    responseToMongooseError
};