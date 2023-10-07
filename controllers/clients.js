const { response, request } = require('express');

const Client = require('../models/client');

const getClientPorId = async (req = request, res = response) => {

    const { id } = req.params;

    const client = await Client.findById(id);

    res.json(client);
}


const clientesGet = async (req = request, res = response) => {

    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, clients] = await Promise.all([
        Client.countDocuments(query),
        Client.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        clients
    });
}

const clientesPost = async (req, res = response) => {
    const client = new Client(req.body);
    client.operations = [];
    try {
        await client.save();
        return res.json({
            client,
        });
    } catch (error) {
        console.log(error)
    }




    // Generar el JWT=

}

const bulkClientesPost = async (req, res = response) => {
    const body = req.body["clientes"];
    try {
        const ok = await JSON.parse(body).forEach(async element => {
            const client = new Client(element);
            const isExist = await Client.findOne({ ibanWallet: client.ibanWallet });
            if (isExist) {

            } else {
                await client.save();
            }
        });

        res.json({
            msg: `Se agregaron los clientes`,

        });

    } catch (error) {
        // console.log(error)
    }


}

const clientesPut = async (req, res = response) => {

    const { id } = req.params;
    const clientePut = req.body;

    const client = await Client.findByIdAndUpdate(id, clientePut, { new: true });

    res.json(client);
}

const clientesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - clientesPatch'
    });
}

const clientesDelete = async (req, res = response) => {

    const { id } = req.params;
    
    const client = await Client.findByIdAndUpdate(id, { estado: false }, {new: true});

   
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