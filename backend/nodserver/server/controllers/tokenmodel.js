import model from '../models';
const { TokenModel } = model;

const speakeasy = require('speakeasy');



class TokenModels {

    static create(req, res) {
        const secret = speakeasy.generateSecret({ length: 20});
        return TokenModel
          .create({
            secret: secret.base32,
        })
          .then(token => res.status(201).send({
            status: "success",
            message: "Secret Token generated ",
            token
          }))
          .catch(error => res.status(400).send(error));
        }


}

export default TokenModels;
