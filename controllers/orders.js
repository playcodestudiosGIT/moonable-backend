const { response, request } = require('express');

const Order = require('../models/order');

const getOrdenPorId = async(req = request, res = response) => {

    const { id } = req.params;

    const order = await Order.findById( id );

    res.json(order);
}


const ordenesGet = async(req = request, res = response) => {

    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, orders ] = await Promise.all([
        Order.countDocuments(query),
        Order.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        orders
    });
}

const ordenesPost = async(req, res = response) => {   
    const order = new Order(req.body);

    await order.save();

    res.json({
        order,
    });
}

const ordenesBulkPost = async (req, res = response) => {

    const body = req.body["ordenes"];
    

    // var str = body.slice(1).slice(0, -1);
    var jsonObj = JSON.parse(body);

    Order.create(jsonObj, function (err) {
        if (!err) {
            res.status(200).json({
                msg: 'Carga de Ordenes satisfactoria'
            });
        } else { 
            res.status(400).json({
                msg: 'Algo salio mal.',
            });
         }
    });
}

const ordenesPut = async(req, res = response) => {

    const { id } = req.params;
    const ordenPut = req.body;

    const order = await Order.findByIdAndUpdate( id, ordenPut, { new: true } );

    res.json(order);
}

const ordenesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - ordenesPatch'
    });
}

const ordenesDelete = async(req, res = response) => {

    const { id } = req.params;
    const order = await Order.findByIdAndUpdate( id, { estado: false } );

    
    res.json(order);
}




module.exports = {
    ordenesGet,
    ordenesPost,
    ordenesPut,
    ordenesPatch,
    ordenesDelete,
    ordenesBulkPost,
    getOrdenPorId,
    
}