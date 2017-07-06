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
   
.controller('vistaDeReporteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


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
   
.controller('subirProyectoCtrl', ['$scope', '$stateParams', '$filter', '$window', '$firebaseArray', 'Uploadcsv', 'CsvParser','pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $window, $firebaseArray, Uploadcsv, CsvParser, pouchDB,) {

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

$scope.cleanDB = function (){
           
           
        
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

   }

   var createdbsagain = function (){
        let localDB = new pouchDB('barrenos');
        let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');  
        let localDivCSV = new pouchDB('barrenoscsvdiv');
        let remoteDivCSV = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsvdiv');

   }

//var divideCSV = function() {
//newdb to store things

    

localDivCSV.sync(remoteDivCSV).on('complete', function () {
                    // yay, we're in sync!
                    }).on('error', function (err) {
                    // boo, we hit an error!
                });
localDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
         $scope.barrenostest = result;

          }).catch(function (err) {
        console.log(err);
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


//divideCSV();
var divideCSV2  = function() {
    let localDivCSV = new pouchDB('barrenoscsvdiv');
    let remoteDivCSV = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsvdiv');
    
    angular.forEach($scope.Barrenos.rows, function(value, key){
                localDivCSV.put({
                _id: value.doc._id,
                _rev: value.doc._rev,
                nam: 'Col1',
                val: value.doc.Col1,
                                 
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

   var createDBbarr = function (){
    var col = $scope.barrcol_u ;

           
                
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
                    var varoldid = value.oldid;
                    $scope.tempresp= value;
                 //  alert(value.val);

                                   let localDB = new pouchDB('barrenos');        
                                   localDB.put({
                                                _id: value.oldid,
                                               _rev: value._rev,
                                                barr: value.val,
                                              }).then(function(response){
                                       
                                   }).catch(function(err){
                                       console.log(err);
                                   });      }); 
                                    });
            
                             });
    
     syncDBs();
                   
                                

                                   
}
var createDBbarr2 = function (){
  
     syncDBs();
}
var createDBcoordx = function (){
   var col = $scope.coordx_u ;
   let localDB = new pouchDB('barrenos');
                                localDivCSV.find({
                                            selector: {nam: col},
                                            fields: ['oldid', 'val', '_rev'],
                                        // sort: ['oldid']

                                }).then(function (result) {
                                    $scope.valrows = result.docs;

                                    });
    
                             
}
var createDBcoordx2 = function (){
    angular.forEach( $scope.valrows, function(value, key){
                                        var varoldid = value.oldid;
                                        //$scope.tempresp= value;
                                       // alert(value.val);
                                   let localDB = new pouchDB('barrenos');
                                   localDB.get(varoldid).then(function(doc){
                                              localDB.put({
                                                //_id: doc._id,  
                                                _rev: doc._rev,
                                                barr: doc.barr,
                                                coordx: value.val,
                                   });
                                      
                                   }).then(function(response){
                                       
                                   }).catch(function(err){
                                       console.log(err);
                                   });        
    
                                    });
                                     syncDBs();
}
var createDBcoordy = function (){
   var col = $scope.coordy_u ;
      angular.forEach($scope.Barrenos.rows, function(value, key){

               var varoldid = value.doc._id;
                    localDivCSV.createIndex({
                            index: {
                                fields: ['nam', 'val', 'oldid' ]
                            }
                            }).then(function () {
                            return localDivCSV.find({
                                        selector: {nam: col, oldid: varoldid },
                                        fields: ['oldid', 'val'],
                                    // sort: ['oldid']
                            }).then(function (result) {
                                $scope.tempresp = result;
                                let localDB = new pouchDB('barrenos');
                                localDB.put({
                                             _id: value.doc._id,
                                            _rev: value.doc._rev,
                                            coordy: result.docs.val,
   
                                            }).then(function(response) {
                                        // handle response
                                        }).catch(function (err) {
                                        console.log(err);
                                            });
                                    });
                                });
        }); 
}
var createDBprof = function (){
   var col = $scope.prof_u;
   var colval = $scope.unitprof_u;
      angular.forEach($scope.Barrenos.rows, function(value, key){

               var varoldid = value.doc._id;
              
                    localDivCSV.createIndex({
                            index: {
                                fields: ['nam', 'val', 'oldid' ]
                            }
                            }).then(function () {
                            return localDivCSV.find({
                                        selector: {nam: col, oldid: varoldid },
                                        fields: ['oldid', 'val'],
                                    // sort: ['oldid']
                            }).then(function (result) {
                                $scope.tempresp = result;
                                let localDB = new pouchDB('barrenos');
                                localDB.put({
                                             _id: value.doc._id,
                                            _rev: value.doc._rev,
                                            prof: result.docs.val * colval,
                                                                                                    
                                            }).then(function(response) {
                                        // handle response
                                        }).catch(function (err) {
                                        console.log(err);
                                            });  
                                    });
                                });
        }); 
}
var createDBdiametro = function (){
   var col = $scope.diametro;
   var colval = $scope.unitdiametro_u;
      angular.forEach($scope.Barrenos.rows, function(value, key){

               var varoldid = value.doc._id;
                    localDivCSV.createIndex({
                            index: {
                                fields: ['nam', 'val', 'oldid' ]
                            }
                            }).then(function () {
                            return localDivCSV.find({
                                        selector: {nam: col, oldid: varoldid },
                                        fields: ['oldid', 'val'],
                                    // sort: ['oldid']
                            }).then(function (result) {
                                $scope.tempresp = result;
                                let localDB = new pouchDB('barrenos');
                                localDB.put({
                                             _id: value.doc._id,
                                            _rev: value.doc._rev,
                                            diametro: result.docs.val * colval,
                                                                                                    
                                            }).then(function(response) {
                                        // handle response
                                        }).catch(function (err) {
                                        console.log(err);
                                            });  
                                    });
                                });
        }); 
}
//function to createdb

$scope.createDB = function () {
   
    createDBbarr();
    createDBcoordx();
   createDBcoordy();
    createDBprof();
    createDBdiametro();
    syncDBs();
    
}


    //declare db with columntypes
    

$scope.continueOpt = false;

$scope.blahblafunc = function(){
                localDB.put({
                _id: value.doc._id,
                _rev: value.doc._rev,
                barr: $scope.barrcol_u,
                coordx: $scope.coordx_u,
                coordy: $scope.coordy_u,
                prof: $scope.prof_u * $scope.unitprof_u,
                diametro: $scope.diametro * $scope.unitdiametro_u
                 
                }).then(function(response) {
            // handle response
            }).catch(function (err) {
            console.log(err);
            });
}


$scope.selectBarreno= function(obj){
        console.log(obj)
        console.log($scope.barrcol)
        $scope.barrcol_u = obj.id;
        createDBbarr();
        //createDBbarr2();
   
     
        };

$scope.selectCoordx= function(obj){
        console.log(obj)
        console.log($scope.coordx)
        $scope.coordx_u = obj.id;
        createDBcoordx();
        createDBcoordx2();
    };

$scope.selectCoordy= function(obj){
        console.log(obj)
        console.log($scope.coordy)
        $scope.coordy_u = obj.id;
        createDBcoordy();
    };

$scope.selectProf= function(obj){
        console.log(obj)
        console.log($scope.prof)
        $scope.prof_u = obj.id;
         
    };

$scope.selectDia= function(obj){
        console.log(obj)
        console.log($scope.diametro)
        $scope.diametro_u = obj.id;
    };

$scope.selectUnitProf= function(obj){
        console.log(obj)
        console.log($scope.unitprof)
        $scope.unitprof_u = obj.val;
        
    };

$scope.selectUnitDia= function(obj){
        console.log(obj)
        console.log($scope.unitdiametro)
        $scope.unitdiametro_u = obj.val;

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
        {'id': 'ini', 'tipo': 'Iniciadores' },
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

}

$scope.showBarrFormUpdate = function (){
        $scope.barrForm = 'Yes';
        $scope.updateButton = 'Yes';
        $scope.createButton= '';
        $scope.reloadButton = '';
        
}

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

$scope.newProd = {

                    
                    'id': $scope.selectedProd.id, 
                    'tipoid': $scope.selectedProd.tipoid,
                    'tipo': $scope.selectedProd.tipo, 
                    'prod': $scope.selectedProd.prod,
                    'peso': $scope.selectedProd.peso,
                    'diametro':$scope.selectedProd.diametro,
                    'largo': $scope.selectedProd.largo, 

}

$scope.newBarreno =[];
//crea producto nuevo en lista


$scope.add = function (newProd){
   // $scope.prods.nam.push('blahblah');
    $scope.prods.push(newProd);
      
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


     tipolocalDB.get($scope.newBarreno.nam).then(function(doc) {
                   
             //doc._id= $scope.newBarreno.nam;
             doc.rev= doc._rev;
             doc.carga= $scope.prods;
             doc.prof= $scope.LargoTotal;
             doc.peso= $scope.PesoTotal;
             doc.taco = $scope.taco_u;
             doc.aire = $scope.aire_u;
             doc.bordo = $scope.bordo_u;
             doc.espaciamiento = $scope.espaciamiento_u;
             doc.diametro = $scope.diametro_u;
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

       tipolocalDB.put({        
            _id: $scope.newBarreno.nam, 
            carga: $scope.prods,
            prof: $scope.LargoTotal,
            peso: $scope.PesoTotal,
            taco: $scope.taco_u,
            aire: $scope.aire_u,
            bordo: $scope.bordo_u,
            espaciamiento: $scope.espaciamiento_u,
            diametro: $scope.diametro_u
           
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

 
//crea localstorage de tipode prod

//$scope.saveTipoBar = function (newTipoBar){

     // $window.localStorage['my-data'] = JSON.stringify($scope.newTipoBar);
     
//}
}])
   
.controller('editarVoladuraMapaCtrl', ['$scope', '$stateParams', 'Survey', '$window', '$state', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Survey, $window, $state, pouchDB) {
//tipo as tipo.tipo for tipo in newTipoBars
//$scope.Math = window.Math;


//declare db with columntypes
    let collocalDB = new pouchDB('coltype');
    let colremoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-coltype');    

    collocalDB.sync(colremoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });
    collocalDB.allDocs({
         include_docs: true,
         attachments: true
         }).then(function (result) {
         // handle result
        $scope.columnType = result ;
          }).catch(function (err) {
        console.log(err);
    });


//Load BD de Tipo de Barrenos
let localDB = new pouchDB('barrenoscsv');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenoscsv');    

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


//Load BD de Tipo de Barrenos
let tipolocalDB = new pouchDB('bartype');
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

//templist   

//download info




$scope.updateSelectedBarr = function(obj){
        console.log(obj)
        console.log($scope.selectedBarreno)
      //alert($scope.selectedBarreno.doc)
        $scope.selectedbarr_id = obj.doc._id;
       // alert($scope.selectedbarr_id)
    };
$scope.updateSelectedTipo = function(obj){
        console.log(obj)
        console.log($scope.selectedTipo)
        $scope.selectedTipo_u = obj.doc;
        $scope.taco = obj.doc.taco/1;
        $scope.aire = obj.doc.aire/1;
        $scope.bordo = obj.doc.bordo/1;
        $scope.espaciamiento = obj.doc.espaciamiento/1;
       
        $scope.taco_u =  $scope.taco;
        $scope.aire_u = $scope.aire;
        $scope.bordo_u = $scope.bordo;
        $scope.espaciamiento_u = $scope.espaciamiento;
    };
$scope.updateProfReal = function(obj){
        console.log(obj)
        console.log($scope.profreal)
        $scope.profreal_u = obj;
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
$scope.updateSelectedProdGra = function(obj){
        console.log(obj)
        console.log($scope.selectedProdGra)
        $scope.prodgra_u = obj.doc;
    };




$scope.calculos= function () {
    $scope.cargaSinAire = $scope.profreal_u - $scope.taco_u;
    $scope.cargaMenosAire = $scope.cargaSinAire - $scope.aire_u;
    $scope.cargaAgraneldisp =  $scope.cargaMenosAire - ($scope.selectedTipo_u.prof/100);
    $scope.volumenCil = $scope.cargaAgraneldisp * 1000 * 3.1416 * ($scope.diametro_u*$scope.diametro_u)/4;
    $scope.cargaAgranel = (Math.round($scope.prodgra_u.densidad)) * ($scope.volumenCil/1000000);
    $scope.volumenTotal = ($scope.profreal_u - 0.5) * $scope.bordo_u * $scope.espaciamiento_u;
    $scope.pesoTotal = $scope.selectedTipo_u.peso + $scope.cargaAgranel;
    $scope.factorDeCarga = $scope.pesoTotal/$scope.volumenTotal;
   // Carga a Grandel Disponible *1000*3.1416*(Diametro*Diametro)/4

}
//agrega valores al barreno
$scope.updateBarr = function (){

    
localDB.get($scope.selectedbarr_id).then(function(doc) {
                   
             //doc._id= $scope.newBarreno.nam;
             doc.rev = doc._rev;
             doc.tipo= $scope.selectedTipo_u;
             doc.profreal= $scope.profreal_u;
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
            return localDB.get($scope.selectedbarr_id);
            // handle response
            }).catch(function (err) {
            console.log(err);
           });

 
    

     localDB.sync(remoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });

}
     
//create a new Barreno
$scope.createBarr = function (){
    localDB.put({        
            _id: new Date().toISOString(), 
            Col1: new Date().toISOString(),
            tipo: $scope.selectedTipo_u,
            profreal: $scope.profreal_u,
            taco: $scope.taco_u,
            aire: $scope.aire_u,
            bordo: $scope.bordo_u,
            espaciamiento: $scope.espaciamiento_u,
            diametro: $scope.diametro_u,
            status : "Updated",
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

}
$scope.barrInfo = $scope.selectedTipo || [];

$scope.BarrenosParam = $scope.BarrenosParam || [];

 $scope.BarrParam = {

 };              



$scope.BarrParamGra = '0';

$scope.BarrData = [];
$scope.TipoData = [];



  $scope.selectedProfReal = function (item){
      $scope.BarrProfDes=item;

  }



    
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
 
}])
   
.controller('editarVoladuraCaptaciNCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tomaDeMuestraCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('generarReporteProductosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('generarReporteDatosGeneralesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


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
 