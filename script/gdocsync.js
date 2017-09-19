const synonym_property_types = require('../services/googleSpreadsheetService');
const synonym_property_transaction_type = require('../services/googleSpreadsheetPropertyTrxTypeService');
const gdoc_sync_service =  require('../services/googleSpreadsheetSyncService');


//var erevna = require('../index');
const constanta = require('../constanta');
//var creds = require('../service-account-creds.json');
//const job = require('./job');
var service_1 = synonym_property_types;
var service_2 = synonym_property_transaction_type;
var arg = process.argv;
console.log('arg',arg);
function getParam(arg,key){
    if(arg.length==0 || !key) return null;
    var result = null;
    for(var i = 0;i<arg.length;i++){
        var str = arg[i];
        if(str.length==0) continue;
        var strSplit = str.split('=');
        if(strSplit.length < 2) continue;
        //console.log('strSplit=',strSplit);
        var theKey = strSplit[0];
        var theVal = strSplit[1];
        theKey=theKey.trim();
        theVal=theVal.trim();
        if(theKey=='-'+key){
            result = theVal;
            break;
        }
    }
    return result;
}

function execute(args, creds, xTheJob){
    arg = args || arg;
    if(arg.length == 0) return;
    var country = getParam(arg,'country');
    var minrow = getParam(arg,'minrow');
    var maxrow = getParam(arg,'maxrow');
    var gdoc = getParam(arg,'gdoc');
    var storagekey = getParam(arg,'storagekey');
    var sheetnumber = getParam(arg,'sheetnumber');
    var dataLocation = getParam(arg,'datalocation');
//    var job_key = getParam(arg,'job') || 'def';

    var theJob = xTheJob;
//    var theJob = job[job_key];

//    if(!country){
//        console.log('parameter country is null');
//        return;
//    }
    if(!minrow){
        console.log('parameter minrow is null');
        return;
    }
    if(!maxrow){
        console.log('parameter maxrow is null');
        return;
    }
    if(!sheetnumber){
        console.log('parameter sheetnumber is null');
        return;
    }
    if(!gdoc){
        console.log('parameter gdoc is null');
        return;
    }
    if(!storagekey){
        console.log('parameter storagekey is null');
        return;
    }
    console.log('minrow='+minrow);
    console.log('maxrow='+maxrow);
    console.log('gdoc='+gdoc);
    console.log('storagekey='+storagekey);

//    var sheetnumber = 5;
//    if(country=='id') sheetnumber = 0;

//    console.log('country='+country);
    var service_3 = gdoc_sync_service;
    var options3 = {
        creds:creds,
        sheetnumber:sheetnumber,
        localStorageKeyName:storagekey,
        min_row:minrow,
        max_row:maxrow,
        gdoc:gdoc,
        job: theJob,
        dataLocation: dataLocation

    }
    console.log('options3==>', options3);
    service_3.run(options3);

}
//execute();
module.exports.execute = execute;