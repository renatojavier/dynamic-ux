var application = angular.module('PortfolioApp', ['ngRoute', 'oc.lazyLoad'])
,	controllers = {};

application.run(['$rootScope', function($rootScope) {
	$rootScope.$on("$locationChangeStart", function(event, next, current){
		window.scrollTo(0, 0);
    });

    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){});
}]);

controllers = {
	0 : {
		name : 'HomeController',
		page : 'index',
		title: 'DynamDan UX Portfolio'
	},
	1 : {
		name : 'CatholicCloudController',
		page : 'cc',
		title: 'CatholicCloud &ndash; DynamDan UX Portfolio'
	},
	2 : {
		name : 'PhomioController',
		page : 'phomio',
		title: 'Phomio &ndash; DynamDan UX Portfolio'
	},
	3 : {
		name : 'WMBController',
		page : 'wmb',
		title: 'WMB &ndash; DynamDan UX Portfolio'
	}
};

application.config(function($routeProvider, $ocLazyLoadProvider){
	$routeProvider
	.when('/', {
		controller: controllers[0].name,
		templateUrl: 'views/template-home.html'
	})
	.when('/cc', {
		controller: controllers[1].name,
		templateUrl: 'views/template-cc.html',
		resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'assets/js/lib/smoothscroll.js',
					'assets/js/app.js'
				]);
			}]
        }
	})
	.when('/phomio', {
		controller: controllers[2].name,
		templateUrl: 'views/template-phomio.html',
		resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'assets/js/lib/smoothscroll.js',
					'assets/phomio/js/jquery.color-2.1.2.min.js',
					'assets/phomio/js/jquery.ba-throttle-debounce-1.1.min.js',
					'assets/js/app.js',
					'assets/phomio/js/lureSelect.js',
					'assets/phomio/js/portfolio.js'
				]);
			}]
        }
	})
	.when('/wmb', {
		controller: controllers[3].name,
		templateUrl: 'views/template-wmb.html',
		resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'assets/js/wmb-meta.js',
					'assets/js/lib/smoothscroll.js',
					'assets/js/app.js',
					'assets/wmb/dist/js/video.js'
				]);
			}]
        }
	})
	.otherwise({
		redirectTo: '/'
	});

});

application.controller(controllers[0].name, ['$scope', function($scope){
	$scope.name = controllers[0].page;
	document.querySelector('html').setAttribute('data-portfolio', $scope.name);
	document.querySelector('title').innerHTML = controllers[0].title;

	angular.element(document).ready(function(){
		window.app.initialize();
	});

}]);

application.controller(controllers[1].name, ['$scope', function($scope){
	$scope.name = controllers[1].page;
	document.querySelector('html').setAttribute('data-portfolio', $scope.name);
	document.querySelector('title').innerHTML = controllers[1].title;

	angular.element(document).ready(function(){
		$(window).trigger('resize');
		window.app.initialize();
	});

}]);

application.controller(controllers[2].name, ['$scope', function($scope){
	$scope.name = controllers[2].page;
	document.querySelector('html').setAttribute('data-portfolio', $scope.name);
	document.querySelector('title').innerHTML = controllers[2].title;

	angular.element(document).ready(function(){
		$(window).trigger('resize');
		window.app.initialize();
	});

}]);

application.controller(controllers[3].name, ['$scope', function($scope){
	$scope.name = controllers[3].page;
	document.querySelector('html').setAttribute('data-portfolio', $scope.name);
	document.querySelector('title').innerHTML = controllers[3].title;

	angular.element(document).ready(function(){
		$(window).trigger('resize');
		window.app.initialize();
	});

}]);


/*
for(key in controllers){
	var c = controllers[key]
	,	x = null
	,	i = 0
	document.querySelector('title').innerHTML = '';

	x = function(){
		application.controller(c.name, ['$scope', function($scope){
			$scope.name = c.page;

			document.querySelector('html').setAttribute('data-portfolio', $scope.name);
			document.querySelector('title').innerHTML = c.title;

			angular.element(document).ready(function(){
				window.app.initialize();
			});
		}]);
	};

	x()[i];
}
*/