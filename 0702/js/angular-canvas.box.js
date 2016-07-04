

angular.module("canvas-box",[]).directive("canvasBox",["$document",
    function($document){
    return {
        restrict:"E",//종류
        template:"<div class='box'><canvas></canvas></div>",//템플릿
        replace:true,//템플릿으로 대체할건지 여부
        scope:"@",
        link:function(scope,element,attr) {
            //element : jquery객체
            //alert(scope.data.width);

            var data = scope.data;

            var width = data.width;
            var height = data.height;
            var x = data.x;
            var y = data.y;
            //alert(x);
//
            element.css({"width":width+"px",
                "height":height+"px",
                "left":x+"px",
                "top":y+"px"});

            var canvas = element.find("canvas")[0];

            canvas.height=height;//jquery메서드
            canvas.width=width;

            var ctx = canvas.getContext("2d");

            ctx.fillStyle = data.bgColor;
            ctx.fillRect(0,0,data.w,data.h);

            //canvas.css("background","red");
            //canvas.height=300;//순수자바스크립트 attribute

            var startX = 0;//시작좌표
            var startY = 0;//시작좌표

            //element에 mousedown이벤트를 붙임
            element.on("mousedown",function(e){
                startX = e.pageX-x;
                startY = e.pageY-y;

                $document.on("mouseup",function(){
                   //이벤트리스너를 떨어뜨립니다.
                    $document.off("mousemove");
                    $document.off("mouseup");
                });

              // alert(startX+"마우스 다운!"+startY);
                //브라우저에 mousemove이벤트를 붙임
                $document.on("mousemove",function(e) {
                    x = e.pageX-startX;
                    y = e.pageY-startY;

                    element.css({left:x+"px",top:y+"px"});

                    //console.log(x);
                    //console.log(y);
                });


            });




        }//link() end
    };
}]);