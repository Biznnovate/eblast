angular.module('app.controllers', [])
  
.controller('inicioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('vistaDeProyectoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('vistaDeReporteCtrl', ['$scope', '$stateParams',  'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, pouchDB, ) {
    //llama bd de data
let localDB = new pouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    
localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});

localDB.allDocs({
            include_docs: true,
            attachments: true
            }).then(function (result) {
            // handle result
            $scope.Barrenos = result ;
            }).catch(function (err) {
            console.log(err);
        });
let localprojDB = new pouchDB('projects');
let remoteprojDB = new PouchDB('https://biznnovate.cloudant.com/eblast-proj'); 
      localprojDB.sync(remoteprojDB).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
    });
//llama datos de DB de Explosivistas
localprojDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.projInfo = result ;
          }).catch(function (err) {
        console.log(err);
    });

$scope.butGen=true;
$scope.butExp=false;
$scope.dataExport = []
$scope.frontExport = []

 $scope.selectProj = function (obj){
       
        console.log(obj)
        console.log($scope.selectedProj)
        $scope.selectedProj_u = obj;   
        angular.forEach( $scope.Barrenos.rows, function(value, key){
        var dataExp = {
            'Barreno': value.doc.barr,
            'CoordX': value.doc.coordx,
            'CoordY' : value.doc.coordy,
            'ProfDis': value.doc.prof,
            'Diam': value.doc.diametro,
            'ProfReal' : value.doc.profreal,
            'Taco' : value.doc.taco,
            'Aire' : value.doc.aire,
            'Bordo' : value.doc.bordo,
            'Espaciamiento': value.doc.espaciamiento,
            'Diametro' : value.doc.diametro,
            'Status' : value.doc.status,
            'CargasinAire' : value.doc.cargasinaire,
            'CargaMenosAire' : value.doc.cargamenosaire,
            'cargaAgraneldisp' : value.doc.cargaagraneldisp,
            'volumcil' : value.doc.volumencil,
            'cargaagranel': value.doc.cargaagranel,
            'volumentotal': value.doc.volumentotal,
            'pesototal' : value.doc.pesototal,
            'factordecarga': value.doc.factordecarga,
         }
     $scope.dataExport.push(dataExp);
        
    });
 
        
            var projExp = {
                'stracon': $scope.selectedProj_u.doc.stracon,
                'voladuranum': $scope.selectedProj_u.doc.voladuranum,
                'horaini': $scope.selectedProj_u.doc.horaini,
                'tipotiro': $scope.selectedProj_u.doc.tipotiro,
                'fechatiro': $scope.selectedProj_u.doc.fechatiro,
                'fechacarga': $scope.selectedProj_u.doc.fechacarga,
                'frentetrab': $scope.selectedProj_u.doc.frentetrab,
                'explosivista': $scope.selectedProj_u.doc.explosivista,
                'explolic': $scope.selectedProj_u.doc.explolic,
            
         }
        $scope.frontExport.push(projExp);

    $scope.butGen=false;
    $scope.butExp=true;
    $scope.dataName = 'Reporte ' + Date();
    $scope.infoName = 'Front '+ Date();
 };

$scope.createDataExp = function(){
    angular.forEach( $scope.Barrenos.rows, function(value, key){
        var dataExp = {
            'Barreno': value.doc.barr,
            'CoordX': value.doc.coordx,
            'CoordY' : value.doc.coordy,
            'ProfDis': value.doc.prof,
            'Diam': value.doc.diametro,
            'ProfReal' : value.doc.profreal,
            'Taco' : value.doc.taco,
            'Aire' : value.doc.aire,
            'Bordo' : value.doc.bordo,
            'Espaciamiento': value.doc.espaciamiento,
            'Diametro' : value.doc.diametro,
            'Status' : value.doc.status,
            'CargasinAire' : value.doc.cargasinaire,
            'CargaMenosAire' : value.doc.cargamenosaire,
            'cargaAgraneldisp' : value.doc.cargaagraneldisp,
            'volumcil' : value.doc.volumencil,
            'cargaagranel': value.doc.cargaagranel,
            'volumentotal': value.doc.volumentotal,
            'pesototal' : value.doc.pesototal,
            'factordecarga': value.doc.factordecarga,
         }
     $scope.dataExport.push(dataExp);
        
    });

    var projExp = {
                'stracon': $scope.selectedProj_u.stracon,
                'voladuranum': $scope.selectedProj_u.voladuranum,
                'horaini': $scope.selectedProj_u.doc.horaini,
                'tipotiro': $scope.selectedProj_u.doc.tipotiro,
                'fechatiro': $scope.selectedProj_u.doc.fechatiro,
                'fechacarga': $scope.selectedProj_u.doc.fechacarga,
                'frentetrab': $scope.selectedProj_u.doc.frentetrab,
                'explosivista': $scope.selectedProj_u.doc.explosivista,
                'explolic': $scope.selectedProj_u.explolic,
            
         }
        $scope.frontExport.push(projExp);
   
    $scope.butGen=false;
    $scope.butExp=true;
    $scope.dataName = 'Reporte ' + Date();
    $scope.infoName = 'Front '+ Date();
}



 $scope.ExportCSV = function (obj){
       
        console.log(obj)
        console.log($scope.barreno)
        $scope.dataExport = obj;   
 };

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('subirProyectoCtrl', ['$scope', '$stateParams', '$filter', '$window',  'Uploadcsv', 'CsvParser','pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $window,  Uploadcsv, CsvParser, pouchDB,) {

$scope.showcleanup= true;
$scope.showupload= false;
//let localDB = new pouchDB('barrenos');
let localDB = new pouchDB('barrenoscsv');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsv');    
localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});
let localDivCSV = new pouchDB('barrenoscsvdiv');
let remoteDivCSV = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsvdiv');
localDivCSV.sync(remoteDivCSV).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
$scope.addCSV = function() {
    let localDB = new pouchDB('barrenoscsv');
    let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsv');  
    
    $scope.showcleanup= false;
    $scope.showupload= true;

//$scope.Uploadcsv = function(){
    Uploadcsv.then(function(data){

  //$scope.items_csv = data;
    var rows = data.split('\n');
    var obj = [];
    angular.forEach(rows, function(val) {
      var o = val.split(',');
     
      var objstr = JSON.stringify(obj);
      //alert(objstr);
//function checkData(csvval) {
    //return csvval == null;
//}
      localDB.post({        
        Col1: o[0],
        Col2: o[1],
        Col3: o[2],
        Col4: o[3],
        Col5: o[4],
          }).then(function (response) {
  // handle response
    }).catch(function (err) {
  console.log(err);
});
    });
     localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});
  
});

var col1Funct = function(){

let localCSVDB = new pouchDB('barrenoscsv');

localCSVDB.find({
            selector: {Col1: {$gte: null}},
            fields: ['_id', 'Col1'],
           // sort: ['Col1']
}).then(function (result) {
  // handle result
   $scope.tempCSVdiv = result;
   // var rows = $scope.tempCSVdiv.split('\n');
   let localDivCSV = new pouchDB('barrenoscsvdiv');
    angular.forEach($scope.tempCSVdiv.docs, function(value, key){  

         localDivCSV.put({
                _id: value._id+'Col1',
                oldid: value._id,
                nam: 'Col1',
                val: value.Col1,
                                 
                }).then(function(response) {
            // handle response
            }).catch(function (err) {
            console.log(err);
        });   
        
        });
      localDivCSV.sync(remoteDivCSV).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
        });
  //  $scope.tempCSVdiv = result;
}).catch(function (err) {
  console.log(err);
})



}
var col2Funct = function(){
//For column2
        $scope.tempCSVdiv = [];
        let localCSVDB = new pouchDB('barrenoscsv');
                localCSVDB.find({
                        selector: {Col2: {$gte: null}},
                        fields: ['_id', 'Col2'],
                       // sort: ['Col2']
            }).then(function (result) {
            // handle result
            $scope.tempCSVdiv = result;
            // var rows = $scope.tempCSVdiv.split('\n');
            let localDivCSV = new pouchDB('barrenoscsvdiv');
            
                angular.forEach($scope.tempCSVdiv.docs, function(value, key){  
                    
                    localDivCSV.put({
                            _id: value._id+'Col2',
                            oldid: value._id,
                            nam: 'Col2',
                            val: value.Col2,
                                            
                            }).then(function(response) {
                        // handle response
                        }).catch(function (err) {
                        console.log(err);
                    });   
                    
                    });
            
            localDivCSV.sync(remoteDivCSV).on('complete', function () {
                // yay, we're in sync!
                }).on('error', function (err) {
                // boo, we hit an error!
                });
            }).catch(function (err) {
            console.log(err);
            })


}
var col3Funct = function(){
    //For column3
    let localCSVDB = new pouchDB('barrenoscsv');
                localCSVDB.find({
                        selector: {Col3: {$gte: null}},
                        fields: ['_id', 'Col3'],
                       // sort: ['Col3']
            }).then(function (result) {
            // handle result
            $scope.tempCSVdiv = result;
            // var rows = $scope.tempCSVdiv.split('\n');
            let localDivCSV = new pouchDB('barrenoscsvdiv');
                angular.forEach($scope.tempCSVdiv.docs, function(value, key){  

                    localDivCSV.put({
                            _id: value._id+'Col3',
                            oldid: value._id,
                            nam: 'Col3',
                            val: value.Col3,
                                            
                            }).then(function(response) {
                        // handle response
                        }).catch(function (err) {
                        console.log(err);
                    });   

                    });
            
            localDivCSV.sync(remoteDivCSV).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                    });
            }).catch(function (err) {
            console.log(err);
            })



}
var col4Funct = function(){
//For column4
                let localCSVDB = new pouchDB('barrenoscsv');
                localCSVDB.find({
                        selector: {Col4: {$gte: null}},
                        fields: ['_id', 'Col4'],
                       // sort: ['Col4']
            }).then(function (result) {
            // handle result
            $scope.tempCSVdiv = result;
            // var rows = $scope.tempCSVdiv.split('\n');
            let localDivCSV = new pouchDB('barrenoscsvdiv');
                angular.forEach($scope.tempCSVdiv.docs, function(value, key){  

                    localDivCSV.put({
                            _id: value._id+'Col4',
                            oldid: value._id,
                            nam: 'Col4',
                            val: value.Col4,
                                            
                            }).then(function(response) {
                        // handle response
                        }).catch(function (err) {
                        console.log(err);
                    });   

                    });
                localDivCSV.sync(remoteDivCSV).on('complete', function () {
                        // yay, we're in sync!
                        }).on('error', function (err) {
                        // boo, we hit an error!
                        });
            }).catch(function (err) {
            console.log(err);
            })


               

}
var col5Funct = function(){
    //For column5
    let localCSVDB = new pouchDB('barrenoscsv');
                localCSVDB.find({
                        selector: {Col5: {$gte: null}},
                        fields: ['_id', 'Col5'],
                        //sort: ['Col5']
            }).then(function (result) {
            // handle result
            $scope.tempCSVdiv = result;
            // var rows = $scope.tempCSVdiv.split('\n');
            let localDivCSV = new pouchDB('barrenoscsvdiv');
                angular.forEach($scope.tempCSVdiv.docs, function(value, key){  

                    localDivCSV.put({
                            _id: value._id+'Col5',
                            oldid: value._id,
                            nam: 'Col5',
                            val: value.Col5,
                                            
                            }).then(function(response) {
                        // handle response
                        }).catch(function (err) {
                        console.log(err);
                    });   

                    });
                localDivCSV.sync(remoteDivCSV).on('complete', function () {
                        // yay, we're in sync!
                        }).on('error', function (err) {
                        // boo, we hit an error!
                        });
            }).catch(function (err) {
            console.log(err);
            })


          
}
col1Funct();
col2Funct();
col3Funct();
col4Funct();
col5Funct();
  

}


$scope.cleanDB = function (){
let tipolocalDB = new PouchDB('bartype');
let tiporemoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-bartype');      
let localDB2 = new pouchDB('barrenos');
let remoteDB2 = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    
        $scope.showupload= false;
        $scope.showcleanup= true;

localDB.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return localDB.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
            });
       remoteDB.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return remoteDB.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
                });
tipolocalDB.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return tipolocalDB.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
            });
       tiporemoteDB.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return tiporemoteDB.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
                });            
    localDB2.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return localDB2.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
            });
       remoteDB2.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return remoteDB2.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
                });
     localDivCSV.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return localDivCSV.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
            });
       remoteDivCSV.allDocs().then(function (result) {
                // Promise isn't supported by all browsers; you may want to use bluebird
                return Promise.all(result.rows.map(function (row) {
                return remoteDivCSV.remove(row.id, row.value.rev);
                }));
                }).then(function () {
                // done!
                }).catch(function (err) {
                // error!
                });
           
   }

}])
   
.controller('ajustarCSVCtrl', ['$scope', '$stateParams', '$window', '$filter',  'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, $filter, pouchDB) {
//tipos de columna
let localDB = new pouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    
//syncDBs();
localDB.sync(remoteDB).on('complete', function () {
// yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});

let localCSVDB = new pouchDB('barrenoscsv');
let remoteCSVDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsv');    
//call barrenos from CSV
localCSVDB.allDocs({
            include_docs: true,
            attachments: true
            }).then(function (result) {
            // handle result
            $scope.Barrenos = result ;
            }).catch(function (err) {
            console.log(err);
        });
let localDivCSV = new pouchDB('barrenoscsvdiv');
let remoteDivCSV = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsvdiv');
//aqui



//var divideCSV = function() {
//newdb to store things

    

localDivCSV.sync(remoteDivCSV).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });


var syncDBs = function(){
        let localDB = new pouchDB('barrenos');
        let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos'); 
        let localDivCSV = new pouchDB('barrenoscsvdiv');
        let remoteDivCSV = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsvdiv');


                 localDivCSV.sync(remoteDivCSV).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
                 
                localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
}

localCSVDB.sync(remoteCSVDB).on('complete', function () {
// yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});

$scope.column_type_list = [  
    {'id': 'Col1', 'nam': 'Columna 1'} , 
    {'id': 'Col2', 'nam': 'Columna 2'} , 
    {'id': 'Col3', 'nam': 'Columna 3'} , 
    {'id': 'Col4', 'nam': 'Columna 4'} , 
    {'id': 'Col5', 'nam': 'Columna 5'} , 

];


$scope.unitTableProf = [
   {'id': 'mm', 'val': 1000, 'nam': 'Milímetros (mm)'} ,
   {'id': 'cm', 'val': 100, 'nam': 'Centímetros (cm)'} ,
   {'id': 'dm', 'val': 10, 'nam': 'Decímetros (dm)'} ,
   {'id': 'mts', 'val': 1, 'nam': 'Metros (mts)'} ,
   {'id': 'ft', 'val': 3.28084 , 'nam': 'Pies (ft)'} ,
   {'id' : 'in', 'val': 39.3701, 'nam': 'Pulgadas (in)'},
];
$scope.unitTableDia = [
   {'id': 'mm', 'val': 1, 'nam': 'Milímetros (mm)'} ,
   {'id': 'cm', 'val': 0.1, 'nam': 'Centímetros (cm)'} ,
   {'id': 'dm', 'val': 0.01, 'nam': 'Decímetros (dm)'} ,
   {'id': 'mts', 'val': 0.001, 'nam': 'Metros (mts)'} ,
   {'id': 'ft', 'val': 0.00328084 , 'nam': 'Pies (ft)'} ,
   {'id' : 'in', 'val': 0.0393701, 'nam': 'Pulgadas (in)'},
];
$scope.column_type = {};

$scope.continueOpt = true;



$scope.columninfo = [];


 $scope.valrows = [];


$scope.createWDB = function(){

     angular.forEach( $scope.Barrenos.rows, function(value, key){
                    var id = value.doc._id;
                    $scope.tempresp= value;
     
                         localDB.put({
                               _id: value.doc._id,  
                             
                                     
                                
                                      
                                   }).then(function(response){
                                       
                                   }).catch(function(err){
                                       console.log(err);
                                   });    
                    }); 
                    localDB.sync(remoteDB).on('complete', function () {
                                        // yay, we're in sync!
                                        }).on('error', function (err) {
                                        // boo, we hit an error!
                                    });
                    localDB.allDocs({
                            include_docs: true,
                            attachments: true
                            }).then(function (result) {
                            // handle result
                            $scope.barrenosw = result;

                            }).catch(function (err) {
                            console.log(err);
                        });
                        $scope.showBarrSelect = 'yes';
                    
}


    //declare db with columntypes
    




$scope.showBarrSelect = '';
$scope.showCoordxSelect = '';
$scope.showCoordySelect = '';
$scope.showProf = '';
$scope.showProfunit = '';
$scope.showDiam = '';
$scope.showDiamunit = '';

$scope.selectBarreno= function(obj){
        console.log(obj)
        console.log($scope.barrcol)
        $scope.barrcol_u = obj.id;
        var col = obj.id;
        localDivCSV.createIndex({
                                index: {
                                    fields: ['nam', 'val', 'oldid' ]
                                }
                                }).then(function () {
                                return localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
            
                                    $scope.valrows = result.docs;
            
            angular.forEach( $scope.valrows, function(value, key){
                    var id = value.oldid;
  
                                    localDB.get(id).then(function(doc) {
                                                return localDB.put({
                                                    _id: doc._id,
                                                    _rev: doc._rev,
                                                    barr: value.val,
                                                });
                                                }).then(function(response) {
                                                // handle response
                                                }).catch(function (err) {
                                                console.log(err);
                                                });                          
                         }); 
                 });
            
            });
   
     localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
         $scope.showCoordxSelect = 'yes';         
        };

$scope.selectCoordx= function(obj){
        console.log(obj)
        console.log($scope.coordx)
        $scope.coordx_u = obj.id;
        var col = obj.id;
        localDivCSV.createIndex({
                                index: {
                                    fields: ['nam', 'val', 'oldid' ]
                                }
                                }).then(function () {
                                return localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
            
                                    $scope.valrows = result.docs;
            
            angular.forEach( $scope.valrows, function(value, key){
                    var id = value.oldid;
              
                                    localDB.get(id).then(function(doc) {
                                                return localDB.put({
                                                    _id: doc._id,
                                                    _rev: doc._rev,
                                                    barr: doc.barr,
                                                    coordx: value.val,

                                                });
                                                }).then(function(response) {
                                                // handle response
                                                }).catch(function (err) {
                                                console.log(err);
                                                });                          
                         }); 
                 });
            
            });
   
     localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
    $scope.showCoordySelect = 'yes';            
    };

$scope.selectCoordy= function(obj){
        console.log(obj)
        console.log($scope.coordy)
        $scope.coordy_u = obj.id;
        var col = obj.id;
        localDivCSV.createIndex({
                                index: {
                                    fields: ['nam', 'val', 'oldid' ]
                                }
                                }).then(function () {
                                return localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
            
                                    $scope.valrows = result.docs;
            
            angular.forEach( $scope.valrows, function(value, key){
                    var id = value.oldid;

                                    localDB.get(id).then(function(doc) {
                                                return localDB.put({
                                                    _id: doc._id,
                                                    _rev: doc._rev,
                                                    barr: doc.barr,
                                                    coordx: doc.coordx,
                                                    coordy: value.val,
                                                });
                                                }).then(function(response) {
                                                // handle response
                                                }).catch(function (err) {
                                                console.log(err);
                                                });                          
                         }); 
                 });
            
            });
   
     localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
    $scope.showProf = 'yes'; 
    };

$scope.selectProf= function(obj){
        console.log(obj)
        console.log($scope.prof)
        $scope.prof_u = obj.id;
        $scope.showProfunit = 'yes';
    };

$scope.selectDia= function(obj){
        console.log(obj)
        console.log($scope.diametro)
        $scope.diametro_u = obj.id;
        $scope.showDiamunit = 'yes';
    };

$scope.selectUnitProf= function(obj){
        console.log(obj)
        console.log($scope.unitprof)
        $scope.unitprof_u = obj.val;
        var col = $scope.prof_u;
        localDivCSV.createIndex({
                                index: {
                                    fields: ['nam', 'val', 'oldid' ]
                                }
                                }).then(function () {
                                return localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
            
                                    $scope.valrows = result.docs;
            
            angular.forEach( $scope.valrows, function(value, key){
                    var id = value.oldid;
                    $scope.tempresp= value;
                 //  alert(value.val);
                                    localDB.get(id).then(function(doc) {
                                                return localDB.put({
                                                    _id: doc._id,
                                                    _rev: doc._rev,
                                                    barr: doc.barr,
                                                    coordx: doc.coordx,
                                                    coordy: doc.coordy,
                                                    prof: value.val*obj.val,
                                                });
                                                }).then(function(response) {
                                                // handle response
                                                }).catch(function (err) {
                                                console.log(err);
                                                });                          
                         }); 
                 });
            
            });
   
     localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
    $scope.showDiam = 'yes';
    };

$scope.selectUnitDia= function(obj){
        console.log(obj)
        console.log($scope.unitdiametro)
        $scope.unitdiametro_u = obj.val;
        var col = $scope.diametro_u;
        localDivCSV.createIndex({
                                index: {
                                    fields: ['nam', 'val', 'oldid' ]
                                }
                                }).then(function () {
                                return localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
            
                                    $scope.valrows = result.docs;
            
            angular.forEach( $scope.valrows, function(value, key){
                    var id = value.oldid;
                    $scope.tempresp= value;
                 //  alert(value.val);
                                    localDB.get(id).then(function(doc) {
                                                return localDB.put({
                                                    _id: doc._id,
                                                    _rev: doc._rev,
                                                    barr: doc.barr,
                                                    coordx: doc.coordx,
                                                    coordy: doc.coordy,
                                                    prof:doc.prof, 
                                                    diam: value.val*obj.val,
                                                });
                                                }).then(function(response) {
                                                // handle response
                                                }).catch(function (err) {
                                                console.log(err);
                                                });                          
                         }); 
                 });
            
            });
   
     localDB.sync(remoteDB).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
    $scope.continueOpt = false;
    };
$scope.tittleToggle = '';




}])
   
.controller('parMetrosDeCSVPaso1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('parMetrosDeCSVPaso3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('mapaVoladura1Ctrl', ['$scope', '$stateParams', 'pouchdbserv','pouchDB',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, pouchdbserv, pouchDB) {
let db = pouchDB('dbtest');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast')
  var doc = { name: 'David' };

db.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});

  function error(err) {
    $log.error(err);
  }

  function get(res) {
    if (!res.ok) {
      return error(res);
    }
    return db.get(res.id);
  }

  function bind(res) {
    $scope.doc = res;
  }

  db.post(doc)
    .then(get)
    .then(bind)
    .catch(error);

   $scope.a = '1';
   $scope.b = '5';

$scope.list = [{'val': '1'}, {'val': '2'}, {'val': '3'}]
$scope.itemList = [];

//selectiona y remplaza item seleccionado
$scope.selectValue = function(item) {
    $scope.itemList = [];

     $scope.itemList.push(item.val);
     $scope.a = $scope.itemList;
}


//calcula el valor de lo seleccionado
//$scope.calcVal = function() {
             var c = parseFloat($scope.a) ;
             var d = parseFloat($scope.b);
             $scope.result = (d - c);


      // };
  
}
])
   
.controller('parametrosVoladura1Ctrl', ['$scope', '$stateParams', 'Productos', '$window', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Productos, $window, pouchDB) {
    //option.name for option in data.availableOptions track by option.id

$scope.listed_productos = Productos.list;
$scope.prods = [];
$scope.DisableSaveButton = true;

$scope.tipodebarr_list = [];
//Declara y Sincroniza base de datos de Tipo
let tipolocalDB = new pouchDB('bartype');
let tiporemoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-bartype');    

    tipolocalDB.sync(tiporemoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

$scope.tipodeprod_list = [
        //{'id': 'ini', 'tipo': 'Iniciadores' },
        {'id': 'ce', 'tipo': 'Carga Empacada'},
        {'id': 'cg', 'tipo': 'Carga a Granel'},
    ];


//muestra los datos a capturar
$scope.barrForm = '';
$scope.reloadButton = '';
$scope.updateButton= '';
$scope.createButton= '';
$scope.updateForm = '';
$scope.tipoBarrdb = {};
$scope.showBarrForm = function (){

    tipolocalDB.get($scope.newBarreno.nam).then(function (doc) {
  // handle doc
   //alert('yes');
   $scope.tipoBarrdb = doc;
   $scope.updateForm = 'Yes';
   $scope.updateButton = 'Yes';
   $scope.reloadButton = '';
   $scope.createButton= '';
   $scope.DisableUpdateButton = true;



}).catch(function (err) {
  console.log(err);
  // alert('no');
    $scope.updateForm = '';
    $scope.updateButton= '';
    $scope.createButton= 'Yes';
    $scope.barrForm = 'Yes';
    $scope.DisableSaveButton = true;
});
 $scope.showTipoprodbarrAct = false;

}
$scope.tipoprodId = '';
$scope.showTipoprodbarr = function (obj){
    $scope.showTipoprodbarrAct = true;
    $scope.tipoprodId = obj.id;
  
}
$scope.showAmountInput = true;
$scope.getTipoProd = function (obj){
        console.log(obj);
      $scope.newTipoProd = obj;
       //$scope.showAmountInput = false;
       //$scope.showAddbutton = false; 
       $scope.showCargaForm = false; 
}

$scope.tipodecarga= 'Fija';
$scope.getTipoIni = function (obj){
        console.log(obj);
      $scope.newTipoProd = obj;
       //$scope.showAmountInput = false;
       $scope.showAddbutton = false; 

      //s alert($scope.showCargaForm)
}   
$scope.showCargaForm= true;     
$scope.changeShowCarga = function(){
    $scope.showCargaForm= false;
    $scope.showAddbutton= true;
}    
$scope.showBarrFormUpdate = function (){
        $scope.barrForm = 'Yes';
        $scope.updateButton = 'Yes';
        $scope.createButton= '';
        $scope.reloadButton = '';
        
}
$scope.tipodecarga_u = '';
$scope.tipodecarga = '';
    $scope.tipoprodchange = function(obj){
        console.log(obj)
        console.log($scope.tipodecarga)
        
   
    };
 $scope.taco = 0;
 $scope.aire = 0;
 $scope.bordo = 0;
 $scope.espaciamiento = 0;
$scope.changeTipoCarga = function(obj){
        console.log(obj)
        console.log($scope.tipodecarga)
        $scope.tipodecarga_u = obj;
    };    
$scope.updateTaco = function(obj){
        console.log(obj)
        console.log($scope.taco)

        $scope.taco_u = obj;
    };
$scope.updateAire = function(obj){
        console.log(obj)
        console.log($scope.aire)
        $scope.aire_u = obj;
    };
//$scope.cantprod = 1;
$scope.cantprod_u = 1;
$scope.cantprodgra_u = 1;  
$scope.showAddbutton = true; 

$scope.updateCant = function(obj){
        console.log(obj)
        console.log($scope.cantprod)
        $scope.cantprod_u = obj;
   
    };
$scope.updateCantGra = function(obj){
        console.log(obj)
        console.log($scope.cantprodgra)
        $scope.cantprodgra_u = obj;

    };
$scope.updateBordo = function(obj){
        console.log(obj)
        console.log($scope.bordo)
        $scope.bordo_u = obj;
    };
$scope.updateEspaciamiento = function(obj){
        console.log(obj)
        console.log($scope.espaciamiento)
        $scope.espaciamiento_u = obj;
    };
//$scope.diametro = 
$scope.subperf =0.5;    
$scope.updateDiametro = function(obj){
        console.log(obj)
        console.log($scope.diametro)
        $scope.diametro_u = obj;
    };
$scope.updateSubperf = function(obj){
        console.log(obj)
        console.log($scope.subperf)
        $scope.subperf_u = obj;
    };

    
//producto as producto.prod for producto in listed_productos | filter:producto.id=tipoProdv2.id


$scope.reloadListUsers = function(){
    User.listUsers().then(function(response){
        $scope.listed_productos = response.users;
    });
}





//suma total Largo
$scope.getLargoTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.prods.length; i++){
        var product = $scope.prods[i];
        total += (product.largo);
        $scope.LargoTotal = total;
    }
    return total;
}

//suma total Peso granel
$scope.getPesoGra = function(){
    var total = 0;
    for(var i = 0; i < $scope.prods.length; i++){
     var product = $scope.prods[i];
        total += (product.peso);
        $scope.PesoTotal = total;
    }
    return total;

}
$scope.getDensidad = function(){
    var total = 0;
    for(var i = 0; i < $scope.prods.length; i++){
     var product = $scope.prods[i];
        total += (product.densidad);
        $scope.DensidadTotal = total;
    }
    return total;

}

//suma total Generico
$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.prods.length; i++){
        var product = $scope.prods[i];
        total += (product.diametro);
    }
    return total;
}

$scope.selectedProd = {
            //'paramid': $scope.listed_params[0].id,
            //'param': $scope.listed_params[0].tipo,
            'id': $scope.listed_productos[0].id, 
            'tipoid': $scope.listed_productos[0].tipoid, 
            'tipo': $scope.listed_productos[0].tipo, 
            'prod': $scope.listed_productos[0].prod,
            'peso': $scope.listed_productos[0].peso,
            'diametro':$scope.listed_productos[0].diametro,
            'largo': $scope.listed_productos[0].largo,
    }


$scope.selectedParam = {
    'param' : ''
}
  

$scope.newProdnam = '';

$scope.newProdold = {

                    
                    'id': $scope.selectedProd.id, 
                    'tipoid': $scope.selectedProd.tipoid,
                    'tipo': $scope.selectedProd.tipo, 
                    'prod': $scope.selectedProd.prod,
                    'peso': ($scope.selectedProd.peso/1)*$scope.cantprod_u,
                    'diametro':$scope.selectedProd.diametro,
                    'largo': ($scope.selectedProd.largo/1)*$scope.cantprod_u,
                    'densidad': ($scope.selectedProd.densidad)/1,

}

$scope.newBarreno =[];
//crea producto nuevo en lista


$scope.add = function (obj){
   
    var newProd = {
                    'id': obj.id, 
                    'tipoid': obj.tipoid,
                    'tipo': obj.tipo, 
                    'prod': obj.prod,
                    'peso': (obj.peso/1)*$scope.cantprod_u,
                    'diametro':obj.diametro,
                    'largo': (obj.largo/1)*$scope.cantprod_u,
                    'densidad': (obj.densidad)/1, 
                   
                    
    }
   // $scope.prods.nam.push('blahblah');
    $scope.prods.push(newProd);
    $scope.showAddbutton = true; 
    $scope.showAmountInput = true; 
}
//$scope.newTipoBar = [];
$scope.addTipoBar = function (newBarreno){
     $scope.newTipoBar.push(newBarreno);
     
}
     $scope.newTipoBar = {
         'nam': '',
         'carga': []
     }
 



//update Tipo de Barreno  

$scope.updateType = function(){ 
     var subperfo = $scope.subperf_u || $scope.subperf;
     var tipodecarga = $scope.tipodecarga_u;  
     tipolocalDB.get($scope.newBarreno.nam).then(function(doc) {
                   
             //doc._id= $scope.newBarreno.nam;
             doc.rev= doc._rev;
             doc.carga= $scope.prods;
             doc.prof= $scope.LargoTotal;
             doc.peso= $scope.PesoTotal;
             doc.densidad = $scope.DensidadTotal;
             doc.tipodecarga = tipodecarga ;
             doc.taco = $scope.taco_u || 0;
             doc.aire = $scope.aire_u || 0;
             doc.bordo = $scope.bordo_u || 0;
             doc.espaciamiento = $scope.espaciamiento_u || 0;
             doc.diametro = $scope.diametro_u;
             doc.subperf = subperfo;
                 return tipolocalDB.put(doc);
                }).then(function() {
            return tipolocalDB.get($scope.newBarreno.nam);
            // handle response
            }).catch(function (err) {
            console.log(err);
           });

 

   
    
    
    $scope.DisableSaveButton = false
     tipolocalDB.sync(tiporemoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });
     $scope.reloadButton = 'Yes'
    $scope.updateButton= '';
     $scope.createButton= '';
}
 //create tipo de barreno
$scope.createType = function (){
  var tipodecarga = $scope.tipodecarga_u;  
  var subperfo = $scope.subperf_u || $scope.subperf;
       tipolocalDB.put({        
            _id: $scope.newBarreno.nam, 
            carga: $scope.prods,
            prof: $scope.LargoTotal,
            peso: $scope.PesoTotal,
            densidad: $scope.DensidadTotal,
            tipodecarga: tipodecarga,
            taco: $scope.taco_u || 0,
            aire: $scope.aire_u || 0,
            bordo: $scope.bordo_u || 0,
            espaciamiento: $scope.espaciamiento_u || 0,
            diametro: $scope.diametro_u,
            subperf: subperfo,
           
          }).then(function (response) {
  // handle response
   
  console.log(err);
    }); 

    $scope.DisableSaveButton = false

        tipolocalDB.sync(tiporemoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });
     $scope.reloadButton = 'Yes'
     $scope.updateButton= '';
     $scope.createButton= '';
}

$scope.reloadPage = function(){
    $window.location.reload();
     
}

$scope.saveTipoLocal = function(item){
   // $scope.TipoLocal = $window.localStorage['tipobarr'] || [];
    $scope.TipoLocal.push(item);
                $scope.barrForm = '';
        $scope.prods = [];
    //$scope.TipoLocal = $scope.TipoLocala;
    // $scope.TipoLocalLoad  = '';
     //

       // $scope.TipoLocalLoad=[];
}

$scope.addToLocal = function(){
    //$scope.TipoLocal = JSON.parse($window.localStorage['tipobarr']) 
    //$scope.TipoLocalPar = $window.localStorage['tipobarr']
    

}






//$scope.addBarreno = function (prods){
  // ManageTipos.tipo.push($scope.prods);
      //ManageTipos.tipo = $scope.prods;
 //      alert($scope.prods);
//}



$scope.produ = Productos.keys; 
 $scope.itemChanged = function(){
    
    $scope.selectedProd = {
            'id': $scope.listed_productos[0].id, 
            'tipo': $scope.listed_productos[0].tipo, 
            'prod': $scope.listed_productos[0].prod,
            'peso': $scope.listed_productos[0].peso,
            'diametro':$scope.listed_productos[0].diametro,
            'largo': $scope.listed_productos[0].largo,
    }
     
 }

   
      
    //Syncs with Producto DB  
    //var ref = firebase.database().ref().child("Prod-ejemplo");
      // create a synchronized array
    //  $scope.productos = $firebaseArray(ref);
      
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addProd = function() {
        $scope.productos.$add({
          producto: $scope.data.producto,
          iniciador: $scope.data.iniciador

        });
        $scope.data.producto = $scope.listed_productos[0].id;
        $scope.data.iniciador = $scope.listed_iniciadores[0].id;
        
      };
      
      
      //Filtra productos por ID
       $scope.params = $stateParams;
    
    $scope.surveys = [];
    
    $scope.loadData = function(){
        
        if ($scope.params.id || $scope.params.status){
            Survey.query($scope.params).then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }else{
            Survey.all().then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }
        
    }
    //filter dat
    $scope.prodFilter = function (id) { 
    return id === $scope.data.producto ; 
};

 

}])
   
.controller('editarVoladuraMapaCtrl', ['$scope', '$stateParams',  '$window', '$state', '$filter',  'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,  $window, $state, $filter, pouchDB) {
//tipo as tipo.tipo for tipo in newTipoBars
//$scope.Math = window.Math;

//eblast 95e8e3fcb47664acac7c204ccc23ad7ff774deab
//barrenos 8061ba7e4cd3b34bd5d3f7ab8b0c36b77eec6400    otedgeorthatenisestreent
//Load BD de Tipo de Barrenos


let localDB = new PouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    


    localDB.sync(remoteDB).on('complete', function () {
    // yay, we're in sync!
    }).on('error', function (err) {
  // boo, we hit an error!
    });

    localDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.Barrenos = result ;
        $scope.Barrchar = result.rows ;
          }).catch(function (err) {
        console.log(err);
    });
//$scope.selectedBarreno = $scope.Barrenos.rows[1];    

//Load BD de Tipo de Barrenos
let tipolocalDB = new PouchDB('bartype');
let tiporemoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-bartype');    

    tipolocalDB.sync(tiporemoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });
    tipolocalDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.tipobarr = result ;
          }).catch(function (err) {
        console.log(err);
    });

//declare db with carga a granel
    let gralocalDB = new pouchDB('prodgra');
    let graremoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-prodgra');    

    gralocalDB.sync(graremoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

    gralocalDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.prodsGra = result ;
          }).catch(function (err) {
        console.log(err);
    });



    $scope.params = $stateParams;
    
    $scope.surveys = [];
    $scope.tipobar_list = [];

//count barrenos
    $scope.countUpdatedBarras = function(){
            
            var rows = $scope.Barrenos.rows;
            var count = 0;
            angular.forEach(rows, function(barreno){
                count += barreno.doc.status == 'Updated' ? 1 : 0;
            });
            return count; 
           

        }


$scope.updateSelectedBarr = function(obj){
        console.log(obj)
        console.log($scope.selectedBarreno)
      //alert($scope.selectedBarreno.doc)
        $scope.selectedbarr_id = obj.doc._id;
        $scope.selectedbarr = obj.doc;
        $scope.profreal = obj.doc.prof;
        $scope.profreal_u = $scope.profreal;
        $scope.diametro = obj.doc.diam;
        $scope.diametro_u = $scope.diametro;
        $scope.coordx = obj.doc.coordx/1;
        $scope.coordy = obj.doc.coordy/1;
        $scope.coordx_u = $scope.coordx;
        $scope.coordy_u = $scope.coordy;
//count barrenos
 $scope.message = "Presione Agregar Barreno"

};
$scope.updateSelectedBarr2 = function(obj){
        console.log(obj)
        console.log($scope.selectedBarreno)
      //alert($scope.selectedBarreno.doc)
        $scope.selectedbarr_id = obj.doc._id;
        $scope.selectedbarr = obj.doc;
        $scope.profreal = obj.doc.prof;
        $scope.profreal_u = $scope.profreal;
        $scope.diametro = obj.doc.diam;
        $scope.diametro_u = $scope.diametro;
        $scope.coordx = obj.doc.coordx/1;
        $scope.coordy = obj.doc.coordy/1;
        $scope.coordx_u = $scope.coordx;
        $scope.coordy_u = $scope.coordy;

       
};
$scope.updateSelectedNewBarr = function(obj,nam){
        console.log(obj)
        console.log($scope.selectedBarreno)
      //alert($scope.selectedBarreno.doc)
        
        $scope.selectedbarr_id =  $scope.newBarrnam;
        $scope.selectedbarr = obj.doc;
        $scope.profreal = obj.doc.prof;
        $scope.profreal_u = $scope.profreal;
        $scope.diametro = obj.doc.diam;
        $scope.diametro_u = $scope.diametro;
        $scope.coordx = (obj.doc.coordx/1)+0.1;
        $scope.coordy = (obj.doc.coordy/1)+0.1;
        $scope.coordx_u = $scope.coordx;
        $scope.coordy_u = $scope.coordy;

        $scope.message = "Guardar para Continuar";
        
       var dataBarr =  {
                barr : nam,
                selectedbarr_id : $scope.newBarrnam,
                selectedbarr : obj.doc,
                profreal : obj.doc.prof,
                profreal_u : $scope.profreal,
                diametro : obj.doc.diam,
                diametro_u : $scope.diametro,
                coordx : (obj.doc.coordx/1)+0.1,
                coordy : (obj.doc.coordy/1)+0.1,
                coordx_u : $scope.coordx,
                coordy_u : $scope.coordy,
       }

        localDB.put({   
     
            _id: 'N-' + dataBarr.barr, 
            barr: 'N-' + dataBarr.barr ,
            tipo: $scope.selectedTipo_u,
            profreal: $scope.profreal_u,
            coordx: $scope.coordx_u,
            coordy: $scope.coordy_u,
            taco: $scope.taco_u,
            aire: $scope.aire_u,
            bordo: $scope.bordo_u,
            espaciamiento: $scope.espaciamiento_u,
            diametro: $scope.diametro_u,
            status : "Nuevo",
            cargasinaire :  $scope.cargaSinAire,
            cargamenosaire : $scope.cargaMenosAire,
            cargaagraneldisp : $scope.cargaAgraneldisp,
            volumencil : $scope.volumenCil,
            cargaagranel : $scope.cargaAgranel,
            volumentotal : $scope.volumenTotal,
            pesototal : $scope.pesoTotal,
            factordecarga : $scope.factorDeCarga
           
          }).then(function (response) {
  // handle response
   
  console.log(err);
    }); 



     localDB.sync(remoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

    // $scope.showCoord = false;


   $scope.searchedbarr = {
            'doc': {
                'barr': 'N-'+$scope.selectedbarr_id,
            }
        };
     localDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.Barrenos = result ;
        $scope.Barrchar = result.rows ;
          }).catch(function (err) {
        console.log(err);
    });

  $scope.showBarrnam = false;
  $scope.showCoord = true;
  $scope.colors = [
            {
              backgroundColor: "rgba(159,204,0, 0.2)",
              pointBackgroundColor: "rgba(159,204,0, 1)",
              pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
              borderColor: "rgba(159,204,0, 1)",
              pointBorderColor: '#fff',
              pointHoverBorderColor: "rgba(159,204,0, 1)"
            }
          ];  
var barrenosforchart = $scope.Barrchar  
  angular.forEach( barrenosforchart  , function(value, key){
       
        var data = {
            'Barreno': value.doc.barr,
            'x': value.doc.coordx,
            'y' : value.doc.coordy,
            'r' : 10
            
         }

  
     $scope.dataChart.push(data);
    

  })

    $scope.showmap = true;
    $scope.showAddNewBarr= true;

};






$scope.selectnewBarr = function (obj) {
    console.log(obj)
    $scope.selectedBarreno = obj;
  
     
}    
$scope.tipodecarga = '';
$scope.updateSelectedTipo = function(obj){
        console.log(obj)
        console.log($scope.selectedTipo)
        $scope.selectedTipo_u = obj.doc;
        $scope.profcarga = obj.doc.prof/1;
        $scope.peso = obj.doc.peso/1;
        $scope.taco = obj.doc.taco/1;
        $scope.aire = obj.doc.aire/1;
        $scope.bordo = obj.doc.bordo/1;
        $scope.espaciamiento = obj.doc.espaciamiento/1;
        $scope.subperf = obj.doc.subperf/1;
        $scope.densidad = (obj.doc.densidad/1);
        $scope.diametro = (obj.doc.diametro/1) || $scope.diametro;
        $scope.tipodecarga = obj.doc.tipodecarga;

        $scope.profcarga_u = $scope.profcarga;
        $scope.peso_u = $scope.peso;
        $scope.taco_u =  $scope.taco;
        $scope.aire_u = $scope.aire;
        $scope.bordo_u = $scope.bordo;
        $scope.espaciamiento_u = $scope.espaciamiento;
        $scope.subperf_u = $scope.subperf;
        $scope.densidad_u= $scope.densidad;
        $scope.diametro_u = $scope.diametro;
        $scope.tipodecarga_u = $scope.tipodecarga;
    };
$scope.updateCoordx = function(obj,barr){
        console.log(obj)
        console.log($scope.coordx)
        $scope.coordx_u = obj;
        $scope.coordx = obj;
       dataChartBarrs (); 
      
     
    };
 $scope.updateCoordy = function(obj){
        console.log(obj)
        console.log($scope.coordy)
        $scope.coordy_u = obj;
    };   

$scope.updateProfReal = function(obj){
        console.log(obj)
     //   console.log($scope.selectedBarreno.doc.prof)
        $scope.profreal = obj;
        $scope.profreal_u = obj;
    };
$scope.updateLdecarga = function(obj){
        console.log(obj)
        console.log($scope.ldecarga)
        $scope.ldecarga_u = obj;
        $scope.profcarga_u = obj;
    };
$scope.updatePeso = function(obj){
        console.log(obj)
        console.log($scope.peso)
        $scope.peso_u = obj;
    };    
$scope.updateProf = function(obj){
        console.log(obj)
        console.log($scope.profcarga)
        $scope.profcarga_u = obj;
    };       
$scope.updateTaco = function(obj){
        console.log(obj)
        console.log($scope.taco)
        $scope.taco_u = obj;
    };
$scope.updateAire = function(obj){
        console.log(obj)
        console.log($scope.aire)
        $scope.aire_u = obj;
    };

$scope.updateBordo = function(obj){
        console.log(obj)
        console.log($scope.bordo)
        $scope.bordo_u = obj;
    };
$scope.updateEspaciamiento = function(obj){
        console.log(obj)
        console.log($scope.espaciamiento)
        $scope.espaciamiento_u = obj;
    };
$scope.updateDiametro = function(obj){
        console.log(obj)
        console.log($scope.diametro)
        $scope.diametro_u = obj;
    };
$scope.updateSubperf = function(obj){
        console.log(obj)
        console.log($scope.subperf)
        $scope.subperf_u = obj;
    };    
$scope.updateSelectedProdGra = function(obj){
        console.log(obj)
        console.log($scope.selectedProdGra)
        $scope.prodgra_u = obj.doc;
    };


$scope.updateCargagra = function(obj){
        console.log(obj)
        console.log($scope.cargaAgranel)
        $scope.cargaAgranel = obj;
    };   
$scope.updateBarrid = function(obj){
        console.log(obj)
        console.log($scope.newBarrnam)
       
         $scope.newBarrnam = obj;
        $scope.message = 'Seleccione el Barreno más cercano para copiar parámetros'; 
    };   
$scope.calculos= function () {
    $scope.pesoxmetro = $scope.peso_u * (1000/$scope.profcarga_u);
    $scope.cargaSinAire = $scope.profreal_u - $scope.taco_u;
    $scope.cargaMenosAire = $scope.cargaSinAire - $scope.aire_u;
    $scope.cargaAgraneldisp =  $scope.cargaMenosAire - ($scope.profcarga_u);
    $scope.volumenCil = $scope.cargaAgraneldisp * (1000 * 3.1416) * ($scope.diametro_u*$scope.diametro_u)/4;
    $scope.cargaAgranel = +(((($scope.densidad)/1000) * ($scope.volumenCil))/1000).toFixed(2);
    $scope.volumenTotal = ($scope.profreal_u - $scope.subperf_u) * $scope.bordo_u * $scope.espaciamiento_u;
    $scope.pesoTotal = Math.round($scope.peso_u + $scope.cargaAgranel);
    $scope.factorDeCarga = +($scope.pesoTotal/$scope.volumenTotal).toFixed(2);
    var resultados = {
        'peso': $scope.peso_u,
        'profdecarga': $scope.profcarga_u,
        'prof real': $scope.profreal_u,
        'pesoxmetro' :     $scope.pesoxmetro,
        'cargasinaire': $scope.cargaSinAire,
        'cargamenosaire': $scope.cargaMenosAire ,
        'cargadisponible': $scope.cargaAgraneldisp,
        'volumen cilindrico': $scope.volumenCil, 
        'carga a granel': $scope.cargaAgranel ,
        'volumentotal': $scope.volumenTotal ,
        'pesototal': $scope.pesoTotal ,
        'factor de carga': $scope.factorDeCarga ,
    }

    console.log(resultados);
   // Carga a Grandel Disponible *1000*3.1416*(Diametro*Diametro)/4

}
$scope.barrDetailstoggle = function (){
    $scope.barrDetails = true;
}

//agrega valores al barreno
$scope.updateBarr = function (){

    var id =  $scope.selectedbarr._id ;
       
    localDB.get(id).then(function(doc) {
                   
             //doc._id= $scope.newBarreno.nam;
             doc.rev = doc._rev;
             doc.tipo= $scope.selectedTipo_u;
             doc.profreal= $scope.profreal_u;
             doc.coordx= $scope.coordx_u;
             doc.coordy= $scope.coordy_u;
             doc.taco= $scope.taco_u;
             doc.aire= $scope.aire_u;
             doc.bordo= $scope.bordo_u;
             doc.espaciamiento= $scope.espaciamiento_u;
             doc.diametro= $scope.diametro_u;
             doc.status= "Updated";
             doc.cargasinaire =  $scope.cargaSinAire;
             doc.cargamenosaire = $scope.cargaMenosAire;
             doc.cargaagraneldisp = $scope.cargaAgraneldisp;
             doc.volumencil = $scope.volumenCil;
             doc.cargaagranel = $scope.cargaAgranel;
             doc.volumentotal = $scope.volumenTotal;
             doc.pesototal = $scope.pesoTotal;
             doc.factordecarga = $scope.factorDeCarga;

                 return localDB.put(doc);
                }).then(function() {
            return localDB.get(id);
            // handle response
     
            }).catch(function (err) {
            console.log(err);
           });



     localDB.sync(remoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });



$scope.message = "El Barreno fue Actualizado.";
$scope.showReloadButton = true;
console.log($scope.message);


}
$scope.showReloadButton = false;

$scope.reloadPage = function () {
    $window.location.reload();
    $scope.showReloadButton = false;
         localDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.Barrenos = result ;
          }).catch(function (err) {
        console.log(err);
    });      
        tipolocalDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.tipobarr = result ;
          }).catch(function (err) {
        console.log(err);
    });
} 
$scope.message2 = '';
$scope.showAddNewBarr= true;
//create a new Barreno
$scope.addNewBarr = function (){
   //$scope.showCoord = true;
   $scope.showAddNewBarr= false;
    $scope.showBarrnam = true;
    $scope.message = '';
    $scope.message2 = 'Confirme el Nombre y los Datos del Barreno. Seleccione las caracteristicas del barreno mas cercano y el tipo y presione Agregar Barreno.';
    $scope.newBarrnam = new Date().toISOString();
    console.log($scope.message);
    
}

$scope.createBarr = function (){
    localDB.put({   
     
            _id: $scope.selectedbarr_id, 
            barr: 'N-' + $scope.selectedbarr_id ,
            tipo: $scope.selectedTipo_u,
            profreal: $scope.profreal_u,
            coordx: $scope.coordx_u,
            coordy: $scope.coordy_u,
            taco: $scope.taco_u,
            aire: $scope.aire_u,
            bordo: $scope.bordo_u,
            espaciamiento: $scope.espaciamiento_u,
            diametro: $scope.diametro_u,
            status : "Nuevo",
            cargasinaire :  $scope.cargaSinAire,
            cargamenosaire : $scope.cargaMenosAire,
            cargaagraneldisp : $scope.cargaAgraneldisp,
            volumencil : $scope.volumenCil,
            cargaagranel : $scope.cargaAgranel,
            volumentotal : $scope.volumenTotal,
            pesototal : $scope.pesoTotal,
            factordecarga : $scope.factorDeCarga
           
          }).then(function (response) {
  // handle response
   
  console.log(err);
    }); 



     localDB.sync(remoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

    // $scope.showCoord = false;
  
 
}


    $scope.gotoMenu = function(){
        $state.go('menu.vistaDeProyecto');
    }
     $scope.dataChart=[];
     $scope.dataSeries=[]; 





 
$scope.showmap = false;    
$scope.hideMap = function(){
    $scope.showmap = false;
}
$scope.dataChartBarrs = function(){
    $scope.colors = [
            {
              backgroundColor: "rgba(159,204,0, 0.2)",
              pointBackgroundColor: "rgba(159,204,0, 1)",
              pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
              borderColor: "rgba(159,204,0, 1)",
              pointBorderColor: '#fff',
              pointHoverBorderColor: "rgba(159,204,0, 1)"
            }
          ];  
  var barrenosforchart = $scope.Barrchar  
  angular.forEach( barrenosforchart, function(value, key){
       
        var data = {
            'Barreno': value.doc.barr,
            'x': value.doc.coordx,
            'y' : value.doc.coordy,
            'r' : 10  
         }

  
     $scope.dataChart.push(data);
    

  })
    $scope.showmap = true;
}

$scope.showselectbarrchar = false;
$scope.editBarr = function() {
    $scope.message = 'Edite los valores del Barreno';
    $scope.barrDetails = true;
    $scope.showCoord = true;
}

}])
   
.controller('editarVoladuraCaptaciNCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tomaDeMuestraCtrl', ['$scope', '$stateParams', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, pouchDB) {
let localDB = new PouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    


    localDB.sync(remoteDB).on('complete', function () {
    // yay, we're in sync!
    }).on('error', function (err) {
  // boo, we hit an error!
    });

let localMDB = new PouchDB('muestras');
let remoteMDB = new PouchDB('https://biznnovate.cloudant.com/eblast-muestras');    


    localMDB.sync(remoteMDB).on('complete', function () {
    // yay, we're in sync!
    }).on('error', function (err) {
  // boo, we hit an error!
    });


    localDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.Barrenos = result ;
        $scope.Barrchar = result.rows ;
          }).catch(function (err) {
        console.log(err);
    });

$scope.updateSelectedBarr = function(obj){
        console.log(obj)
        console.log($scope.selectedBarreno)
        $scope.barr_u = obj.docs.barr;
    };

$scope.updateCamion = function(obj){
        console.log(obj)
        console.log($scope.camion)
        $scope.camion_u = obj;
    };
$scope.updateHora = function(obj){
        console.log(obj)
        console.log($scope.hora)
        $scope.hora_u = obj;
    };
$scope.updateR1 = function(obj){
        console.log(obj)
        console.log($scope.r1)
        $scope.r1_u = obj;
    };
$scope.updateR2 = function(obj){
        console.log(obj)
        console.log($scope.r2)
        $scope.r2_u = obj;
    };
$scope.updateRpm = function(obj){
        console.log(obj)
        console.log($scope.rpm)
        $scope.rpm_u = obj;
    };
$scope.updateTemp = function(obj){
        console.log(obj)
        console.log($scope.temp)
        $scope.temp_u = obj;
    };  
$scope.updateDens0 = function(obj){
        console.log(obj)
        console.log($scope.dens0)
    $scope.dens0_u = obj;

    };  
$scope.updateDens5 = function(obj){
        console.log(obj)
        console.log($scope.dens5)
    $scope.dens5_u = obj;


    };  
$scope.updateDens10 = function(obj){
        console.log(obj)
        console.log($scope.dens10)
    $scope.dens10_u = obj;

    };  
$scope.updateDens15 = function(obj){
        console.log(obj)
        console.log($scope.dens15)
    $scope.dens15_u = obj;

    };  
$scope.updateDens20 = function(obj){
        console.log(obj)
        console.log($scope.dens20)
    $scope.dens20_u = obj;

    };  
$scope.updateDens25 = function(obj){
        console.log(obj)
        console.log($scope.dens25)
    $scope.dens25_u = obj;

    };  
$scope.updateDens30 = function(obj){
        console.log(obj)
        console.log($scope.dens30)
    $scope.dens30_u = obj;


    };  
$scope.updateDens35 = function(obj){
        console.log(obj)
        console.log($scope.dens35)
    $scope.dens35_u = obj;

    };  
$scope.updateDens40 = function(obj){
        console.log(obj)
        console.log($scope.dens40)
    $scope.dens40_u = obj;

    };  
$scope.updateDens45 = function(obj){
        console.log(obj)
        console.log($scope.dens45)
    $scope.dens45_u = obj;

    };  
$scope.updateDens50 = function(obj){
        console.log(obj)
        console.log($scope.dens0)
    $scope.dens50_u = obj;

    };  
$scope.updateDens55 = function(obj){
        console.log(obj)
        console.log($scope.dens55)
    $scope.dens55_u = obj;
  
    };  
$scope.updateDens60 = function(obj){
        console.log(obj)
        console.log($scope.dens60)
    $scope.dens60_u = obj;

    };  
$scope.updateComent = function(obj){
        console.log(obj)
        console.log($scope.coment)
    $scope.coment_u = obj;
    };  





       
 

$scope.viewGraph = function () {
    $scope.labels = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60] ; 
    //$scope.series = ['Tiempo'];
    
    
    $scope.densidades = [

      // [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
       [$scope.dens0_u, $scope.dens5_u, $scope.dens10_u, $scope.dens15_u, $scope.dens20_u, 
        $scope.dens25_u, $scope.dens30_u, $scope.dens35_u,$scope.dens40_u, $scope.dens45_u, 
        $scope.dens50_u, $scope.dens55_u, $scope.dens60_u ,]
       ]
     $scope.densidades_full = [];
      angular.forEach( $scope.densidades, function(value, key){
        var val = value;
     $scope.densidades_full.push(val);
        
    });
     $scope.timeData = $scope.densidades_full;  
     $scope.showGraph = true;

}

    $scope.gotoMenu = function(){
        $state.go('menu.vistaDeProyecto');
    }

$scope.newMuestra = function (){
    localMDB.put({   
     
            _id: new Date().toISOString(), 
            barr: $scope.barr_u ,
            camion: $scope.camion_u,
            hora: $scope.hora_u,
            r1: $scope.r1_u,
            r2: $scope.r2_u,
            rpm: $scope.rpm_u,
            temp: $scope.temp_u,
            dens0: $scope.dens0_u,
            dens5: $scope.dens5_u,
            dens10: $scope.dens10_u,
            dens15: $scope.dens15_u,
            dens20: $scope.dens20_u,
            dens25: $scope.dens25_u,
            dens30: $scope.dens30_u,
            dens35: $scope.dens35_u,
            dens40: $scope.dens40_u,
            dens45: $scope.dens45_u,
            dens50: $scope.dens50_u,
            dens55: $scope.dens55_u,
            dens60: $scope.dens60_u,
            coment: $scope.coment_u
       
          }).then(function (response) {
  // handle response
   
  console.log(err);
  
    }); 



     localMDB.sync(remoteMDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

    // $scope.showCoord = false;
  
 
}


}])
   
.controller('generarReporteProductosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('generarReporteDatosGeneralesCtrl', ['$scope', '$stateParams', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, pouchDB) {


$scope.explisttemp = [
        {'name': 'Arnaldo Barría', 'lic' : 'DIASP-00380-040615'},
        {'name': 'Eliodoro Olmos', 'lic' : 'DIASP-00378-200515'},
        {'name': 'Hernan de Leon', 'lic' : 'DIASP-00261-190314'},
        {'name': 'José Luis Hernandez', 'lic' : 'DIASP-00381-190615'},
        {'name': 'Nelson Martinez', 'lic' : 'DIASP-00267-070414'},
        {'name': 'Omar Rodriguez', 'lic' : 'DIASP-00266-070414'},
        {'name': 'Osman Jiménez', 'lic' : 'DIASP-00382-250615'},
        ];
//declara db de Explosivistas

let localexpDB = new pouchDB('explo');
let remoteexpDB = new PouchDB('https://biznnovate.cloudant.com/eblast-explo'); 
      localexpDB.sync(remoteexpDB).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
    });

//declara db de Proyecto

let localprojDB = new pouchDB('projects');
let remoteprojDB = new PouchDB('https://biznnovate.cloudant.com/eblast-proj'); 
      localprojDB.sync(remoteprojDB).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
    });
//llama datos de DB de Explosivistas
localexpDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.explolist = result ;
          }).catch(function (err) {
        console.log(err);
    });

var uploadExplosivista = function(){
    angular.forEach($scope.explisttemp, function(value, key){  
        
         
        localexpDB.post({
                
                name: value.name,
                lic: value.lic,
                                 
                }).then(function(response) {
            // handle response
            }).catch(function (err) {
            console.log(err);
        });   
        });
      localexpDB.sync(remoteexpDB).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
        });
}


$scope.updateStracon = function(obj){
        console.log(obj)
        console.log($scope.stracon)
        $scope.stracon_u = obj;
        
    };

$scope.updateVoladuranum = function(obj){
        console.log(obj)
        console.log($scope.voladuranum)
        $scope.voladuranum_u = obj;
        
    };

$scope.updateHoraini = function(obj){
        console.log(obj)
        console.log($scope.horaini)
        $scope.horaini_u = obj;
        
    };
$scope.updateTipotiro = function(obj){
        console.log(obj)
        console.log($scope.tipotiro)
        $scope.tipotiro_u = obj;
        
    };
$scope.updateFechatiro = function(obj){
        console.log(obj)
        console.log($scope.fechatiro)
        $scope.fechatiro_u = obj;
        
    };
$scope.updateFechacarga = function(obj){
        console.log(obj)
        console.log($scope.fechacarga)
        $scope.fechacarga_u = obj;
        
    };
$scope.updateFrentetrab = function(obj){
        console.log(obj)
        console.log($scope.frentetrab)
        $scope.frentetrab_u = obj;
        
    };
$scope.updateExplo = function(obj){
        console.log(obj)
        console.log($scope.selectedExplo)
        $scope.selectedExplo_u = obj;

    };

$scope.saveDataGral = function(){
    
     localprojDB.put({
                _id: $scope.voladuranum_u + new Date().toISOString(),
                stracon: $scope.stracon_u,
                voladuranum: $scope.voladuranum_u,
                horaini: $scope.horaini_u,
                tipotiro: $scope.tipotiro_u,
                fechatiro: $scope.fechatiro_u,
                fechacarga: $scope.fechacarga_u,
                frentetrab: $scope.frentetrab_u,
                explosivista: $scope.selectedExplo_u.doc.name,
                explolic: $scope.selectedExplo_u.doc.lic,
       
                }).then(function(response) {
            // handle response
            }).catch(function (err) {
            console.log(err);
        });   
  
      localprojDB.sync(remoteprojDB).on('complete', function () {
        // yay, we're in sync!
        }).on('error', function (err) {
        // boo, we hit an error!
        });
}
}])
   
.controller('agregarBarrenoCtrl', ['$scope', '$stateParams', 'Survey', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Survey, $ionicPopup) {

    $scope.data = {
        'id' : '',
        'coordx' : '',
        'coordy' : '',
        'dist' : '',
        'status' : 'grey'
    }
    $scope.gotoView = function(){
        $state.go('menu.tiposDeBarreno');
    }
    
    $scope.submitting = false;
    
    $scope.submit = function(){
        $scope.submitting = true;
        Survey.add($scope.data).then(function(){
            $scope.data = {
                id: '',
                coordx: '',
                coordy: '',
                dist: '',
                status: 'grey'
            }
            $scope.submitting = false;
            
            $ionicPopup.alert({
                title: 'Listo!',
                template: 'Se ha actualizado el Barreno.'
            });
            
        })
    }
}])
   
.controller('verBarrenosCtrl', ['$scope', '$stateParams', 'Survey', '$window', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Survey, $window, $state) {
    
    $scope.params = $stateParams;
    
    $scope.surveys = [];
     $scope.Barrenos = JSON.parse($window.localStorage['barrenos']);
    
    $scope.loadData = function(){
        
        if ($scope.params.id || $scope.params.status){
            Survey.query($scope.params).then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }else{
            Survey.all().then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }
        
    }

    $scope.loadData();
    
    $scope.showDelete = false;
    $scope.toggleDelete = function(){
        $scope.showDelete = !$scope.showDelete;
    }
    
    $scope.deleteItem = function($index){
        Survey.delete($scope.surveys[$index].id).then(function(){
            $scope.surveys.splice($index-1, 1);
        })
    }
     $scope.gotoSearch = function(){
        $state.go('menu.buscarBarreno');
    }
    $scope.gotoAdd = function(){
        $state.go('menu.agregarBarreno');
    }

}
])
   
.controller('tiposDeBarrenoCtrl', ['$scope', '$stateParams', '$window', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,  $window, pouchDB) {

//Declara y Sincroniza base de datos de Tipo
let tipolocalDB = new pouchDB('bartype');
let tiporemoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-bartype');    

    tipolocalDB.sync(tiporemoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

$scope.prods = [];
tipolocalDB.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  // handle result
  $scope.prods = result ;
}).catch(function (err) {
  console.log(err);
});

 


}])
   
.controller('buscarBarrenoCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    $scope.fields = {
        id: '',
        status: 'Any Status'
    }
    $scope.search = function(){
        var params = {
            Col1: $scope.fields.id
        }
        
        if ($scope.fields.status != 'Any Status'){
            params.status = $scope.fields.status;
        }
        
        
        $state.go('menu.verBarrenos', params);
        
    }
   

}
])
 