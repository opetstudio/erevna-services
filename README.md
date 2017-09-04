####Erevna Services

fungsi-fungsi yang akan digunakan di seluruh produk erevna

###List Services
- sync_rayasem_spreadseets
    contoh: sync_rayasem_spreadseets.synonym_property_types.run(options)
    
    contoh options: 
        {
            localStorageKeyName:'property-types-synonym'
        }
        
- getLocalstorage
    getLocalstorage(localStorageKeyName);
    
###fetch location from http://www.kemendagri.go.id/pages/data-wilayah
    cd services; node pdfprocessing;
    
###Update
- v1.2

    - Dinamis file gdoc spreadsheet
    - Dinamis job function, yaitu bisa menggunakan function sendiri dalam mengolah data dari google spreadsheet
    - script: googleSpreadsheetSyncService.js
    
    daftar variable options:
    
        {
            creds:<file credential>,
            sheetnumber:<number sheet>,
            localStorageKeyName:<nama local storage key>,
            min_row:<minimal row ke berapa yang akan di olah>,
            max_row:<maximal row ke berapa yang akan di olah>,
            gdoc:<key gdoc>,
            job: <job function untuk mengolah data gdoc. ouput dalam bentuk json string>
        }
    contoh options:
    
        {
            creds:require('./service-account-creds.json'),
            sheetnumber:6,
            localStorageKeyName:'localstorage-gdoc-sync-sheet-6',
            min_row:2,
            max_row:200,
            gdoc:'1TRnVBn2b4S9ih6cygtnV0NLKoOcqRvcf88Lkxxxxxxx',
            job: function(cells){
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
                    }
                });
                return dataJson;
            }
        }