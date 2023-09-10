
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole,
} = require('../middlewares');


const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { clientesGet,
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch,
        getClientePorId } = require('../controllers/clientes');

const router = Router();


router.get('/', clientesGet );

router.put('/:id',[
   
    validarCampos
],clientesPut );

router.post('/',[
    
    validarCampos
], clientesPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    
    validarCampos
],clientesDelete );

// TODO: Aquí
router.get('/:id',[
    validarJWT,
    // esAdminRole,
    
    validarCampos
], getClientePorId );



router.patch('/', clientesPatch );





module.exports = router;