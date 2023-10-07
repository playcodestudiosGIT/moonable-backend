
const { Schema, model } = require('mongoose');

const OperationSchema = Schema({
    
    client: {
        type: String,
        default: ''
    },
    platform: {
        type: String,
        default: ''
    },
    ibanWallet: {
        required: [true, 'El ibanWallet es Obligatorio'],
        type: String,
        default: ''
    },
    fiatAmount: {
        type: Number,
        default: 0,
    },
    fiatType: {
        type: String,
        default: 'EUR',
        emun: ['EUR', 'USDT']
    },
    exchangeRate: {
        type: Number,
        default: 0,
    },
    assetType: {
        type: String,
        default: 'EUR',
        emun: ['EUR', 'USDT']
    },
    percent: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: Date.now() + process.env.DUE_TIME_OPERATIONS*60*60*1000
    },
    estado: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });




//-- funciones




OperationSchema.methods.toJSON = function() {
    const { __v, _id, ...operation  } = this.toObject();
    operation.uid = _id;
    return operation;
}

module.exports = model( 'Operation', OperationSchema );
