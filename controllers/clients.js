const { response, request } = require('express');

const Client = require('../models/client');

const getClientPorId = async(req = request, res = response) => {

    const { id } = req.params;

    const client = await Client.findById( id );

    res.json(client);
}


const clientesGet = async(req = request, res = response) => {

    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, clients ] = await Promise.all([
        Client.countDocuments(query),
        Client.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        clients
    });
}

const clientesPost = async(req, res = response) => {   
    const client = new Client(req.body);
    // Encriptar la contraseña
    // Guardar en BD
    await client.save();
    // Generar el JWT=
    res.json({
        client,
    });
}

const bulkClientesPost = async(req, res = response) => {   
    const body = req.body["clientes"];

    try {
        
        var jsonObj = JSON.parse(body);
    } catch (error) {
        return res.status(400).json({
            msg: 'formato incorrecto'
        })
    }
    

    Client.create(jsonObj, function (err) {
        if (!err) {
            res.status(200).json({
                msg: 'Carga de clientes satisfactoria'
            });
        } else { 
            console.log(err);
            res.status(400).json({
                msg: 'Algo salio mal.',
            });
         }
    });
}

const clientesPut = async(req, res = response) => {

    const { id } = req.params;
    const clientePut = req.body;

    const client = await Client.findByIdAndUpdate( id, clientePut, { new: true } );

    res.json(client);
}

const clientesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - clientesPatch'
    });
}

const clientesDelete = async(req, res = response) => {

    const { id } = req.params;
    const client = await Client.findByIdAndUpdate( id, { estado: false } );

    
    res.json(client);
}




module.exports = {
    clientesGet,
    clientesPost,
    clientesPut,
    clientesPatch,
    clientesDelete,
    getClientPorId,
    bulkClientesPost
}