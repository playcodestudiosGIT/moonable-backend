const { response, request } = require('express');
var mongoose = require('mongoose');
const { Operation, Client } = require('../models/index');



const getOperationPorId = async (req = request, res = response) => {

    const { id } = req.params;

    const operation = await Operation.findById(id);

    res.json(operation);
}


const operationsGet = async (req = request, res = response) => {

    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, operations] = await Promise.all([
        Operation.countDocuments(query),
        Operation.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        operations
    });
}

const operationPost = async (req, res = response) => {

    const operation = new Operation(req.body);

    var opid;

    await operation.save().then(operation => opid = operation.id);
    try {
        const client = await Client.findOne({ ibanWallet: operation.ibanWallet })
        client.operations.push(opid);

        await client.save().then(async client => {
            const newOp = await Operation.findByIdAndUpdate(opid, { client: client.id }, { new: true });
            res.json({
                newOp,
            });

        })




    } catch (error) {
        console.log(error)
    }


}

const operationsBulkPost = async (req, res = response) => {

    var listIban = [];



    try {
        const body = req.body["operations"];


        JSON.parse(body).forEach(async element => {
            const { id, estado, createdAt, updatedAt, ...resto } = element;

            op = new Operation(resto);
            await op.save(async function (err, op) {
                const client = await Client.findOne({ ibanWallet: op.ibanWallet });
                if (client) {
                    op.client = client.id;
                    client.operations.push(op.id);
                    await op.save();
                    await client.save()

                } else {
                    listIban.push(operation.ibanWallet)
                }

            });


        });

        res.json({ msg: "operaciones agregadas", noExist: listIban });

    } catch (error) {
        console.log(error)

    }

}

const operationPut = async (req, res = response) => {

    const { id } = req.params;

    const { uid, estado, ...operationPut } = req.body;

    const operation = await Operation.findByIdAndUpdate(id, operationPut, { new: true });

    res.json(operation);
}

const operationPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - operationPatch'
    });
}

const operationDelete = async (req, res = response) => {

    const { id } = req.params;
    const operation = await Operation.findByIdAndUpdate(id, { estado: false });


    res.json(operation);
}




module.exports = {
    operationsGet,
    operationPost,
    operationPut,
    operationPatch,
    operationDelete,
    operationsBulkPost,
    getOperationPorId,

}