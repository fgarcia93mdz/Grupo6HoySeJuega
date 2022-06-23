// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const { body } = require('express-validator');


// ************ Controller Require ************
const productsController = require('../controllers/productsRegisterOwnerController');

// ************ MULTER ************

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'public/img/products')
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)

    // const name = file.originalname
    // cb(null, name)

  }

})

const upload = multer({ storage: storage })

const validations = [
  body("nombre").notEmpty().withMessage('Tienes que escribir un nombre'),
  body("apellido").notEmpty().withMessage('Tienes que escribir un apellido'),
  body("email").notEmpty().withMessage('Tienes que escribir un email'),
  body("password").notEmpty().withMessage('Tienes que escribir una contraseña'),
  body("nombreDelLugar").notEmpty().withMessage('Tienes que escribir un nombre del lugar'),
  body("direccion").notEmpty().withMessage('Tienes que escribir una direccion')
];

router.get('/', productsController.register);

/*** CREATE ONE PRODUCT ***/ 

router.get('/registerOwner', productsController.create); 
router.post('/registerOwner', upload.any("img-cancha"), validations, productsController.store); 

/*** REDIRECT ***/ 

router.get('/userOwner/welcome', productsController.redirect); 

// /*** GET ONE PRODUCT ***/ 

// router.get('/detail/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 

router.get('/editOwnerForm/:id/', productsController.edit);
router.patch('/editOwnerForm/:id/',upload.any(), productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
// router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
