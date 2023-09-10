
const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    
    clientId: {
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
        default: 'N/A',
    },
    countryResidency: {
        type: String,
        default: 'N/A',
    },
    nationality: {
        type: String,
        default: 'N/A',
    },
    birth: {
        type: String,
        default: 'N/A',
    },
    documentNumber: {
        type: String,
        default: 'N/A',
    },
    expirationDate: {
        type: String,
        default: 'N/A',
    },
    tierRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    residenceLand: {
        type: String,
        default: 'N/A',
    },
    nationalityLand: {
        type: String,
        default: 'N/A',
    },
    ibanLand: {
        type: String,
        default: 'N/A',
    },
    residenceRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    nationalityRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    ibanGeoRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    userAge: {
        type: String,
        default: 'N/A',
    },
    userAgeRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    userTypeRisk: {
        type: String,
        default: '5',
        enum: ['1', '2', '3', '4', '5']
    },
    concatenacionIban: {
        type: [String],
        default: [],
    },
    concatenacionBusinessNameIban: {
        type: [String],
        default: [],
    },
    auxRiesgo: {
        type: String,
        default: 'N/A',
    },
    estado: {
        type: Boolean,
        default: true
    }
});



ClienteSchema.methods.toJSON = function() {
    const { __v, _id, ...cliente  } = this.toObject();
    cliente.uid = _id;
    return cliente;
}

module.exports = model( 'Cliente', ClienteSchema );
