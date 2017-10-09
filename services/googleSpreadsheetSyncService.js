var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var LocalStorage = require('node-localstorage').LocalStorage;
const constanta = require('../constanta');

// spreadsheet key is the long id in the sheets URL

var sheet;

function run(options){
    const localStorage = new LocalStorage(options.dataLocation || './scratch');

    //cek mandatory
    var isError = 0;

    if(!options.sheetnumber && options.sheetnumber != 0){
        console.log('Error: options.sheetnumber is null');
        isError = 1;
    }
    if(!options.creds){
        console.log('Error: options.creds is null');
        isError = 1;
    }
    if(!options.localStorageKeyName){
        console.log('Error: options.localStorageKeyName is null');
        isError = 1;
    }
    if(!options.min_row){
        console.log('Error: options.min_row is null');
        isError = 1;
    }
    if(!options.max_row){
        console.log('Error: options.max_row is null');
        isError = 1;
    }
    if(!options.gdoc){
        console.log('Error: options.gdoc is null');
        isError = 1;
    }
    if(isError == 1) return;

    var gdocSpreadsheets = options.gdoc || '1TRnVBn2b4S9ih6cygtnV0NLKoOcqRvcf88Lk4GTHoI4';

    var doc = new GoogleSpreadsheet(gdocSpreadsheets);

    var localStorageKeyName = options.localStorageKeyName || constanta['localstorage-gdoc-sync-sheet-'+options.sheetnumber];
    async.series([
      function setAuth(step) {
        // see notes below for authentication instructions!
//        var creds = require('./service-account-creds.json');
//        var creds = require('../service-account-creds.json');
        // OR, if you cannot save the file locally (like on heroku)
//        var creds_json = {
//          client_email: 'yourserviceaccountemailhere@google.com',
//          private_key: 'your long private key stuff here'
//        }

//        doc.useServiceAccountAuth(creds, step);
        doc.useServiceAccountAuth(options.creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          if(err) console.log('err:',err);
//          console.log('Loaded doc: ',info);
          sheet = info.worksheets[options.sheetnumber];
          console.log('get info sheet '+options.sheetnumber+': '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
    //  function workingWithRows(step) {
    //    // google provides some query options
    //    sheet.getRows({
    //      offset: 1,
    //      limit: 105
    ////      orderby: 'col2'
    //    }, function( err, rows ){
    //      console.log('Read '+rows.length+' rows');
    ////      console.log('Read row 0',rows[0]);
    //
    //      // the row is an object with keys set by the column headers
    ////      rows[0].colname = 'new val';
    ////      rows[0].save(); // this is async
    //
    //      // deleting a row
    ////      rows[0].del();  // this is async
    //
    //      step();
    //    });
    //  },
      function workingWithCells(step) {
        sheet.getCells({
          'min-row': options.min_row,
          'max-row': options.max_row,
          'return-empty': true
        }, function(err, cells) {
    //      var cell = cells[1];
    //      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
            if(options.job){
                console.log('using own job');
                var currentLocalStorage = localStorage.getItem(localStorageKeyName);
                var dataJsonFromLocalstorage = null;
                if(currentLocalStorage) dataJsonFromLocalstorage = JSON.parse(currentLocalStorage);
                dataJson = options.job(cells, dataJsonFromLocalstorage);
            }else{
                console.log('using default job');
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
            }


    //        console.log('dataJson: ',dataJson);


            //save data dari google spreadsheet
            var dataJsonString = JSON.stringify(dataJson);
            console.log(dataJsonString);
            if(options.islocalsave == 'y') localStorage.setItem(localStorageKeyName, dataJsonString);

            if(options.jobCallback){
                options.jobCallback({dataJson:dataJson});
            }

//            console.log('data sync: ',dataJsonFromLocalstorage);

    //      // cells have a value, numericValue, and formula
    //      cell.value == '1'
    //      cell.numericValue == 1;
    //      cell.formula == '=ROW()';
    //
    //      // updating `value` is "smart" and generally handles things for you
    //      cell.value = 123;
    //      cell.value = '=A1+B2'
    //      cell.save(); //async
    //
    //      // bulk updates make it easy to update many cells at once
    //      cells[0].value = 1;
    //      cells[1].value = 2;
    //      cells[2].formula = '=A1+B1';
    //      sheet.bulkUpdateCells(cells); //async

    //      step();
        });
      },
      function managingSheets(step) {
        doc.addWorksheet({
          title: 'my new sheet'
        }, function(err, sheet) {

          // change a sheet's title
          sheet.setTitle('new title'); //async

          //resize a sheet
          sheet.resize({rowCount: 50, colCount: 20}); //async

          sheet.setHeaderRow(['name', 'age', 'phone']); //async

          // removing a worksheet
          sheet.del(); //async

          step();
        });
      }
    ], function(err){
        if( err ) {
          console.log('Error: '+err);
        }
    });
}
module.exports.run = run;
