var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const constanta = require('../constanta');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1TRnVBn2b4S9ih6cygtnV0NLKoOcqRvcf88Lk4GTHoI4');
var sheet;

function run(options){
    var localStorageKeyName = options.localStorageKeyName || constanta['localstorage-property-trx-type-synonym'];
    async.series([
      function setAuth(step) {
        // see notes below for authentication instructions!
//        var creds = require('./service-account-creds.json');
//        var creds = require('../service-account-creds.json');
        // OR, if you cannot save the file locally (like on heroku)
        var creds_json = {
          client_email: 'yourserviceaccountemailhere@google.com',
          private_key: 'your long private key stuff here'
        }

//        doc.useServiceAccountAuth(creds, step);
        doc.useServiceAccountAuth(options.creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          if(err) console.log('err:',err);
    //      console.log('Loaded doc: ',info);
          sheet = info.worksheets[2];
          console.log('get info sheet 2: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
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
          'min-row': 2,
          'max-row': 200,
          'return-empty': true
        }, function(err, cells) {
    //      var cell = cells[1];
    //      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
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
    //        console.log('dataJson: ',dataJson);

            //save data dari google spreadsheet
            localStorage.setItem(localStorageKeyName, JSON.stringify(dataJson));
            var dataJsonFromLocalstorage = JSON.parse(localStorage.getItem(localStorageKeyName));
            console.log('data sync: ',dataJsonFromLocalstorage);
            console.log('test data for rent|'+dataJsonFromLocalstorage['for rent']+'|');
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