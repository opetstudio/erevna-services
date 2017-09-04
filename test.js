var index = require('./index');
var assert = require('assert');

function unit_test_1(){
    var creds = require('./service-account-creds.json');
    var service_1 = index.sync_rayasem_spreadseets.synonym_property_types;
    var service_2 = index.sync_rayasem_spreadseets.synonym_property_transaction_type;
    var service_3 = index.gdoc_sync_service;
//    service_1.run({creds:creds});
//    service_2.run({creds:creds});
//    service_3.run({
//        creds:creds,
//        sheetnumber:5,
//        localStorageKeyName:'localstorage-gdoc-sync-sheet-5',
//        min_row:2,
//        max_row:200,
//
//    });

    var job = function(cells){
        var list=[];
        var tempRow = '';
        var theKey = '';
        var dataJson = {};
        cells.forEach(function(v,k){

            if(v.col < 3){
                if(tempRow != v.row){
                    tempRow = v.row;
                    theKey = v.value;
                    theKey = theKey.toLowerCase();
                }else{
                    var v = v.value;
                    v = v.toLowerCase();
                    dataJson[theKey] = v;
                }
    //                console.log('Cell R'+v.row+'C'+v.col+' = '+v.value);
            }
        });
        return dataJson;
    }
    var job2 = function(cells){
            var list=[];
            var tempRow = '';
            var theKey = '';
            var dataJson = {};
            dataJson.id={};
            dataJson.en={};
            var lang = '';
            cells.forEach(function(v,k){
                if(v.col < 4 && v.row > 1){
                    if(tempRow != v.row){
                        tempRow = v.row;
                        theKey = v.value;
                        theKey = theKey.toLowerCase();
                    }else{
                        if(v.col==2) lang = 'id';
                        if(v.col==3) lang = 'en';
                        var val = v.value;
//                        val = val.toLowerCase();
                        dataJson[lang][theKey] = val;
                    }
                        console.log('Cell R'+v.row+' C'+v.col+' = '+v.value);
                }
            });
            return dataJson;
        }
        var job3 = function(cells,currentDataRow){
            var list=[];
            var tempRow = '';
            var theKey = '';
            var dataJson = {};
            var dataRow = currentDataRow || {};
            var lang = '';

            var keyLevel1='';
            var keyLevel2='';
            var keyLevel3='';
            var keyLevel4='';

            var level1_lat='';
            var level2_lat='';
            var level3_lat='';
            var level4_lat='';

            var level1_long='';
            var level2_long='';
            var level3_long='';
            var level4_long='';



            cells.forEach(function(v,k){
                if(v.col < 17 && v.row > 1 && v.value!=''){
//                    if(tempRow != v.row){

                        if(v.col==1 && keyLevel1 != v.value && v.value != ''){
                            keyLevel1 = v.value;
                            keyLevel1 = keyLevel1.toLowerCase();
                            dataRow[keyLevel1] = dataRow[''+keyLevel1] || {};
                        }
                        if(v.col==3){
                            if(v.value != '') level1_lat = v.value;
//                            dataRow[keyLevel1] = dataRow[''+keyLevel1] || {};
                            dataRow[keyLevel1]['lat'] = level1_lat;
                        }
                        if(v.col==4){
                            if(v.value != '') level1_long = v.value;
//                            dataRow[''+keyLevel1] = dataRow[''+keyLevel1] || {};
                            dataRow[''+keyLevel1]['long'] = level1_long;
                        }
                        if(v.col==5 && keyLevel2 != v.value && v.value != ''){
                            keyLevel2 = v.value;
                            keyLevel2 = keyLevel2.toLowerCase();
                            dataRow[keyLevel1][keyLevel2] = dataRow[keyLevel1][keyLevel2] || {};
                        }
                        if(v.col==7){
                            if(v.value != '') level2_lat = v.value;
//                            dataRow[keyLevel1][keyLevel2] = dataRow[keyLevel1][keyLevel2] || {};
                            dataRow[keyLevel1][keyLevel2]['lat'] = level2_lat;
                        }
                        if(v.col==8){
                            if(v.value != '') level2_long = v.value;
//                            dataRow[keyLevel1][''+keyLevel2] = dataRow[keyLevel1][''+keyLevel2] || {};
                            dataRow[keyLevel1][''+keyLevel2]['long'] = level2_long;
                        }
                        if(v.col==9 && keyLevel3 != v.value && v.value != ''){
                            keyLevel3 = v.value;
                            keyLevel3 = keyLevel3.toLowerCase();
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3] = dataRow[keyLevel1][''+keyLevel2][keyLevel3] || {};
                        }
                        if(v.col==11){
                            if(v.value != '') level3_lat = v.value;
//                            dataRow[keyLevel1][''+keyLevel2][keyLevel3] = dataRow[keyLevel1][''+keyLevel2][keyLevel3] || {};
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3]['lat'] = level3_lat;
                        }
                        if(v.col==12){
                            if(v.value != '') level3_long = v.value;
//                            dataRow[keyLevel1][''+keyLevel2][keyLevel3] = dataRow[keyLevel1][''+keyLevel2][keyLevel3] || {};
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3]['long'] = level3_long;
                        }
                        if(v.col==13 && keyLevel4 != v.value && v.value != ''){
                            keyLevel4 = v.value;
                            keyLevel4 = keyLevel4.toLowerCase();
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] = dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] || {};
                        }
                        if(v.col==15){
                            if(v.value != '') level4_lat = v.value;
//                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] = dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] || {};
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4]['lat'] = level4_lat;
                        }
                        if(v.col==16){
                            if(v.value != '') level4_long = v.value;
//                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] = dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] || {};
                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4]['long'] = level4_long;
                        }

                        if(tempRow != v.row && v.value != ''){
                            tempRow = v.row;
                            theKey = v.value;
                            theKey = theKey.toLowerCase();

                        }
//                        if(v.col==3) lang = 'en';
//                        var val = v.value;
////                        val = val.toLowerCase();


                    console.log('Cell R'+v.row+' C'+v.col+' = '+v.value);
                }
            });
            dataJson = dataRow;
            return dataJson;
        }

    var options = {
                      creds:creds,
                      sheetnumber:6,
                      localStorageKeyName:'localstorage-gdoc-sync-sheet-6',
                      min_row:2,
                      max_row:200,
                      gdoc:'1TRnVBn2b4S9ih6cygtnV0NLKoOcqRvcf88Lk4GTHoI4',
          //            job: job,

                  }
    var options2 = {
                      creds:creds,
                      sheetnumber:1,
                      localStorageKeyName:'localstorage-gdoc-sync-rayasem-translate-sheet-1',
                      min_row:1,
                      max_row:10,
                      gdoc:'1s2pGFg0-JD5Hmzhm6gjxK0kmezAiSw42NUKPPIUpvi8',
                      job: job2

                  }

  var options3 = {
                        creds:creds,
                        sheetnumber:0,
                        localStorageKeyName:'localstorage-gdoc-sync-rayasem-location-sheet-0',
                        min_row:5,
                        max_row:5,
                        gdoc:'1PyMqH5ts4g-I_19q8awi09yL00iFk404RdtRTXX-OEE',
                        job: job3

                    }
    service_3.run(options3);

}

function unit_test_2(){
    var storage = index.getLocalstorage('property-types-synonym');
    var actual = storage['tnh garapan'];
    var expected = 'land';
    var message = 'expected='+expected+'|but='+actual;
    assert.equal(actual, expected, message);
    console.log('unit_test_2 OK');
}
function unit_test_3(){
    var actual = index.synonym.property_type('tnh garapan');
    var expected = 'land';
    var message = 'expected='+expected+'|but='+actual;
    assert.equal(actual, expected, message);
    console.log('unit_test_3 OK');
}
function unit_test_4(){
    var actual = index.synonym.jenis_property('for sale');
    var expected = 'sale';
    var message = 'expected='+expected+'|but='+actual;
    assert.equal(actual, expected, message);
    console.log('unit_test_4 OK');
}
function unit_test_5(){
    const translations = index.getLocalstorage('localstorage-gdoc-sync-rayasem-translate-sheet-1');
    var actual = translations['en']['title-location'];
    var expected = 'location';
    var message = 'expected='+expected+'|but='+actual;
    assert.equal(actual, expected, message);
    console.log('unit_test_5 OK');
}

unit_test_1();
//unit_test_2();
//unit_test_3();
//unit_test_4();
//unit_test_5();
