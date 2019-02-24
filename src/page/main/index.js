'use strict';
require('./index.css');
require('ztree/css/zTreeStyle/zTreeStyle.css');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');


// page 逻辑部分











// page 逻辑部分
var page = {
    init: function(){
        this.checkLogin();
    },
    checkLogin : function(){
        var _this = this;

            _this.submit();

    },
    // 检查用户登录状态
    submit :function() {
        //登录状态
        _user.checkLogin(function (res) {
           console.log(res);
            _user.permission(function(res){
                console.log(res)

                console.log(typeof  res)
                var biaoti = res[0].name;
                $("#biaoti").html(biaoti);

                var yijidaohang = res[0].children;

                console.log(yijidaohang)


                for(var a=0; a<yijidaohang.length;a++){
                    $("#gongneng").html( "<span class='yijidaohang'   >"+ yijidaohang[a].name+"</span><br>");

                    console.log(yijidaohang[a].name)
                }




            }, function(errMsg){

                window.location.href = './index.html';
            });




        }, function (errMsg) {
            if(errMsg ==="用户未登录,无法获取当前用户的信息") {
                console.log(errMsg);
              window.location.href = './index.html';
            }
        })

    }
};
$(function(){
    page.init();
})


