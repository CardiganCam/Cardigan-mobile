// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cardigan', ['ionic', 'ngCordovaBluetoothLE'])

.run(function($ionicPlatform, $cordovaBluetoothLE, $rootScope) {
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




    $rootScope.initialize = function() {
      var params = {request:true};

      console.log("Initialize : " + JSON.stringify(params));

      $cordovaBluetoothLE.initialize(params).then(null, null, function(obj) {
        console.log("Initialize Success : " + JSON.stringify(obj));
      });
    };
    $rootScope.startScan = function() {
      var params = {
        services:[],
        allowDuplicates: false,
        scanMode: bluetoothle.SCAN_MODE_LOW_POWER,
        matchMode: bluetoothle.MATCH_MODE_STICKY,
        matchNum: bluetoothle.MATCH_NUM_ONE_ADVERTISEMENT,
        //callbackType: bluetoothle.CALLBACK_TYPE_FIRST_MATCH,
        //scanTimeout: 15000,
      };

      console.log("Start Scan : " + JSON.stringify(params));

      $cordovaBluetoothLE.startScan(params).then(function(obj) {
        console.log("Start Scan Auto Stop : " + JSON.stringify(obj));
      }, function(obj) {
        console.log("Start Scan Error : " + JSON.stringify(obj));
      }, function(obj) {
        console.log("Start Scan Success : " + JSON.stringify(obj));

        addDevice(obj);
      });
    };
    $rootScope.initialize();
    $rootScope.startScan();

    var myPlayer = videojs('video');
    myPlayer.volume(0);
    myPlayer.play();
    var Seek = SeekBar(myPlayer)
    console.log(Seek.getPercent());





  });
})

