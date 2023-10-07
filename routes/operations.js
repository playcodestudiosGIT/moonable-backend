
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRole,
} = require('../middlewares');


// const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { operationsGet,
    operationPut,
    operationPost,
    operationDelete,
    operationPatch,
    getOperationPorId,
    operationsBulkPost } = require('../controllers/operations');

const router = Router();


router.get('/', [
    validarJWT,
], operationsGet);

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], operationPut);

router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], operationPost);

router.post('/bulk', [
    validarJWT,
    validarCampos
], operationsBulkPost);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),

    validarCampos
], operationDelete);

// TODO: Aquí
router.get('/:id', [
    validarJWT,
    // esAdminRole,

    validarCampos
], getOperationPorId);



router.patch('/', operationPatch);





module.exports = router;