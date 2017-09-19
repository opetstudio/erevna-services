var def = function(cells,currentDataRow){
        var list=[];
        var dataRow = currentDataRow || {};
        var tempRow = '';
        var theKey = '';
        var dataJson = {};
        cells.forEach(function(v,k){
            if(v.col < 3 && v.row > 1 && v.value!=''){
                if(tempRow != v.row){
                    tempRow = v.row;
                    theKey = v.value;
                    theKey = theKey.toLowerCase();
                }else{
                    var v = v.value;
                    v = v.toLowerCase();
                    dataRow[theKey] = v;
                }
//                console.log('Cell R'+v.row+'C'+v.col+' = '+v.value);
            }
        });
        dataJson = dataRow;
        return dataJson;
    }
var translation = function(cells){
    var list=[];
    var tempRow = '';
    var theKey = '';
    var dataJson = {};
    dataJson.id={};
    dataJson.en={};
    var lang = '';
    cells.forEach(function(v,k){
        if(v.col < 4 && v.row > 1 && v.value){
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
                //console.log('Cell R'+v.row+' C'+v.col+' = '+v.value);
        }
    });
    return dataJson;
}
var datawilayakemendagri = function(cells){
    var list=[];
    var tempRow = '';
    var theKey = '';
    var dataJson = {};
    dataJson.id={};
    dataJson.en={};
    var lang = '';
    cells.forEach(function(v,k){
        if(v.col < 10 && v.row > 13 && v.value){
            if(v.col==2 && v.row==16){
                //Propinsi
            }else if(v.col==2 && v.row > 16){
                //Propinsi
            }else if(v.col==2 && v.row > 16){
            }
            if(tempRow != v.row){
                tempRow = v.row;
                theKey = v.value;
                theKey = theKey.toLowerCase();
            }else{
                if(v.col==2) lang = 'id';
                if(v.col==3) lang = 'en';
                var val = v.value;
//                        val = val.toLowerCase();
//                dataJson[lang][theKey] = val;
            }
                console.log('Cell R'+v.row+' C'+v.col+' = '+v.value);
        }
    });
    return dataJson;
}
var datalocation = function(cells, currentDataRow){
    //npm run gdocsync -- -minrow=1 -maxrow=3 -sheetnumber=0 -gdoc=1PyMqH5ts4g-I_19q8awi09yL00iFk404RdtRTXX-OEE -storagekey=localstorage-location -job=datalocation
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
var datalocationv2 = function(cells, currentDataRow){
    //npm run gdocsync -- -minrow=1 -maxrow=3 -sheetnumber=0 -gdoc=1PyMqH5ts4g-I_19q8awi09yL00iFk404RdtRTXX-OEE -storagekey=localstorage-locationv2 -job=datalocationv2
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
                                    dataRow[keyLevel1]['name'] = keyLevel1;
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
                                    dataRow[keyLevel1+'-'+keyLevel2] = dataRow[keyLevel1+'-'+keyLevel2] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2]['name'] = keyLevel2;
                                }
                                if(v.col==7){
                                    if(v.value != '') level2_lat = v.value;
        //                            dataRow[keyLevel1][keyLevel2] = dataRow[keyLevel1][keyLevel2] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2]['lat'] = level2_lat;
                                }
                                if(v.col==8){
                                    if(v.value != '') level2_long = v.value;
        //                            dataRow[keyLevel1][''+keyLevel2] = dataRow[keyLevel1][''+keyLevel2] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2]['long'] = level2_long;
                                }
                                if(v.col==9 && keyLevel3 != v.value && v.value != ''){
                                    keyLevel3 = v.value;
                                    keyLevel3 = keyLevel3.toLowerCase();
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3] = dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3]['name'] = keyLevel3;
                                }
                                if(v.col==11){
                                    if(v.value != '') level3_lat = v.value;
        //                            dataRow[keyLevel1][''+keyLevel2][keyLevel3] = dataRow[keyLevel1][''+keyLevel2][keyLevel3] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3]['lat'] = level3_lat;
                                }
                                if(v.col==12){
                                    if(v.value != '') level3_long = v.value;
        //                            dataRow[keyLevel1][''+keyLevel2][keyLevel3] = dataRow[keyLevel1][''+keyLevel2][keyLevel3] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3]['long'] = level3_long;
                                }
                                if(v.col==13 && keyLevel4 != v.value && v.value != ''){
                                    keyLevel4 = v.value;
                                    keyLevel4 = keyLevel4.toLowerCase();
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3+'-'+keyLevel4] = dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3+'-'+keyLevel4] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3+'-'+keyLevel4]['name'] = keyLevel4;
                                }
                                if(v.col==15){
                                    if(v.value != '') level4_lat = v.value;
        //                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] = dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3+'-'+keyLevel4]['lat'] = level4_lat;
                                }
                                if(v.col==16){
                                    if(v.value != '') level4_long = v.value;
        //                            dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] = dataRow[keyLevel1][''+keyLevel2][keyLevel3][keyLevel4] || {};
                                    dataRow[keyLevel1+'-'+keyLevel2+'-'+keyLevel3+'-'+keyLevel4]['long'] = level4_long;
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

module.exports['datalocation'] = datalocation;
module.exports['datalocationv2'] = datalocationv2;
module.exports['datawilayakemendagri'] = datawilayakemendagri;
module.exports['translation'] = translation;
module.exports['def'] = def;