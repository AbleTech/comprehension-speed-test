var app = angular.module('cst', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /
	$urlRouterProvider
		.otherwise('/');

	// Now set up the states
	$stateProvider

		/* Home / Brochure pages */
		.state('home', {
			url: '/',
			templateUrl: '/home/index.html',
			title: '',
			theme: ''
		})

		/* Join a game */
		.state('join', {
			url: '/join',
			controller: 'joinController',
			templateUrl: '/join/index.html',
			title: 'Join a game',
			theme: ''
		})

		/* Host/Setup a game */
		.state('host', {
			url: '/host',
			controller: 'hostController',
			templateUrl: '/host/index.html',
			title: 'Host a game',
			theme: ''
		})

		/* Games */
		.state('game', {
			url: '/game',
			controller: 'gameController',
			templateUrl: '/game/lobby.html',
			title: 'Game lobby',
			theme: ''
		})
			.state('game.race', {
				url: '/{gameID}',
				controller: 'gameRaceController',
				templateUrl: '/game/race.html',
				title: 'Go Go Go!',
				theme: 'race'
			})
		;

}]);

app.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(e, toState){
    	$rootScope.themeClass = 'theme_' + toState.theme;
    });

    $rootScope.$on('$stateChangeSuccess', function(){
    	$rootScope.title = $state.current.title;
    });
    if (window.console) {
    	$rootScope.$on('$stateChangeError', console.log.bind(console));
   	}
  }]
);
