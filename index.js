var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const service_localstorage = require('./services/localstorageService');
const service_synonymService = require('./services/synonymService');
const script_gdocsync = require('./script/gdocsync');
const gdoc_sync_service = require('./services/googleSpreadsheetSyncService')

var list_synonym_sync = {
    synonym_property_types: require('./services/googleSpreadsheetService'),
    synonym_property_transaction_type: require('./services/googleSpreadsheetPropertyTrxTypeService')
}
module.exports.sync_rayasem_spreadseets = list_synonym_sync;
module.exports.gdoc_sync_service = gdoc_sync_service;
module.exports.synonym = service_synonymService;
module.exports.getLocalstorage = service_localstorage.getLocalstorage;
module.exports.constanta = require('./constanta');
module.exports.gdocsync = script_gdocsync;

module.exports.user = require('./services/UserService')
module.exports.security = require('./services/Security')
module.exports.errorCode = require('./services/ErrorCode')
module.exports.model = {
  user: require('./models/User'),
  role: require('./models/Role'),
  userrole: require('./models/UserRole'),
  product: require('./models/Product')
}
