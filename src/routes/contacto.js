require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Contacto } = require("../db");
const { transporter } = require('../services/nodemailerGmail')


router.post('/', async (req, res) => {
    console.log('---------entre a post, voy a guardar un contacto---------')
    
    try {
      let {
        nombre,
        apellido,
        email,
        direpost,
        mensaje,
        
      } = req.body
      console.log(req.body)
      let guardarContacto = await Contacto.create({
        nombre, 
        apellido,
        email,
        direpost,
        mensaje,
        })

      let interno = await transporter.sendMail({
        from: `mensaje de -${nombre}- -${apellido}- desde -${email}-`, 
        to: "gamestackhenry@gmail.com", 
        subject: "Nuevo conctacto de game Stack", 
        text: `desde la web`, 
        html: `mensaje de: <b>${nombre} ${apellido}</b>, 
              <br>con el asunto: <b>${direpost}</b>  recibido!- 
              <br>mensaje: <b>${mensaje}</b>
              <br> direccion para respuesta: <span>${email}</span> `, 
      });

      let devolucion = await transporter.sendMail({
        from: 'confirmacion Game Stack', 
        to: `${email}`, 
        subject: "recibimos su mensaje", 
        text: `mensaje de contacto`, 
        html: "<b>hemos recibido su mensaje:, <br>nos pondremos en contacto con usted a la brevedad posible!, <br>muchas gracias!</b> <br><span>EL equipo de Game Stack</span>", 
      });



      res.send("se guardo info de contacto");
    } catch(error) {
      console.log({error})
      res.status(406).json("error al guardar")
    }
    
    
  })

  module.exports = router;