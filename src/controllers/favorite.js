const { responseToMongooseError } = require('../helpers/responses');
const Inspiration = require('../models/inspiration');


function getAllInspirationFavorite(req, res){
    const statusF = true
    const conditions = { status:statusF }
    Inspiration.find(conditions)
        .select('created_at description status')
        .populate('category', 'name color_primary icono')
        .exec()
        .then((docs) => {
            console.log("4")
            const response = {
                count: docs.length,
                inspiration: docs
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
              message:
                'Error interno de servidor, reintente en unos minutos por favor',
              error: err,
            });
        });
}


module.exports = {
    getAllInspirationFavorite
};