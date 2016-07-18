
angular.module("todo.controller",[])
  .controller('loginCtrl',["$scope","$state",function($scope,$state){

      $scope.user = [];

    $scope.login = function(user){
       // alert(user.password);

      //유효성검사 & 서버에서 로그인 수행

      $state.go("main");

    }

     // alert("ddd");

  }])
  .controller("joinCtrl",["$scope","$state","$ionicLoading","$timeout",
    function($scope,$state,$ionicLoading,$timeout){

    $scope.user = [];

    $scope.join = function(user) {
      $ionicLoading.show();

      $timeout(function(){
        $ionicLoading.hide();
        $state.go("login");
      },500);
      //#login, login으로 이동
    }

  }]).controller("mainCtrl",["$scope","Todo","$ionicLoading","$ionicPopup","$ionicModal",
  function($scope,Todo,$ionicLoading,$ionicPopup,$ionicModal){

    $ionicModal.fromTemplateUrl("templates/write.html",
      {scope:$scope,animation:"slide-in-up"})
      .then(function(modal) {
        //modal을 $scope.modal로 등록
      $scope.modal = modal;
    });

    $scope.writeTodo = function(title){
      $ionicLoading.show();
        var todo = new Todo();
        todo.title = title;
        todo.end = false;

      todo.$save(function(data){
       // alert("성공~");
        //모달 숨기고
        $scope.modal.hide();
        //getTodos()
        getTodos();
      },function(){
       // alert("에러~");
      });


    }
    //글쓰기모달폼 숨기기
    $scope.hideTodoForm = function() {
      $scope.modal.hide();
    }

    //글쓰기모달폼 보여주기
    $scope.displayTodoForm = function() {
      $scope.modal.show();
    }


    $scope.deleteTodo = function(todo) {

        $ionicPopup.confirm({
          title:"할 일 삭제",
          content:"정말로 삭제하시겠습니까?"
        }).then(function(result) {

          if(result) {
            $ionicLoading.show();
            todo.$delete(function(){
              getTodos();
            });
          }//if end
        });
    }

    $scope.updateTodo = function(todo){
      //alert("updateTodo");
        todo.$update(function(data){
          //alert('수정되었음');
        });
    };

  //alert(Todo);
    //mongolab에서 todo를 불러오기
  function getTodos() {
    $scope.todos = [];//비우기
    //로딩이미지를 보여주기
    $ionicLoading.show();
    Todo.query(function(data){
      $ionicLoading.hide();
      $scope.todos = data;
    });
  }
  getTodos();

}]);
