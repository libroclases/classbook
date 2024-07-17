import model from '../models';
// import * as crypto from "crypto";
// import {encode} from "hi-base32";
// import OTPAuth from "otpauth";
// import QRCode from "qrcode";


const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const speakeasy = require('speakeasy');
const uuid =  require('uuid');

const anno = (new Date().getFullYear()) - 2020;

const { Usuario, TipoUsuario, Alumno, Apoderado, AsistenteColegio ,Profesor, Admin, Anno, Colegio, Sexo, InscripcionColegio , Tema} = model;

class Usuarios {

    static list(req, res) {
        return Usuario
            .findAll({attributes: ['id', 'username', 'email'] ,include: [ 
                { model:TipoUsuario, attributes:['id','nombre'], where: { } },
                { model:Tema, attributes:['id','nombre'], where: { } },
            ],
             order: [['username','ASC']] })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error));;
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Usuario
            .findAll({  
                where: {
                    [Op.or] : [
                        { username : {[Op.iLike]: `%${expr}%`}},
                        { email : {[Op.iLike]: `%${expr}%`}},
                ]
                } ,include: [ 
                    { model:TipoUsuario, attributes:['id','nombre'], where: { } },
                    { model:Tema, attributes:['id','nombre'], where: { } },
                ],   
        } 
    )
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error));
    }


    
  static getPersonalInfo(req, res) {

    const { email } = req.query;
    // console.log(email)   
    Usuario.findOne({
      where: { email: email },
      attributes: ['id','username','email'],
      include: [ 
        { model:TipoUsuario, attributes:['id','nombre'], where: { } },
        { model:Tema, attributes:['id','nombre'], where: { } },
    ],
    })
    .then(usuario => {

        var personalInfo;
        var tipousuarioId = usuario.dataValues.TipoUsuario.dataValues.id;
        var Tipo;
        var profesorId;

        if ( tipousuarioId == 1) {  Tipo = Profesor} 
        else if ( tipousuarioId == 2 ) { Tipo = Alumno } 
        else if ( tipousuarioId == 3 ) { Tipo = Apoderado } 
        else if ( tipousuarioId == 4 ) { Tipo = AsistenteColegio } 
        else if ( tipousuarioId == 5 ) { Tipo = Admin } 

            Tipo.findOne({
                where: { usuarioId: usuario.dataValues.id },
                attributes: ['id','nombre','apellido1','apellido2'],
                include: [ 
                    { model:Sexo, attributes:['id','nombre'], where: { } },
                ],          
                })
                .then(datos_persona => {
                profesorId=datos_persona.dataValues.id;
                personalInfo = {'usuario':usuario, 'datos_persona': datos_persona};
                 
                })
                .then( () => {
                    if (tipousuarioId == 1) {
                          
                        InscripcionColegio.findAll({ where : { profesorId, annoId: anno  }, attributes:['esPie','esUtp'], 
                        include: [
                            {model: Anno , attributes: ['id','nombre'] , where: {}},
                            {model: Colegio, attributes: ['id','nombre'], where: {}},
                            {model: Profesor, attributes: ['id','nombre','apellido1','apellido2'], where:{}}
                        ]})
                        .then(inscripcionColegio => { res.status(200).send({personalInfo, inscripcionColegio}); })
                        
                    }
                    else {
                        { res.status(200).send({personalInfo})}
                    }
                
                
                                    
                     
                });
            
        
    })
    .catch(error => res.status(400).send(error));
    }


    static getByFk(req, res) {
        const {tipousuarioId, temaId} = req.params;

        let consulta = {};


        if (tipousuarioId != '0') {  consulta['tipousuarioId'] = tipousuarioId;  }
        if (temaId != '0') {  consulta['temaId'] = temaId;  }


        return Usuario
          .findAll({ where : consulta, attributes: ['id','username','email'] ,
            include: [ 
            { model:TipoUsuario, attributes:['id','nombre'], where: { } },
            { model:Tema, attributes:['id','nombre'], where: { } },

           ],
            order: [['username','ASC']] 
       })
          .then(usuario => res.status(200).send(usuario))
          .catch(error => res.status(400).send(error));;
    }

    static getByPk(req, res) {
              
        return Usuario
        .findByPk(req.params.usuarioId)
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
      }

      static byEmailSearch(req, res) {
        const { expr } = req.params;
        console.log('expr:',expr)    
        return Usuario
            .findOne({  
                where: {email : expr } , include: [
                    { model: TipoUsuario, attributes:['id','nombre'], where: { } },
                    { model: Tema, attributes: ['id','nombre'], where: { } },        
                ],
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
    }

      static getLastId(req, res) {
              
        return Usuario.findOne({
            attributes: [Sequelize.fn('max', Sequelize.col('id'))],
            raw: true,
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
    const { tipousuarioId, temaId } = req.params;
    const { username, email } = req.body;
    return Usuario
    .create({
        username,
        email,
        tipousuarioId,
        temaId 
    })
    .then(usuario => res.status(201).send({
        success: true,
        message: 'Usuario creado exitosamente',
        usuario
        }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    
    const { username, email, operativo, TipoUsuario, Tema  } = req.body
    return Usuario
        .findByPk(req.params.usuarioId)
        .then((usuario) => {
            usuario.update({
            email: email || usuario.email,
            username: username || usuario.username,
            operativo: operativo || usuario.operativo,
            tipousuarioId: TipoUsuario || usuario.tipousuarioId,
            temaId: Tema || usuario.temaId, 
            
    })
    .then((updateUsuario) => {
        res.status(200).send({
            message: 'Usuario actualizado exitosamente',
                data: {
                email: email || updateUsuario.email,
                username: username || updateUsuario.username,
                operativo: operativo || updateUsuario.operativo,
                tipousuarioId : TipoUsuario || updateUsuario.tipousuarioId,
                temaId : Tema || updateUsuario.temaId,
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }

    /*
    static enable2fa(req, res) {        


        const generateBase32Secret = () => {
            const buffer = crypto.randomBytes(15);
            const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
            return base32;
          };

        // Generate a secret key for the user
        const base32_secret = generateBase32Secret();

        // Generate a QR code URL for the user to scan
        let totp = new OTPAuth.TOTP({
            issuer: "libroclases.cl",
            label: "libroclases",
            algorithm: "SHA1",
            digits: 6,
            secret: base32_secret,
        });

        let otpauth_url = totp.toString();

          // Generate and send the QR code as a response
        QRCode.toDataURL(otpauth_url, (err) => {
         if(err) {
            return res.status(500).json({
               status: 'fail',
               message: "Error while generating QR Code"
            })
        }
        res.json({
           status: "success",
           data: {
              qrCodeUrl: otpauth_url,
              secret: base32_secret
            }
        })
      });

   

        return Usuario
            .findByPk(req.params.usuarioId)
            .then((usuario) => {
                usuario.update({
                  secret: base32_secret || usuario.secret,                   
        })
        .then((updateUsuario) => {
            res.status(200).send({
                message: 'Usuario actualizado exitosamente',
                    data: {
                    secret: secret || updateUsuario.secret,
                    }
                })
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
        }
    */
    /*
    static generateSecret(req, res) {
        const secret = speakeasy.generateSecret({ length: 20});
        const uid = uuid.v4();
        return Usuario.findByPk(req.params.Id)
        .then((usuario) => {
            usuario.update({
                secret: secret.base32,
                uid
            }).then((up) => {
              res.status(200).send({
                message: 'Usuario actualizado exitosamente',
                    data: {
                    secret: secret || up.secret,
                    uid: uid || up.uid,
              }
            }
          )
          .catch(error => res.status(400).send(error));
            
        }
       )
      }
     )
    }

    static veifyToken(req, res) {
        
      const { uid, auth } = req.body;

        Usuario.findOne({where: {uid}}).then((token) => { 
          console.log('poronga:',token.secret, auth);
          const verified = speakeasy.totp.verify({
            secret: token.secret,
            encoding: 'base32',
            token: auth,
        });

        if(verified) {

          Usuario.update({
            authIsSet: true
          }, {
            where: {
              id: Id
            }
          });
          
          return res.status(200).send({
              status: "success",
              message: "Token is valid",
          });
      } else {
          return res.status(400).send({
              status: "error",
              message: "Token is invalid",
          });
      }


        });

    }
    */
}

export default Usuarios;