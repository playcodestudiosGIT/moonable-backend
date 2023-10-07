
const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    businessName: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    ibanWallet: {
        type: [String],
        require: true
    },
    operations: {
        type: [Schema.Types.ObjectId],
        ref: 'Operation',
        default: [],
        autopopulate: true
    },
    tier: {
        type: String,
        default: 'Tier 0',
        emun: ['Tier 0', 'Tier 1', 'Tier 2', 'OTC 1', 'OTC 2']
    },
    tierStatus: {
        type: String,
        default: 'Pending',
        emun: ['Pending', 'Approved']
    },
    clientType: {
        type: String,
        default: 'Individual',
        enum: ['Individual', 'Business']
    },
    registryDate: {
        type: String,
        default: '',
    },
    countryResidency: {
        type: String,
        default: '',
    },
    nationality: {
        type: String,
        default: '',
    },
    birth: {
        type: String,
        default: '',
    },
    documentNumber: {
        type: String,
        default: '',
    },
    expirationDate: {
        type: String,
        default: '',
    },
    residenceLand: {
        type: String,
        default: '',
    },
    nationalityLand: {
        type: String,
        default: '',
    },
    userAge: {
        type: String,
        default: '',
    },
    auxRiesgo: {
        type: String,
        default: '',
    },
    estado: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

ClientSchema.plugin(require('mongoose-autopopulate'));

ClientSchema.methods.toJSON = function() {
    const { __v, _id, ...client  } = this.toObject();
    client.uid = _id;
    return client;
}

module.exports = model( 'Client', ClientSchema );
