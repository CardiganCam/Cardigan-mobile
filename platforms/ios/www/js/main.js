angular.module('cardigan.main', [])

.controller('mainCtrl', function($scope) {



})

.controller('calibrationCtrl', function($scope, $rootScope, $interval, $http) {

	// $('.needle').css('transform', 'rotate(' + parseInt($rootScope.pos.heading - $rootScope.Oldheading) + 'deg)');
	// $('.smallNeedle').css('transform', 'rotate(' + $rootScope.pos.heading + 'deg)');

	$scope.calibrationMode = "False"

  	$interval(function() {
		    $scope.calibrationImage = $rootScope.host + "/modules/settings/road.jpg?r=" + new Date().getTime()
		}, 4000);

	$scope.toggleCalibration = function(){

		   $http({
                method: 'GET',
                url: $rootScope.host + '/modules/settings/startCalibration.py/',
                params: { 'action': $scope.calibrationMode}
            }).success(function(data) {

                $scope.calibrationMode = $scope.calibrationMode == "False" ? "True" : "False"


            });
	}

	$scope.moveCalibrationImage = function(direction){

		   $http({
                method: 'GET',
                url: $rootScope.host + '/modules/settings/moveCalibrationImage.py/',
                params: { 'direction': direction}
            }).success(function(data) {
                
            	console.log(data)
            });
	}


})
