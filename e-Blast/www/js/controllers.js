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
let localDB = new pouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    
localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});

 
$scope.addCSV = function() {
    let localDB = new pouchDB('barrenos');
    let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');  
    localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});
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
  
});


  

}


$scope.cleanDB = function (){
        $scope.showupload= false;
        $scope.showcleanup= true;
        localDB.destroy().then(function (response) {
         // success
             }).catch(function (err) {
               console.log(err);
             });
         remoteDB.destroy().then(function (response) {
  // success
            }).catch(function (err) {
                 console.log(err);
            });
   }

}])
   
.controller('ajustarCSVCtrl', ['$scope', '$stateParams', '$window', 'pouchDB', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window, pouchDB) {
//tipos de columna
let localDB = new pouchDB('barrenos');
let remoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-barrenos');    

localDB.sync(remoteDB).on('complete', function () {
// yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});


$scope.column_type_list = [  
    {'id': 'barr', 'nam': 'Barreno', 'value': ''} , 
    {'id': 'coordx', 'nam': 'Coordenada X', 'value': ''  } , 
    {'id': 'coordy', 'nam': 'Coordenada Y', 'value': ''  } ,
    {'id': 'prof', 'nam': 'Profundidad', 'value': '' } , 
    {'id': 'diametro', 'nam': 'Diametro', 'value': ''  } ,
];

$scope.column_type = {};

$scope.continueOpt = true;



$scope.columninfo = [];


$scope.columnType = function(){
    $scope.columninfo=[]
    $scope.columninfo=[
        {'_id': 'col1', 'name': $scope.column_type.a },
        {'_id': 'col2', 'name': $scope.column_type.b},
        {'_id': 'col3', 'name': $scope.column_type.c},
        {'_id': 'col4', 'name': $scope.column_type.d},
        {'_id': 'col5', 'name': $scope.column_type.e},
    ]

    //declare db with columntypes
    let collocalDB = new pouchDB('coltype');
    let colremoteDB = new PouchDB('https://biznnovate.cloudant.com/eblast-coltype');    

    collocalDB.sync(colremoteDB).on('complete', function () {
        // yay, we're in sync!
            }).on('error', function (err) {
         // boo, we hit an error!
            });
        $scope.coltype = {};
        angular.forEach($scope.columninfo, function(value, key){
                

        collocalDB.get(value._id).then(function(doc) {
            return collocalDB.put({
                _id: value._id,
                _rev: doc._rev,
                name: value.name.nam,
                type: value.name.id,
                value: value.name.value
                 });
                }).then(function(response) {
            // handle response
            }).catch(function (err) {
            console.log(err);
            });
  });

$scope.continueOpt = false;

}

localDB.allDocs({
  include_docs: true,
  attachments: true
}).then(function (result) {
  // handle result
  $scope.Barrenos = result ;
}).catch(function (err) {
  console.log(err);
});
  // handle doc



//llama barrenos
//$scope.Barrenos = JSON.parse($window.localStorage['barrenos']);


//muestra creacion de titulos para cada columna
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
            peso: $scope.PesoTotal
           
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
             doc.cargasinaire = $scope.cargaSinAire;
             doc.status= "Updated";

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
     


$scope.barrInfo = $scope.selectedTipo || [];

$scope.BarrenosParam = $scope.BarrenosParam || [];

 $scope.BarrParam = {

 };              



$scope.BarrParamGra = '0';

$scope.BarrData = [];
$scope.TipoData = [];


//lo que quiero calcular
$scope.BarrProfCarga = 0;
$scope.BarrProfDes = 0;

// Selecciona los parametros de ese Barreno predeterminado (prueba solo con profundidad)
$scope.selectedBarr = function (item) {

    $scope.BarrData = [];
    $scope.BarrData.push(item.Col4)
    $scope.BarrProfDes = parseFloat($scope.BarrData);
};
// Selecciona los parametros de ese Tipo predeterminado (prueba solo con profundidad)
$scope.selectedType = function (item) {
    $scope.TipoData = [];
    $scope.TipoData.push(item.prof);
    $scope.BarrProfCarga = parseFloat($scope.TipoData);
};
// and fire it after definition



var a = $scope.BarrProfCarga;
var b = $scope.BarrProfDes;


$scope.BarrGraSug =  b - a;

  $scope.selectedProfReal = function (item){
      $scope.BarrProfDes=item;

  }

$scope.BarrenosParam = $window.localStorage['barrenosparam'];
    $window.localStorage['barrenosparam'] = JSON.stringify($scope.BarrParam);
      
      $scope.addParam = function (BarrParam){
         //$scope.BarrenosParam.push(BarrParam);
         $window.localStorage['barrenosparam'] = JSON.stringify($scope.BarrParam);
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
 