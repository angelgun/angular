// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider,$urlRouterProvider){

  $stateProvider.state("app",{
    url:"/app",
    abstract:true,//추상 상태
    templateUrl:"templates/app.html"
  });

  $stateProvider.state("app.home",{
    url:"/home",
    views:{
      home:{
        templateUrl:"templates/home.html"
      }
    }
  });

  $stateProvider.state("app.news",{
    url:"/news",
    views:{
      news:{
        templateUrl:"templates/news.html"
      }
    }
  });
  $stateProvider.state("app.chat",{
    url:"/chat",
    views:{
      chatting:{
        templateUrl:"templates/chat.html"
      }
    }
  });


  $urlRouterProvider.otherwise("/app/home");

});

app.run(function($ionicPlatform) {
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
  });
})
