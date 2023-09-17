
const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
    
    ordenId: {
        type: String,
        default: 'N/A',
        required: [true, 'El Id de la order es obligatorio']
    },
    platform: {
        type: String,
        default: 'N/A'
    },
    businessName: {
        type: String,
        default: 'N/A'
    },
    firstName: {
        type: String,
        default: 'N/A'
    },
    lastName: {
        type: String,
        default: 'N/A'
    },
    ibanWallet: {
        type: [String],
        default: []
    },
    fiatAmount: {
        type: String,
        default: 'N/A',
    },
    fiatType: {
        type: String,
        default: 'N/A',
        emun: ['N/A', 'EUR', 'USDT']
    },
    exchangeRate: {
        type: String,
        default: 'N/A',
    },
    totalAssetPurchase: {
        type: String,
        default: 'N/A',
    },
    assetType: {
        type: String,
        default: 'N/A',
        emun: ['N/A', 'EUR', 'USDT']
    },
    percent: {
        type: String,
        default: 'N/A'
    },
    dueDate: {
        type: String,
        default: 'N/A'
    },
    estado: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });



OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order  } = this.toObject();
    order.uid = _id;
    return order;
}

module.exports = model( 'Order', OrderSchema );
