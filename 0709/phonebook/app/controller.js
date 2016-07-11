angular.module("phone.controller",[])
       .controller("registerCtrl",["$scope","Phone","$state","$rootScope",
           function($scope,Phone,$state,$rootScope){

               $scope.type = "등록";

               //전화번호부 입력
               $scope.executePhone = function(phone) {
                   //로딩이미지 보여주기
                   $rootScope.loader = true;

                   var p = new Phone(phone);

                   p.$save(function() {
                       //'list' state 로 이동
                       $state.go("list");
                   });

               }//registerPhone() end


       }]).controller("listCtrl",["$scope","$rootScope","Phone",
    function($scope,$rootScope,Phone){

    //전화번호부 목록을 전부 불러오는 함수
    function getPhoneList() {
        // loader보여주고
        $rootScope.loader = true;

        Phone.query(function(data){

            $scope.list = data;

            $rootScope.loader = false;

        },function(){
            alert("에러~");
        });

    }//getPhoneList() end

    //호출
    getPhoneList();

}]).controller("detailCtrl",["$scope","$stateParams","$rootScope","Phone","$state",
    function($scope,$stateParams,$rootScope,Phone,$state){
        //한 개의 전화번호부를 불러오기 전까지 로딩이미지 보여줌
        $rootScope.loader = true;

        //전화번호를 삭제하는 함수
        $scope.deletePhone = function(phone) {
            // 로더 보여주고
            $rootScope.loader =true;

            phone.$delete(function(){
                // 삭제되었으니까 list 스테이트로 이동
                $state.go("list");
            });

        }//deletePhone() end

        //alert($stateParams.id);

        //리소스 객체자체의 메서드는 get,save,delete
        //리소스로 만들어진 객체의 메서드는 $get,$save,$delete

        Phone.get({id:$stateParams.id},function(data){
            // 리소스객체
            //console.log(Phone);
            //객체
           // console.log(data);

            $scope.phone = data;

            $rootScope.loader = false;

        });

}]).controller("updateCtrl",["$scope","$rootScope","Phone","$stateParams","$state",
    function($scope,$rootScope,Phone,$stateParams,$state){

   $scope.type = "수정";

        $scope.executePhone = function(phone) {
            //console.log(phone);
            $rootScope.loader = true;

            phone.$update(function(){
                //수정되었으니까 detail페이지로 이동
                $state.go("detail",{id:phone._id.$oid});
            });

        }//executePhone() end
    
    //한개의 전화번호를 불러오는 함수
    function getPhone() {

        $rootScope.loader = true;

        Phone.get({id:$stateParams.id},function(data){
           // alert(data.birth);
            data.birth = new Date(data.birth);
           // alert(data.birth);
            $scope.phone = data;

            $rootScope.loader = false;
        });

    }//getPhone() end
    getPhone();

}])







