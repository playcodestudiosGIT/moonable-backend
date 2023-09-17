const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');
const { generarJWT } = require('../helpers');

const getUsuarioPorId = async(req = request, res = response) => {

    const { id } = req.params;

    const user = await User.findById( id );

    res.json(user);
}


const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
    
    const { nombre, apellido, correo, password, rol } = req.body;
    const user = new User({ nombre, apellido, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    // Generar el JWT
    const token = await generarJWT( user.id );

    res.json({
        user,
        token
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto, { new: true } );

    res.json(user);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { estado: false } );

    
    res.json(user);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    getUsuarioPorId
}