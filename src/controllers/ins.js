const { responseToMongooseError } = require('../helpers/responses');
const Ins = require('../models/ins');

function addIns(req, res) {
    console.log("1")
    console.log("2")
    let body = req.body;
    console.log(body)
    console.log("3")
    const ins = new Ins({
        title: body.title,
        description: body.description,
        category: body.category,
        URL: "https://cnnespanol.cnn.com/wp-content/uploads/2021/06/http___cdn.cnn_.com_cnnnext_dam_assets_210610111515-smith-street-melbourne-credit-josie-withers.jpg"
    });
    ins.save()
        .then((result) => {
            console.log("4")
            res.status(201).json({
                message: 'Inspiración registrada'
            });
        })
        .catch(err => {
            console.log("5")
            responseToMongooseError(res, err);
        })
}

function getAllIns(req, res){
    Ins.find()
        .select('created_at title description category URL')
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                ins: docs
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
    addIns,
    getAllIns
};