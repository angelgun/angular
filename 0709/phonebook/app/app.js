

var app = angular.module("phoneApp",[
    "ngMaterial","ui.router","phone.service","phone.controller"]);

app.run(function($rootScope) {
    //어디서든 접근이 가능할 로더는 $rootScope로
    $rootScope.loader = false;
});

app.config(function($stateProvider,$urlRouterProvider){
    //ui router 플러그인은
    //$stateProvider, $urlRouterProvider

    //$routeProvider.when() 을 state라고
    //$stateProvider.state("상태이름",{url,views등});

    $stateProvider.state("list",{
        url:"/list",
        views:{
            headerView:{
                templateUrl:"templates/header.html",
                controller:function($document) {
                    $document[0].title="전화번호 목록";
                }
            },
            contentView:{
                templateUrl:"templates/list.html"
            },
            footerView:{
                templateUrl:"templates/footer.html"
            }
        }
    });

    $stateProvider.state("search",
        {
            url:"/search",
            views:{
                headerView:{
                    templateUrl:"templates/header.html",
                    controller:function($document) {
                        $document[0].title="전화번호 검색";
                    }
                },
                contentView:{
                    templateUrl:"templates/search.html"
                },
                footerView:{
                    templateUrl:"templates/footer.html"
                }
            }
        });
        $stateProvider.state("register",
        {
            url:"/register",
            views:{
                headerView:{
                    templateUrl:"templates/header.html",
                    controller:function($document) {
                        $document[0].title="전화번호 등록";
                    }
                },
                contentView:{
                    templateUrl:"templates/form.html",
                    controller:"registerCtrl"
                },
                footerView:{
                    templateUrl:"templates/footer.html"
                }
            }
        });

    //$routeProvider.otherwise()는
    $urlRouterProvider.otherwise("/list");

});