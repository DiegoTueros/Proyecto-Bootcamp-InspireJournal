const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expiresIn = { expiresIn: '7d' };
const JWT_KEY  = "$store-jwt-key?";

const User = require('../models/user');

const { responseToMongooseError } = require('../helpers/responses')


function signup(req, res) {
    let body = req.body;
    User.findOne({ email: body.email })
        .exec()
        .then(person => {
            if (person) {
                return res.status(201).json({
                    message: 'Existe un usuario con ese email',
                    status: false
                });
            }
            const user = new User({
                username: body.username,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Usuario registrado satisfactoriamente',
                        status: true
                    });
                })
                .catch(err => {
                    responseToMongooseError(res, err);
                })
        })
        .catch(err => {
            responseToMongooseError(res, err);
        });
}

function signin(req, res) {
    let body = req.body;
    console.log(body)
    User.findOne({ email: body.email })
        .exec()
        .then(user => {
            if (user === null) {
                return res.status(201).json({
                    message: 'No se ha encontrado al usuario',
                    status: false
                });
            }
            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(201).json({
                    message: 'Contraseña errónea',
                    status: false

                });
            }
            let payload = {
                _id: user._id,
                email: user.email,
                username: user.username
            }
            const token = jwt.sign(payload, JWT_KEY, expiresIn);
            const response = {
                token,
                user: {
                    username: user.username
                },
                status: true
            }
            return res.status(200).json(response);
        })
        .catch(err => {
            responseToMongooseError(res, err);
        });
}

module.exports = {
    signup,
    signin
}