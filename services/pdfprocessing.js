var fs = require('fs');
var PDFParser = require("pdf2json");
var pdfParser = new PDFParser();
//console.log('cek');

const http = require("http");





    pdfParser.on("pdfParser_dataError", function(errData){console.error(errData.parserError)});
    pdfParser.on("pdfParser_dataReady", function(pdfData){
//        console.log('tes');
        var pages = pdfData.formImage.Pages;
        var location = {};
        var kab_temp = '';
        var kabupaten = '';
        var kecamatan = '';
        var kelurahan = '';
        var desa = '';
        pages.forEach(function(v,k){
            var rows = v.Texts;

            rows.forEach(function(v1,k1){
                var row_x = v1.x;
                if(row_x==6.5){
                    //kabupaten

                    var kabupaten = v1.R[0].T;
                    kabupaten = kabupaten.replace(/%20/g," ");
                    kabupaten = kabupaten.replace(/\./g,"");
                    console.log('-'+kabupaten);
//                    location[kabupaten] = {
//                    level:2,
//                    next:{}
//                    };
                }
                if(row_x==19.406){
                    var kecamatan = v1.R[0].T;
                    kecamatan = kecamatan.replace(/%20/g," ");
                    kecamatan = kecamatan.replace(/\./g,"");
                    console.log('--'+kecamatan+' '+JSON.stringify(v1));
//                    location[kabupaten]['next'][kecamatan]={level:3};
                }
                if(row_x==25.888){
                    var kelurahan = v1.R[0].T;
                    kelurahan = kelurahan.replace(/%20/g," ");
                    kelurahan = kelurahan.replace(/\./g,"");
                    console.log('---'+kelurahan);
//                    location[kabupaten][kecamatan][kelurahan]={level:4};
                }
                if(row_x==32.375){
                    var desa = v1.R[0].T;
                    desa = desa.replace(/%20/g," ");
                    desa = desa.replace(/\./g,"");
//                    location[kabupaten][kecamatan][kelurahan][desa]={'level':5};
                    console.log('----'+desa);
                }
            });
        });
//        console.log(location);
//        console.dir(JSON.stringify(pdfData.formImage.Pages[0].Texts[0]));
////        fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
    });
//
//    pdfParser.loadPDF("./F1040EZ.pdf");
function doParsing(filename){
    console.log('filename: '+filename);
    fs.readFile('./'+filename, (err, pdfBuffer) => {
        if (!err) {
          pdfParser.parseBuffer(pdfBuffer);
          fs.unlinkSync(filename);
        }else{
          console.log(err);
          fs.unlinkSync(filename);
        }
      });
}
var url = "http://www.kemendagri.go.id/media/filemanager/2015/08/18/3/1/31._dki_jakarta.pdf";
var ext = url.split('.').pop();
var trxid =  new Date().getTime();
var filename = "file_temp_"+trxid+"."+ext;
const file = fs.createWriteStream(filename);
var request = http.get(url, function(response) {
    response.pipe(file).on('close', function(){
        doParsing(filename);
    });
});

//http.get("http://www.kemendagri.go.id/media/filemanager/2015/08/18/9/2/92._papua_barat.pdf", function(response){
//    var body = '';
//        var i = 0;
//        response.on('data', function (chunk) {
//            i++;
//            body += chunk;
////            console.log('BODY Part: ' + i);
//        });
//        response.on('end', function () {
//
////            console.log(body);
//            pdfParser.parseBuffer(body);
////            console.log('Finished');
//        });
//    pdfParser.parseBuffer(file);
//  response.pipe(file);
//});
//    fs.readFile('./file_temp_1500973117638.pdf', (err, pdfBuffer) => {
////    fs.readFile('./papua_barat.pdf', (err, pdfBuffer) => {
//          if (!err) {
//            pdfParser.parseBuffer(pdfBuffer);
//          }else{
//            console.log(err);
//          }
//        });