var myApp = angular.module('myApp');

myApp.controller('MoviesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('MoviesController loaded...');
	$scope.getMovies = function(){
		$http.get('/api/movie').success(function(response){
		$scope.movies = response;
		console.log('testing');
		});
	}
}]);