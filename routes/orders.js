
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole,
} = require('../middlewares');


// const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { ordenesGet,
    ordenesPut,
    ordenesPost,
    ordenesDelete,
    ordenesPatch,
    getOrdenPorId,
    ordenesBulkPost } = require('../controllers/orders');

const router = Router();


router.get('/', [
    validarJWT,
], ordenesGet);

router.put('/:id', [
    validarJWT,
    validarCampos
], ordenesPut);

router.post('/', [
    validarJWT,
    validarCampos
], ordenesPost);

router.post('/bulk', [
    validarJWT,
    validarCampos
], ordenesBulkPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,

    validarCampos
], ordenesDelete);

// TODO: Aquí
router.get('/:id', [
    validarJWT,
    // esAdminRole,

    validarCampos
], getOrdenPorId);



router.patch('/', ordenesPatch);





module.exports = router;