// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

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
});

app.controller("listCtrl",["$scope","$ionicLoading",function($scope,$ionicLoading){

  //로딩
  $ionicLoading.show();

  $scope.deleteItem = function(items,$index) {
    items.splice($index,1);
  }//deleteItem() end

  $scope.reorderItem = function(items,item,$fromIndex,$toIndex) {
    //from에서 삭제
    items.splice($fromIndex,1);
    //to에서 입력
    items.splice($toIndex,0,item);
  }//reorderItem() end

  //로딩 숨기기
  $scope.hideLoader = function() {
    $ionicLoading.hide();
  }

  //삭제버튼을 보여주는 함수
  $scope.showDeleteBtn = function() {
    //! <-- 부정연산자
    $scope.deleteFlag = !$scope.deleteFlag;
  }//showDeleteBtn() end

  $scope.showReorderBtn = function() {
    $scope.reorderFlag = !$scope.reorderFlag;
  }//showReorderBtn() end

  $scope.items = [
    {title:"아이템1",end:true},
    {title:"아이템2",end:false},
    {title:"아이템3",end:true},
    {title:"아이템4",end:false},
    {title:"아이템5",end:false},
    {title:"아이템6",end:true},
    {title:"아이템7",end:false},
    {title:"아이템8",end:true},
    {title:"아이템9",end:false},
    {title:"아이템10",end:false}
  ];
}]);
