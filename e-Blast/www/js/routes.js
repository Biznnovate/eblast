angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.inicio', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })

  .state('menu.vistaDeProyecto', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/vistaDeProyecto.html',
        controller: 'vistaDeProyectoCtrl'
      }
    }
  })

  .state('menu.vistaDeReporte', {
    url: '/page16',
	params: {
		menu: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/vistaDeReporte.html',
        controller: 'vistaDeReporteCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.login', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.subirProyecto', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/subirProyecto.html',
        controller: 'subirProyectoCtrl'
      }
    }
  })

  .state('menu.ajustarCSV', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ajustarCSV.html',
        controller: 'ajustarCSVCtrl'
      }
    }
  })

  .state('parMetrosDeCSVPaso1', {
    url: '/page9',
    templateUrl: 'templates/parMetrosDeCSVPaso1.html',
    controller: 'parMetrosDeCSVPaso1Ctrl'
  })

  .state('parMetrosDeCSVPaso3', {
    url: '/page10',
    templateUrl: 'templates/parMetrosDeCSVPaso3.html',
    controller: 'parMetrosDeCSVPaso3Ctrl'
  })

  .state('menu.mapaVoladura1', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mapaVoladura1.html',
        controller: 'mapaVoladura1Ctrl'
      }
    }
  })

  .state('menu.parametrosVoladura1', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/parametrosVoladura1.html',
        controller: 'parametrosVoladura1Ctrl'
      }
    }
  })

  .state('menu.editarVoladuraMapa', {
    url: '/page12',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarVoladuraMapa.html',
        controller: 'editarVoladuraMapaCtrl'
      }
    }
  })

  .state('menu.editarVoladuraCaptaciN', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarVoladuraCaptaciN.html',
        controller: 'editarVoladuraCaptaciNCtrl'
      }
    }
  })

  .state('menu.tomaDeMuestra', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tomaDeMuestra.html',
        controller: 'tomaDeMuestraCtrl'
      }
    }
  })

  .state('menu.generarReporteProductos', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/generarReporteProductos.html',
        controller: 'generarReporteProductosCtrl'
      }
    }
  })

  .state('menu.generarReporteDatosGenerales', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/generarReporteDatosGenerales.html',
        controller: 'generarReporteDatosGeneralesCtrl'
      }
    }
  })

  .state('menu.agregarBarreno', {
    url: '/page18',
    views: {
      'side-menu21': {
        templateUrl: 'templates/agregarBarreno.html',
        controller: 'agregarBarrenoCtrl'
      }
    }
  })

  .state('menu.verBarrenos', {
    url: '/page19',
	params: {
		id: "",
		status: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/verBarrenos.html',
        controller: 'verBarrenosCtrl'
      }
    }
  })

  .state('menu.tiposDeBarreno', {
    url: '/page20',
	params: {
		id: "",
		status: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/tiposDeBarreno.html',
        controller: 'tiposDeBarrenoCtrl'
      }
    }
  })

  .state('menu.buscarBarreno', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/buscarBarreno.html',
        controller: 'buscarBarrenoCtrl'
      }
    }
  })
  .state('menu.tomaDeSismografos', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tomaDeSismografos.html',
        controller: 'tomaDeSismografosCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')


});