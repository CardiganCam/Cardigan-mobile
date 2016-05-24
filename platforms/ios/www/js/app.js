// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cardigan', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $http, $cordovaGeolocation) {

  //$rootScope.host = 'http://192.168.42.1'
  $rootScope.host = 'http://192.168.2.3'
  $rootScope.Oldheading = 0;

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

      $http({
        method: 'GET',
        url: $rootScope.host + '/modules/video/index.py/'
      }).success(function(data, status, headers, config) {
          data = $rootScope.arrangeClipsByDate(data)
          console.log((data))
          $rootScope.myPlayer = videojs('video')
          $rootScope.myPlayer.src({"type":"video/avi", "src":$rootScope.host + "/modules/video/clip/" + (parseInt(data[0]) / 1000) + ".avi"})
          $rootScope.myPlayer.volume(0)
          $rootScope.myPlayer.play()

          $rootScope.clipsByMonth = data

      }).error(function(data, status, headers, config) {
        if(window.cordova)
          alert('No cardigan device found.')
      });



    $rootScope.play = function(){
      $rootScope.myPlayer.play();
    }

    $rootScope.changeMainVideo = function(clip){
      $rootScope.myPlayer.src({"type":"video/avi", "src":$rootScope.host + "/modules/video/clip/" + (parseInt(clip)) + ".avi"});
      $rootScope.myPlayer.play()

    }


    //$rootScope.watchGps();


  });

    $rootScope.arrangeClipsByDate = function(data){
      res = {};

      for (i = 0; i < data.length; i++) { 

        date = new Date(parseInt(data[i]) * 1000);
        month = parseInt(date.getMonth()) + 1;
        day = date.getDate();

        if (typeof(res[month]) == 'undefined')
          res['' + month] = {}
        
        
        if (typeof(res[month][day]) == 'undefined') 
            res['' + month]['' + day] = []
        
        res[month][day].push(data[i])

      }


      return (res);
    }

    $rootScope.watchGps = function() {

        var watchOptions = {
            timeout: 1000,
            enableHighAccuracy: true, // may cause errors if true,
            maximumAge: 1000
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
            null,
            function(err) {
                console.log(err)
                if (window.cordova)
                 $rootScope.watchGps();
            },
            function(position) {
                $rootScope.xa = position
                $rootScope.pos = position.coords
                $('.needle').css('transform', 'rotate(' + parseInt($rootScope.pos.heading - $rootScope.Oldheading) + 'deg)');
                $('.smallNeedle').css('transform', 'rotate(' + $rootScope.pos.heading + 'deg)');
                $rootScope.Oldheading = $rootScope.pos.heading

               // put GPS data in Cardigan buffer
               $http({
                  method: 'GET',
                  url: $rootScope.host + '/modules/gps/setGPS.py/',
                  params: {'data': angular.fromJson(position.coords)}
                }).success(function(data, status, headers, config) {
                  console.log(data)
                }).error(function(data, status, headers, config) {
                  console.log(data)
                });
            });



    }



})
.filter('monthName', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
    }
}]);

