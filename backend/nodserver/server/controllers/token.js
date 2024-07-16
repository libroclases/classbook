import model from '../models';
const { Token } = model;

const speakeasy = require('speakeasy');
const uuid =  require('uuid');


class Tokens {

    static create(req, res) {
        const secret = speakeasy.generateSecret({ length: 20});
        const id = uuid.v4();
        return Token
          .create({
            secret: secret.base32,
            id: id
        })
          .then(token => res.status(201).send({
            status: "success",
            message: "Secret Token generated ",
            token
          }))
          .catch(error => res.status(400).send(error));
        }

    static veifyToken(req, res) {
        
      const { userId, auth } = req.body;

        Token.findByPk(userId).then((token) => { 

          const verified = speakeasy.totp.verify({
            secret: token.secret,
            encoding: 'base32',
            token: auth,
        });

        if(verified) {

          Token.update({
            authIsSet: true
          }, {
            where: {
              id: userId
            }
          });
          
          return res.status(200).send({
              status: "success",
              message: "Token is valid",
          })
      } else {
          return res.status(400).send({
              status: "error",
              message: "Token is invalid",
          });
      }


        }).catch(error => res.status(400).send(error));

    }  

}

export default Tokens;