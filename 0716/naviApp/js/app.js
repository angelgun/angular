// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

//route설정
app.config(function($stateProvider,$urlRouterProvider){
  //ionic은 기본으로 ui-router를 사용

  $stateProvider.state("tabs",{
    url:"/tabs",
    abstract:true,//추상뷰
    templateUrl:"templates/tabs.html"
  });

  $stateProvider.state("tabs.friends",{
    url:"/friend",
    views:{
      "friends":{
        templateUrl:"templates/friend.html"
      }
    }
  });

  $stateProvider.state("tabs.chatting",{
    url:"/chatting",
    views:{
      "chatting":{
        templateUrl:"templates/chatting.html",
        controller:"chattingCtrl"
      }
    }
  });
  $stateProvider.state("tabs.chatroom",{
    url:"/chatting/:id",
    views:{
      "chatting":{
        templateUrl:"templates/chatroom.html"
      }
    }
  });



  $stateProvider.state("tabs.channel",{
    url:"/channel",
    views:{
      "channel":{
        templateUrl:"templates/channel.html"
      }
    }
  });

  $stateProvider.state("tabs.more",{
    url:"/more",
    views:{
      "more":{
        templateUrl:"templates/more.html"
      }
    }
  });

  $urlRouterProvider.otherwise("/tabs/friend");

});

app.run(function($ionicPlatform,$rootScope) {
  

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
});

app.controller("chattingCtrl",["$scope",function($scope) {
    $scope.chattingList = [
      {"profile":"img/001.gif",title:"라이언1","msg":"안녕하세요?"},
      {"profile":"img/002.gif",title:"라이언2","msg":"안녕하세요?"},
      {"profile":"img/003.gif",title:"라이언3","msg":"안녕하세요?"}
    ]
}]);

app.controller("chatroomCtrl",["$scope","$timeout","$ionicScrollDelegate",function($scope,$timeout,$ionicScrollDelegate) {


  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {


  };

  $scope.closeKeyboard = function() {
    //alert("꺼짐");
   // cordova.plugins.Keyboard.close();
  };



  $scope.inputUp = function() {

    //alert(isIOS);

    //if (isIOS) $scope.data.keyboardHeight = 216;

    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    }, 500);

  };

  $scope.inputDown = function() {
    //if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.$getByHandle('mainScroll').resize();
  };

  $scope.messages = [{msg:"안녕하세요?",type:"you"},{msg:"반갑습니다.",type:"my"}];

}]);

app..directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {

        //alert(scope.onReturn);

        if (e.which == 13) {
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});