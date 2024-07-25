import model from '../models';
const { Token } = model;

const speakeasy = require('speakeasy');
const uuid =  require('uuid');
const  QRCode = require('qrcode');

class Tokens {

    static create(req, res) {
        
        
        const tmp_secret = speakeasy.generateSecret({ length: 20});
        // var  urlcode = tmp_secret.otpauth_url;
        var urlcode = '';
        const id = uuid.v4();

        QRCode.toDataURL(tmp_secret.otpauth_url, function(err, url) {

          return Token
          .create({
            secret: tmp_secret.base32,
            dataUrl: '', // url code
            id: id,
            authIsSet: false,
            usuarioId: req.params.usuarioId
        })
          .then(token => res.status(201).send({
            status: "success",
            message: "Secret Token generated ",
            token
          }))
          .catch(error => res.status(400).send(error));
            
        });
         

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

    static validateToken(req, res) {
        
      const { userId, auth } = req.body;

        Token.findByPk(userId).then((token) => { 

          const validated = speakeasy.totp.verify({
            secret: token.secret,
            encoding: 'base32',
            token: auth,
            windows: 1
        });

        if(validated) { return res.status(200).send({ validated: true });
        } else { return res.status(200).send({ validated: false }) }
      }
      ).catch(error => res.status(400).send(error));}
}

export default Tokens;