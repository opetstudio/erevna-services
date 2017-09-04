const _logger    = require('tracer').console();
const constanta = require('../constanta');
const service_localstorage = require('./localstorageService');

module.exports.synonymJenis= {
        'sale':'sale',
        'dijual':'sale',
        'rent':'rent',
        'disewakan':'rent',
        'any':'any'
    };

module.exports.country = {
    'id':{name:'Indonesia',host:'rayasem.co.id',lang:'id'},
    'ph':{name:'Philippines',host:'rayasem.com.ph',lang:'en'},
    'fr':{name:'France',host:'rayasem.com.fr',lang:'en'},
    'br':{name:'Brazil',host:'rayasem.com.br',lang:'en'}
}

module.exports.langByVertical = {
    'find-house':'en',
    'cari-rumah':'id',
    'id':'id',
    'en':'en'
}

var jenis_property_map = service_localstorage.getLocalstorage(constanta['localstorage-property-trx-type-synonym']);
module.exports.jenis_property = function(str){
    if(!str || !jenis_property_map) return null;
//    _logger.info('cari synonym untuk jenis. '+str);
    return jenis_property_map[str.toLowerCase()];
}
var property_type_map = service_localstorage.getLocalstorage(constanta['localstorage-property-types-synonym']);
module.exports.property_type = function(str){
    if(!str) return null;
    if(!property_type_map) return null;
//    _logger.info('cari synonym untuk tipe. '+str);
    return property_type_map[str.toLowerCase()];
}
var location_map = service_localstorage.getLocalstorage(constanta['localstorage-gdoc-sync-sheet-5']);
module.exports.location = function(str){
    if(!str) return null;
//    _logger.info('cari synonym untuk location. '+str);
    return location_map[str.toLowerCase()];
}

var partner_map = service_localstorage.getLocalstorage(constanta['localstorage-gdoc-sync-sheet-6']);
module.exports.partner = function(str){
    if(!str) return null;
//    _logger.info('cari synonym untuk location. '+str);
    return partner_map[str.toLowerCase()];
}
module.exports.service = function(str,storageKey){
    var storage = service_localstorage.getLocalstorage(storageKey);
    if(!str) return null;
//    _logger.info('cari synonym untuk location. '+str);
    return storage[str.toLowerCase()];
}

var price_map = {
    'id':[{key:"1000000",val:"1000000"},
    {key:"2000000",val:"2000000"},
    {key:"5000000",val:"5000000"},
    {key:"10000000",val:"10000000"},
    {key:"20000000",val:"20000000"},
    {key:"30000000",val:"30000000"},
    {key:"40000000",val:"40000000"},
    {key:"50000000",val:"50000000"},
    {key:"60000000",val:"60000000"},
    {key:"70000000",val:"70000000"},
    {key:"80000000",val:"80000000"},
    {key:"90000000",val:"90000000"},
    {key:"100000000",val:"100000000"},
    {key:"110000000",val:"110000000"},
    {key:"120000000",val:"120000000"},
    {key:"130000000",val:"130000000"},
    {key:"140000000",val:"140000000"},
    {key:"150000000",val:"150000000"},
    {key:"160000000",val:"160000000"},
    {key:"170000000",val:"170000000"},
    {key:"180000000",val:"180000000"},
    {key:"190000000",val:"190000000"},
    {key:"200000000",val:"200000000"},
    {key:"210000000",val:"210000000"},
    {key:"220000000",val:"220000000"},
    {key:"230000000",val:"230000000"},
    {key:"240000000",val:"240000000"},
    {key:"250000000",val:"250000000"},
    {key:"260000000",val:"260000000"},
    {key:"270000000",val:"270000000"},
    {key:"280000000",val:"280000000"},
    {key:"290000000",val:"290000000"},
    {key:"300000000",val:"300000000"},
    {key:"350000000",val:"350000000"},
    {key:"400000000",val:"400000000"},
    {key:"450000000",val:"450000000"},
    {key:"500000000",val:"500000000"},
    {key:"550000000",val:"550000000"},
    {key:"600000000",val:"600000000"},
    {key:"650000000",val:"650000000"},
    {key:"700000000",val:"700000000"},
    {key:"750000000",val:"750000000"},
    {key:"800000000",val:"800000000"},
    {key:"850000000",val:"850000000"},
    {key:"900000000",val:"900000000"},
    {key:"950000000",val:"950000000"},
    {key:"1000000000",val:"1000000000"},
    {key:"2000000000",val:"2000000000"},
    {key:"3000000000",val:"3000000000"},
    {key:"4000000000",val:"4000000000"},
    {key:"5000000000",val:"5000000000"},
    {key:"10000000000",val:"10000000000"}],
    'ph':[
         {key:"100000",val:"100000"},
         {key:"250000",val:"250000"},
         {key:"500000",val:"500000"},
         {key:"750000",val:"750000"},
         {key:"1000000",val:"1000000"},
         {key:"1100000",val:"1100000"},
         {key:"1200000",val:"1200000"},
         {key:"1300000",val:"1300000"},
         {key:"1400000",val:"1400000"},
         {key:"1500000",val:"1500000"},
         {key:"1600000",val:"1600000"},
         {key:"1700000",val:"1700000"},
         {key:"1800000",val:"1800000"},
         {key:"1900000",val:"1900000"},
         {key:"2000000",val:"2000000"},
         {key:"2100000",val:"2100000"},
         {key:"2200000",val:"2200000"},
         {key:"2300000",val:"2300000"},
         {key:"2400000",val:"2400000"},
         {key:"2500000",val:"2500000"},
         {key:"2600000",val:"2600000"},
         {key:"2700000",val:"2700000"},
         {key:"2800000",val:"2800000"},
         {key:"2900000",val:"2900000"},
         {key:"3000000",val:"3000000"},
         {key:"3100000",val:"3100000"},
         {key:"3200000",val:"3200000"},
         {key:"3300000",val:"3300000"},
         {key:"3400000",val:"3400000"},
         {key:"3500000",val:"3500000"},
         {key:"3600000",val:"3600000"},
         {key:"3700000",val:"3700000"},
         {key:"3800000",val:"3800000"},
         {key:"3900000",val:"3900000"},
         {key:"4000000",val:"4000000"},
         {key:"4100000",val:"4100000"},
         {key:"4200000",val:"4200000"},
         {key:"4300000",val:"4300000"},
         {key:"4400000",val:"4400000"},
         {key:"4500000",val:"4500000"},
         {key:"4600000",val:"4600000"},
         {key:"4700000",val:"4700000"},
         {key:"4800000",val:"4800000"},
         {key:"4900000",val:"4900000"},
         {key:"5000000",val:"5000000"},
         {key:"6000000",val:"6000000"},
         {key:"7000000",val:"7000000"},
         {key:"8000000",val:"8000000"},
         {key:"9000000",val:"9000000"},
         {key:"10000000",val:"10000000"},
         {key:"12000000",val:"12000000"},
         {key:"15000000",val:"15000000"},
     ]
 }
module.exports.price_map = price_map;

