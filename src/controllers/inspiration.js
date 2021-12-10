const { responseToMongooseError } = require('../helpers/responses');
const Inspiration = require('../models/inspiration');

function addInspiration(req, res) {
    let body = req.body;
    const inspiration = new Inspiration({
        title: body.title,
        description: body.description,
        category: body.category,
        URL: "https://www.nationalgeographic.com.es/medio/2018/02/27/playa-de-isuntza-lekeitio__1280x720.jpg",
        status: false
    });
    inspiration.save()
        .then((result) => {
            res.status(201).json({
                message: 'Inspiración registrada',
                status: true
            });
        })
        .catch(err => {
            responseToMongooseError(res, err);
        })
}

function getAllInspiration(req, res){
    Inspiration.find()
        .select('created_at title status')
        .populate('category', 'color_primary color_secondary icono' )
        .exec()
        .then((docs) => {
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

function getInspiration(req, res){
    const inspirationId = req.params.inspirationID
    const conditions = { _id:inspirationId }
    Inspiration.find(conditions)
        .select('created_at title description URL status')
        .populate('category', 'name color_primary icono' )
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                inspiration: docs[0]
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
    addInspiration,
    getAllInspiration,
    getInspiration
};