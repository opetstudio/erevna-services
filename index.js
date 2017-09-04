var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const service_localstorage = require('./services/localstorageService');
const service_synonymService = require('./services/synonymService');
const gdoc_sync_service =  require('./services/googleSpreadsheetSyncService');

var list_synonym_sync = {
    synonym_property_types: require('./services/googleSpreadsheetService'),
    synonym_property_transaction_type: require('./services/googleSpreadsheetPropertyTrxTypeService')
}
module.exports.sync_rayasem_spreadseets = list_synonym_sync;
module.exports.gdoc_sync_service = gdoc_sync_service;
module.exports.synonym = service_synonymService;
module.exports.getLocalstorage = service_localstorage.getLocalstorage;
