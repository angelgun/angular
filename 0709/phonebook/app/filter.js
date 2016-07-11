/**
 * Created by user on 2016-07-09.
 */

angular.module("phone.filter",[])
    .filter("genderFilter",function(){
        //결과를 리턴하는 함수를 리턴
        return function(gender) {
            //alert(gender);
            if(gender=="F"){
                return "여자";
            }else {
                return "남자";
            }
        }
    });