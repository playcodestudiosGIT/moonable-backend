
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
    getClientPorId,
    bulkClientesPost } = require('../controllers/clients');

const router = Router();


router.get('/', [
    validarJWT
], clientesGet);

router.put('/:id', [
    validarJWT,
    validarCampos
], clientesPut);

router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('ibanWallet', 'El Iban / Wallet es obligatorio').not().isEmpty(),
    validarCampos
], clientesPost);

router.post('/bulk', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], bulkClientesPost);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], clientesDelete);

// TODO: Aquí
router.get('/:id', [
    validarJWT,
    // esAdminRole,

    validarCampos
], getClientPorId);



router.patch('/', clientesPatch);





module.exports = router;