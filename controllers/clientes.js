const { response, request } = require('express');

const Cliente = require('../models/cliente');

const getClientePorId = async(req = request, res = response) => {

    const { id } = req.params;

    const cliente = await Cliente.findById( id );

    res.json(cliente);
}


const clientesGet = async(req = request, res = response) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, clientes ] = await Promise.all([
        CLiente.countDocuments(query),
        Cliente.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        clientes
    });
}

const clientesPost = async(req, res = response) => {   
    const cliente = new Cliente(req.body);
    // Encriptar la contraseña
    // Guardar en BD
    await cliente.save();
    // Generar el JWT=
    res.json({
        cliente,
    });
}

const clientesPut = async(req, res = response) => {

    const { id } = req.params;
    const clientePut = req.body;

    const cliente = await Cliente.findByIdAndUpdate( id, clientePut, { new: true } );

    res.json(cliente);
}

const clientesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - clientesPatch'
    });
}

const clientesDelete = async(req, res = response) => {

    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate( id, { estado: false } );

    
    res.json(cliente);
}




module.exports = {
    clientesGet,
    clientesPost,
    clientesPut,
    clientesPatch,
    clientesDelete,
    getClientePorId
}