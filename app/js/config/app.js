angular.module('app', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
        	.when('/', {
        		templateUrl: 'views/anonymous/anonymous.html',
        		roles: ['anonymous']
        	})
            .when('/home', {
                templateUrl: 'views/home/dashboard.html',
                roles: ['user','admin']
            })
            .when('/login', {
            	templateUrl: 'views/login/login.html',
            	roles: ['anonymous']
            });

     })
    .run(['$rootScope', '$location',function($rootScope, $location) {
    	$rootScope.$on('$routeChangeStart', function (event, next) {
    		console.log(next.roles);
    		//logica para permitir ou não o acesso a pagina de acordo com
    		//as permissões definidas
    		if ((next.roles) && (next.roles.indexOf('anonymous') < 0)) {
    			console.log('required login...');
    			$location.path('/login').replace();
    		}
    	});
    }]);
