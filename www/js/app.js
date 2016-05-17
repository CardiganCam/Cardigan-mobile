// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cardigan', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $http, $cordovaGeolocation) {

  $rootScope.host = 'http://192.168.42.1'
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
          $rootScope.myPlayer = videojs('video');
          $rootScope.myPlayer.src({"type":"video/mp4", "src":$rootScope.host + "/modules/video/clip/" + data[0] + ".mp4"});
          $rootScope.myPlayer.volume(0);
          $rootScope.myPlayer.play();

          $rootScope.clips = data.sort()

      }).error(function(data, status, headers, config) {
        alert('No cardigan device found.')
      });



    $rootScope.play = function(){
      $rootScope.myPlayer.play();
    }

    $rootScope.changeMainVideo = function(clip){

      console.log(clip);
      $rootScope.myPlayer.src({"type":"video/mp4", "src":$rootScope.host + "/modules/video/clip/" + clip + ".mp4"});
      $rootScope.myPlayer.play()


    }



  var watchOptions = {
    timeout : 1000,
    enableHighAccuracy: true // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      $rootScope.heading = position.coords.heading
      console.log(position.coords.heading)
              $http({
                method: 'GET',
                url: $rootScope.host + '/modules/gps/getGPS.py/',
                params: {'heading': position.coords.heading}
              }).success(function(data, status, headers, config) {
                console.log(data)
              }).error(function(data, status, headers, config) {
                console.log(data)
              });
  });





  });




})


