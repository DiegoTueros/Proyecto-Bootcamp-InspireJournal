const Category = require('../models/category');

function getAllCategory(req, res){
    Category.find()
        .select('name icono')
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                category: docs
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
    getAllCategory
};