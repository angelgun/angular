angular.module("phone.controller",[])
       .controller("registerCtrl",["$scope","Phone","$state",
           function($scope,Phone,$state){

               $scope.registerPhone = function(phone) {

                   var p = new Phone(phone);

                   p.$save(function() {
                       alert("입력");
                   });

               }//registerPhone() end


       }]);